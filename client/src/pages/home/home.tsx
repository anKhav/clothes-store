import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {fetchProducts} from "../../features/products.slice.ts";
import ProductLayout from "../../widgets/ProductLayout/product.layout.tsx";
import styles from './index.module.css'


const Home = () => {
    const dispatch:ThunkDispatch<RootState, any, any> = useDispatch()
    const products = useSelector((state:RootState) => state.products.data)
    console.log(products);
    useEffect(() => {
        dispatch(fetchProducts())
    },[])
    return (
        <main className={styles.main}>
            <div className={styles.products}>
                {
                    products?.map((product) => <ProductLayout key={product.id} product={product}/>)
                }
            </div>
        </main>
    );
};

export default Home;