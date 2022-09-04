import Product from '../../components/Product/Product.js';
import { useState, useEffect } from 'react';
import style from './Home.module.scss';

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        };
        fetchProducts();

    }, []);

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