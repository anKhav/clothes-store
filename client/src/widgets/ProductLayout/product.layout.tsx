import {EXTERNAL_SERVER_BASE_URL} from "../../pages/consts.ts";
import {ReactElement} from "react";
import styles from './index.module.css'


interface Product {
    id:number
    name:string,
    price:number,
    images:[string],
    sizes:[string | null],
    categories:[string | null],
}
interface Props {
    product:Product,
    className?:string
}
const ProductLayout = ({product, className}:Props):ReactElement => {
    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.img_wrapper}>
                <img className={styles.img} src={`${EXTERNAL_SERVER_BASE_URL}/${product.images[0]}`} alt=""/>
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{product.name}</h2>
                <p>{product.price}$</p>
            </div>
        </div>
    );
};

export default ProductLayout;