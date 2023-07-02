import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { loginUser } from '../../features/authSlice';
import { RootState } from '../../store';

const Login = () => {
    const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();

    const handleLogin = () => {
        const credentials = { email: 'email3@mail.com', password: 'password' };
        dispatch(loginUser(credentials));
    };

    return (
        <div>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;