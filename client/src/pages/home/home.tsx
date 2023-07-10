import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {fetchProducts} from "../../features/products.slice.ts";
import styles from './index.module.css'
import MyButton from "../../shared/UI/MyButton";
import ProductLayout from "../../widgets/ProductLayout/product.layout.tsx";
import {Link} from "react-router-dom";


const Home = () => {
    const dispatch:ThunkDispatch<RootState, any, any> = useDispatch()
    const products = useSelector((state:RootState) => state.products.data)
    console.log(products);
    useEffect(() => {
        dispatch(fetchProducts())
    },[])
    return (
        <main className={styles.main}>
            <section className={styles.hero} style={{backgroundImage:'url(/img_10.5.jpg)'}}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Stylist picks beat the heat</h1>
                    <MyButton className={styles.button}>Shop now</MyButton>
                </div>
            </section>
            <section className={styles.container}>
                <h3 className={styles.container__title}>Discover NEW Arrivals</h3>
                <h4 className={styles.container__subtitle}>Recently added shirts!</h4>
                <div className={styles.new__wrapper}>
                    {
                        products && products.map(product => <Link key={product.id} className={styles.new} to={`/product/${product.id}`}><ProductLayout product={product}/></Link>)
                    }
                </div>
            </section>
            <section className={styles.benefits}>
                <div className={styles.benefit}>
                    <img className={styles.benefit__img} src="/benefit_icon.svg" alt="Benefit icon"/>
                    <div className={styles.benefit__content}>
                        <h4 className={styles.benefit__title}>Benefit</h4>
                        <p className={styles.benefit__text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, voluptatum!
                        </p>
                    </div>
                </div>
                <div className={styles.benefit}>
                    <img className={styles.benefit__img} src="/benefit_icon.svg" alt="Benefit icon"/>
                    <div className={styles.benefit__content}>
                        <h4 className={styles.benefit__title}>Benefit</h4>
                        <p className={styles.benefit__text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, voluptatum!
                        </p>
                    </div>
                </div>
                <div className={styles.benefit}>
                    <img className={styles.benefit__img} src="/benefit_icon.svg" alt="Benefit icon"/>
                    <div className={styles.benefit__content}>
                        <h4 className={styles.benefit__title}>Benefit</h4>
                        <p className={styles.benefit__text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, voluptatum!
                        </p>
                    </div>
                </div>
                <div className={styles.benefit}>
                    <img className={styles.benefit__img} src="/benefit_icon.svg" alt="Benefit icon"/>
                    <div className={styles.benefit__content}>
                        <h4 className={styles.benefit__title}>Benefit</h4>
                        <p className={styles.benefit__text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, voluptatum!
                        </p>
                    </div>
                </div>
            </section>
            <section className={styles.promos}>
                <div className={styles.promo}>
                    <div className={styles.promo__content}>
                        <h4 className={styles.promo__title}>Peace of Mind</h4>
                        <p className={styles.promo__text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa delectus dolores enim error fugiat illo ipsa modi quis ullam voluptas!
                        </p>
                        <MyButton className={styles.promo__button}>Buy Now</MyButton>
                    </div>
                </div>
                <div className={styles.promo}>
                    <div className={styles.promo__content}>
                        <h4 className={styles.promo__title}>Buy 2 Get 1 Free</h4>
                        <p className={styles.promo__text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa delectus dolores enim error fugiat illo ipsa modi quis ullam voluptas!
                        </p>
                        <MyButton className={styles.promo__button}>Buy Now</MyButton>
                    </div>
                </div>
            </section>
            <section className={styles.container}>
                <h3 className={styles.container__title}>Top Sellers</h3>
                <h4 className={styles.container__subtitle}>Browse our top-selling products</h4>
                <div className={styles.new__wrapper}>
                    {
                        products && products.map(product => <ProductLayout key={product.id} className={styles.new} product={product}/>)
                    }
                </div>
                <MyButton className={styles.container__button}>Shop now</MyButton>
            </section>
        </main>
    );
};

export default Home;