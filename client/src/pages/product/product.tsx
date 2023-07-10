import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosBase} from "../../API/axiosApi.ts";
import styles from  './index.module.css'
import {EXTERNAL_SERVER_BASE_URL} from "../consts.ts";

interface Product {
    id:number,
    name:string,
    images:[string],
    price:number,
    categories:[string],
    sizes:[string]
}

const Product = () => {
    const [product, setProduct] = useState<Product | null>(null)
    useEffect(() => {
        axiosBase.get(`/product/${id}`).then(res => res).then(data => setProduct(data.data))
    },[])
    console.log(product);
    const {id} = useParams()
    console.log(id)
    return (
        <main className={styles.product}>
            {
                product &&
                <>
                    <div className={styles.img__wrapper}>
                        <img className={styles.img} src={`${EXTERNAL_SERVER_BASE_URL}/${product.images[0]}`} alt=""/>
                    </div>
                    <div className={styles.product__content}>
                        <h1 className={styles.product__title}>{product.name}</h1>
                        <span className={styles.product__price}>{product.price} $</span>
                        <div className={styles.product__sizes}>
                            {
                                product.sizes.map(size => <div className={styles.size}>{size}</div>)
                            }
                        </div>
                        <div className={styles.product__categories}>
                            {
                                product.categories.map(category => <div className={styles.category}>{category}</div>)
                            }
                        </div>
                    </div>
                </>
            }
        </main>
    );
};

export default Product;