import Product from '../../components/Product/Product.js';
import { useEffect } from 'react';
import style from './Home.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { getProducts, reset } from '../../features/product/productSlice';
import Spinner from '../../components/Spinner/Spinner.js';
import Message from '../../components/Message/Message.js';

function Home() {

    const { products, isLoading, isSuccess, isError, message } = useSelector((state) => state.products);
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
        return <Spinner />;
    }


    return (
        <>
            {isError && <Message text={message} />}
            <section>
                <h3>Latest Products</h3>
                <section className={style.products}>
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </section>
            </section>
        </>
    );
}

export default Home;