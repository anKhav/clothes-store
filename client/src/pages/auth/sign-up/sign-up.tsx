import {useForm, SubmitHandler} from 'react-hook-form'
import styles from '../auth.module.css'
import {ThunkDispatch} from "@reduxjs/toolkit";
import {AuthState} from "../../../store.ts";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../../../features/auth.slice.ts";

interface FormInput {
    email:string,
    password:string,
    button:string,
    confirm_password:string
}

const SignUp = () => {
    const {register, handleSubmit, formState:{errors}, watch} = useForm<FormInput>({
        mode:"all"
    })
    const dispatch: ThunkDispatch<AuthState, undefined, any> = useDispatch();
    const navigate = useNavigate()
    const loginHandler:SubmitHandler<FormInput> = async (data) => {
        await dispatch(registerUser(data));
        navigate('/profile')
    }
    return (
        <main className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit(loginHandler)}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={!errors.email ? styles.input : (styles.input + ' ' + styles.input_error)}
                       {...register('email',
                           {required:'Email is required',
                               pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: "Invalid email address"
                               }
                           }
                       )}
                />
                {errors.email && <p className={styles.error}>{errors.email?.message}</p>}
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={!errors.password ? styles.input : styles.input + ' ' + styles.input_error}
                       type='password'
                       {...register('password',
                           {required:'Password is required',
                               minLength:{
                                   value:8,
                                   message:'Password length must be 8 letters or more'
                               },
                               pattern:{
                                   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                                   message:'Password must contain at least one number, one lowercase and one uppercase letter and one special character '
                               }
                           }
                       )}
                />
                {errors.password && <p className={styles.error}>{errors.password?.message}</p>}
                <label className={styles.label} htmlFor="confirm-password">Confirm Password</label>
                <input className={!errors.confirm_password ? styles.input : styles.input + ' ' + styles.input_error}
                       type='password'
                       {...register('confirm_password',
                           {required:'Password is required',
                               validate:(val:string) => {
                               console.log(watch("password"))
                                if (watch('password') !== val){
                                    return 'Your passwords doesn\'t match!'
                                }
                               }
                           }
                       )}
                />
                {errors.confirm_password && <p className={styles.error}>{errors.confirm_password?.message}</p>}
                <button className={styles.button} type="submit">Sign Up</button>
                <p className={styles.text}>
                    Already have an account?
                    <Link className={styles.link} to='/signin'>Sign In</Link>
                </p>
            </form>
        </main>
    );
};

export default SignUp;