import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Spinner/Spinner';
import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { getUserData } from '../../utils/user';
import styles from './Cart.module.scss';

function Cart() {

    const { cartItems, isLoading, isSuccess, isError, message } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const user = getUserData();

    const id = params.id;
    const qty = Number(searchParams.get('qty'));

    useEffect(() => {
        if (id) {
            const itemAndQty = { id, qty };
            dispatch(addToCart(itemAndQty));
        }


    }, [dispatch, qty, id]);

    if (isLoading) {
        return <Spinner />;
    }

    const updateQtyHandler = (e, id) => {
        const qty = Number(e.target.value);
        const itemAndQty = { id, qty };
        dispatch(addToCart(itemAndQty));
    };
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));

    };

    const checkoutHandler = () => {
        user ? navigate('/shipping')
            : navigate('/shipping?redirect=shipping');
    };

    return (
        <section className={styles['cart']}>
            {cartItems.length === 0
                ? <div className={styles['cart__empty']}>
                    <h3>Your Cart Is Currently Empty!</h3>
                </div>
                : (
                    cartItems.map(item => (
                        <div key={item.product}>
                            <Link to={`/products/${item.product}`}>
                                <img src={item.image} alt={item.name} width={80} height={40} />
                                <h3>{item.name}</h3>
                            </Link>
                            <span>price: {item.price}</span>
                            <p>Quantity</p>
                            <select
                                value={item.qty}
                                onChange={(e) => updateQtyHandler(e, item.product)}
                            >
                                {[...Array(item.countInStock).keys()]
                                    .map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))
                                }
                            </select>
                            <div>
                                <button
                                    onClick={() => removeFromCartHandler(item.product)}
                                    type='button'
                                    className='btn'
                                >
                                    Remove Item
                                </button>
                            </div>
                            <hr />
                        </div>
                    ))
                )
            }

            {cartItems.length >= 1 && (
                <section>
                    <div>
                        <h3>Total products: {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}</h3>
                        <h3>Total price:
                            {cartItems
                                .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                                .toFixed(2)
                            }
                        </h3>
                    </div>

                    <div>
                        <button
                            type='button'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                            className='btn'
                        >
                            Proceed To Checkout
                        </button>

                    </div>
                </section>
            )}


        </section>

    );
}

export default Cart;