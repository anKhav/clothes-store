import {useForm, SubmitHandler} from 'react-hook-form'
import styles from './sign-in.module.css'
import {ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../features/authSlice.ts";

interface FormInput {
    email:string,
    password:string,
    button:string
}

const Example = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<FormInput>()
    const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
    const navigate = useNavigate()
    const loginHandler:SubmitHandler<FormInput> = async (data) => {
        await dispatch(loginUser(data));
        navigate('/profile')
    }
    return (
        <main className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit(loginHandler)}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={styles.input}
                       {...register('email',
                           {required:'Email is required',
                               pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: "invalid email address"
                               }
                           }
                       )}
                />
                {errors.email && <p className={styles.error}>{errors.email?.message}</p>}
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={styles.input}
                       type='password'
                       {...register('password',
                           {required:'Password is required',
                               // minLength:{
                               //     value:8,
                               //     message:'Password length must be 8 letters or more'
                               // },
                               // pattern:{
                               //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                               //     message:'Password must contain at least one number, one lowercase and one uppercase letter and one special character '
                               // }
                           }
                       )}
                />
                {errors.password && <p className={styles.error}>{errors.password?.message}</p>}
                <button className={styles.button} type="submit">Sign In</button>
            </form>
        </main>
    );
};

export default Example;