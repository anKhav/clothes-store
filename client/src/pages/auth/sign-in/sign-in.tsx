import {useForm, SubmitHandler} from 'react-hook-form'
import styles from '../auth.module.css'
import {ThunkDispatch} from "@reduxjs/toolkit";
import {AuthState} from "../../../store.ts";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../../features/auth.slice.ts";

interface FormInput {
    email:string,
    password:string,
    button:string
}

const SignIn = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<FormInput>({
        mode:"all"
    })
    const dispatch: ThunkDispatch<AuthState, undefined, any> = useDispatch();
    const navigate = useNavigate()
    const loginHandler:SubmitHandler<FormInput> = async (data) => {
        await dispatch(loginUser(data));
        navigate('/profile')
    }
    return (
        <main className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit(loginHandler)}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={!errors.email ? styles.input : styles.input + ' ' + styles.input_error}
                       {...register('email',
                           {required:'Email is required'
                           }
                       )}
                />
                {errors.email && <p className={styles.error}>{errors.email?.message}</p>}
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={!errors.password ? styles.input : styles.input + ' ' + styles.input_error}
                       type='password'
                       {...register('password',
                           {required:'Password is required'
                           }
                       )}
                />
                {errors.password && <p className={styles.error}>{errors.password?.message}</p>}
                <button className={styles.button} type="submit">Sign In</button>
                <p className={styles.text}>
                    Don't have account?
                    <Link className={styles.link} to='/signup'>Sign Up</Link>
                </p>
            </form>
        </main>
    );
};

export default SignIn;