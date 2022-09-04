import Product from '../../components/Product/Product.js';
import { useEffect } from 'react';
import style from './Home.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { getProducts, reset } from '../../features/product/productSlice';

function Home() {

    const { products, isLoading, isSuccess } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getProducts());
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };

    }, [dispatch, isSuccess]);

    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    return (
        <section>
            <h1>Welcome to e-Shop</h1>
            <h2>Latest Products</h2>
            <section className={style.products}>
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </section>

        </section>
    );
}

export default Home;