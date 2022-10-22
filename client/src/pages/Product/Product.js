import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Rating from '../../components/Rating/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, reset } from '../../features/product/productSlice';
import Spinner from '../../components/Spinner/Spinner';
import Message from '../../components/Message/Message';


function Product() {
    const [qty, setQty] = useState(1);

    const { product, isLoading, isSuccess, isError, message } = useSelector((state) => state.products);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;


    useEffect(() => {

        dispatch(getProduct(id));

        // return () => {
        //     if (isSuccess) {
        //         dispatch(reset());
        //     }
        // };


    }, [dispatch, isSuccess, id]);

    if (isLoading) {
        return <Spinner />;
    }

    const addToCardHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    return (
        <section>
            {isError && <Message text={message} />}
            {/* <BackButton /> */}
            <div>
                <img src={product.image} alt={product.name} height={400} width={500} />
                <h2>{product.brand}</h2>
                <Rating value={product.rating} numReviews={product.numReviews} />
                <h3>Price: {product.price}</h3>
                <p>Description: {product.description}</p>
                <p>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</p>

                {product.countInStock > 0 && (
                    <div>
                        <p>Quantity</p>
                        <select value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()]
                                .map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))
                            }
                        </select>
                    </div>
                )}

                <button
                    onClick={addToCardHandler}
                    disabled={product.countInStock === 0}
                    className='btn'
                >
                    Add To Cart
                </button>
            </div>

        </section>
    );
}

export default Product;