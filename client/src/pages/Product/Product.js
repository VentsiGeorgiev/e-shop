import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Rating from '../../components/Rating/Rating';
import products from '../../data/products';


function Product() {
    const params = useParams();
    const product = products.find((p) => p._id === params.id);

    console.log(product.image);


    return (
        <section>
            <BackButton />
            <h1>Product </h1>

            <div>
                <img src={product.image} alt={product.name} height={400} width={500} />
                <h2>{product.name}</h2>
                <Rating value={product.rating} numReviews={product.numReviews} />
                <h3>Price: {product.price}</h3>
                <p>Description: {product.description}</p>
                <p>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</p>
                <button disabled={product.countInStock === 0}  >Add To Card</button>
            </div>

        </section>
    );
}

export default Product;