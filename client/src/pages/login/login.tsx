import { MouseEvent,useState } from 'react';
import {useDispatch} from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { loginUser } from '../../features/authSlice';
import {RootState} from '../../store';
import {axiosAuth} from "../../API/axiosApi.ts";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async () => {
        const credentials = { email, password };
        await dispatch(loginUser(credentials));
        navigate('/profile')
    };
    const getTokens = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const response = await axiosAuth.get('/auth/tokens')
            const data = await response.data
            console.log(data)
        } catch (err: any) {
            console.log(err.response.statusText)
        }
    }
    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={getTokens}>Login</button>
        </div>
    );
};

export default Login;