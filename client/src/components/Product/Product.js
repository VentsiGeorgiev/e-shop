import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import styles from './Product.module.scss';

function Product({ product }) {

    console.log('here');
    console.log(product);

    return (
        <div className={styles['product']}>
            <Link to={`/products/${product._id}`}>
                <img className={styles['product__img']} src={product.image} alt={product.name} />
                <h4>{product.brand}</h4>
                <Rating key={product._id} value={product.rating} reviewsCount={product.numReviews} />
                <h4 className={styles['product__price']}>{product.price}</h4>
            </Link>
        </div>
    );
}

export default Product;