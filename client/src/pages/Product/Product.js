import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Rating from '../../components/Rating/Rating';
import products from '../../data/products';


function Product() {
    const params = useParams();
    const product = products.filter((p) => p._id === params.id);

    console.log(product);


    return (
        <section>
            <BackButton />
            <h1>Product </h1>
        </section>
    );
}

export default Product;