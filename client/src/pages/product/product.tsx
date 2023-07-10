import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosBase} from "../../API/axiosApi.ts";

const Product = () => {
    const [product, setProduct] = useState({})
    useEffect(() => {
        axiosBase.get(`/product/${id}`).then(res => res).then(data => setProduct(data.data))
    },[])
    console.log(product);
    const {id} = useParams()
    console.log(id)
    return (
        <div>
            Product {id}
        </div>
    );
};

export default Product;