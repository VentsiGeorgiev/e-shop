import { Link } from 'react-router-dom';

function Product({ product }) {
    return (
        <section>
            <Link to={`/product/${product._id}`}>
                <div>
                    <img src={product.image} alt={product.name} height={240} width={250} />
                    <h3>{product.name}</h3>
                    <h4>Rating: {product.rating}</h4>
                </div>
            </Link>
        </section>
    );
}

export default Product;