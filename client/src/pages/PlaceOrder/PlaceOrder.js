import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Checkout from '../../components/Checkout/Checkout';
import Message from '../../components/Message/Message';
import { orderCreate } from '../../features/order/orderSlice';
import styles from './PlaceOrder.module.scss';

function PlaceOrder() {

    const cart = useSelector((state) => state.cart);
    const { order, isLoading, isError, isSuccess, message } = useSelector((state) => state.order);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate(`/orders/${order._id}`);
        }
        // eslint-disable-next-line
    }, [isSuccess, navigate]);


    const itemsPrice = cart.cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0).toFixed(2);
    let shippingPrice = (Number(itemsPrice) * 0.15).toFixed(2);
    if (shippingPrice > 150) {
        shippingPrice = 0;
    }
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);


    const placeOrderHandler = () => {
        const orderData = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: Number(itemsPrice),
            shippingPrice: Number(shippingPrice),
            totalPrice: Number(totalPrice),
        };
        console.log(orderData);
        dispatch(orderCreate(orderData));
    };

    return (
        <>
            {isError && <Message text={message} />}
            <Checkout step1 step2 step3 step4 />
            <section>
                <div className={styles.shipping}>
                    <h2>Shipping</h2>
                    <p className={styles.shipping__address}>Address:
                        <span>{cart.shippingAddress.address}</span>
                        <span>{cart.shippingAddress.city}</span>
                        <span>{cart.shippingAddress.country}</span>
                        <span>{cart.shippingAddress.postalCode}</span>
                    </p>
                </div>
                <div className={styles.method}>
                    <h2>Payment Method</h2>
                    <p>Method: {cart.paymentMethod}</p>
                </div>
                <div className={styles.items}>
                    <h2>Order Items</h2>
                    <div>
                        {cart.cartItems.length === 0 ? <p>Your Cart Is Empty</p> : (
                            <>
                                {cart.cartItems.map((item) => (
                                    <div className={styles.items__wrapper} key={item.product}>
                                        <img src={item.image} alt={item.name} width={50} height={50} />
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        <p>{item.qty} x {item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className={styles.summary}>
                <h2>Order Summary</h2>
                <div className={styles.summary__wrapper}>
                    <h3>Items:</h3>
                    <p>{itemsPrice}</p>

                    <h3>Shipping Cost:</h3>
                    <p>{shippingPrice}</p>

                    <h3>Total:</h3>
                    <p>{totalPrice}</p>
                </div>
                <div>
                    <button
                        type="button"
                        disabled={cart.cartItems.length === 0}
                        onClick={placeOrderHandler}
                        className='btn'
                    >
                        Place Order
                    </button>
                </div>
            </section>

        </>
    );
}

export default PlaceOrder;