import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Rating from '../../components/Rating/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, reset } from '../../features/product/productSlice';
import Spinner from '../../components/Spinner/Spinner';
import Message from '../../components/Message/Message';
import styles from './Product.module.scss';


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
        <section className={styles['product']}>
            {isError && <Message text={message} />}
            {/* <BackButton /> */}
            <img className={styles['product__image']} src={product.image} alt={product.name} />
            <div>
                <h2>{product.brand}</h2>
                <Rating value={product.rating} numReviews={product.numReviews} />
                <p>Description: {product.description}</p>
                <p>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</p>

            </div>
            <div className={styles['product__add']}>
                <h3 className={styles['product__add__price']}>Price: {product.price}</h3>
                {product.countInStock > 0 && (
                    <div className={styles['product__quantity']}>
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
                    className={`${styles['product__add__btn']} btn`}
                >
                    Add To Cart
                </button>
            </div>

        </section>
    );
}

export default Product;