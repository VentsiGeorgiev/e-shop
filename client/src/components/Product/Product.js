import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';

function Product({ product }) {
    return (
        <section>
            <Link to={`/products/${product._id}`}>
                <div>
                    <img src={product.image} alt={product.name} height={240} width={250} />
                    <h3>{product.name}</h3>
                </div>
                <h4>{product.price}</h4>
                <Rating key={product._id} value={product.rating} reviewsCount={product.numReviews} />
            </Link>
        </section>
    );
}

export default Product;