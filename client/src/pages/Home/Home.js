import Product from '../../components/Product/Product.js';
import products from '../../data/products.js';
import style from './Home.module.scss';

function Home() {
    return (
        <section className='container'>
            <h1>Welcome to e-Shop</h1>
            <h2>Latest Products</h2>
            <section className={style.products}>
                {products.map((product) => (
                    <Product product={product} />
                ))}
            </section>

        </section>
    );
}

export default Home;