import {MouseEventHandler, ReactElement} from "react";
import styles from './index.module.css'

interface Props {
    className?:string,
    type?: 'submit' | 'reset' | 'button' | undefined;
    onClick?: MouseEventHandler
    disabled?:boolean,
    children:string | ReactElement
}
const MyButton = ({className, type='submit', disabled, onClick, children}:Props) => {
    return (
        <button className={`${styles.MyButton} ${className}`} type={type} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default MyButton;