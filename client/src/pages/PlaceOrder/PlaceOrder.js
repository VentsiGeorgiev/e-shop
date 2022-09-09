import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Checkout from '../../components/Checkout/Checkout';
import Message from '../../components/Message/Message';
import { orderCreate } from '../../features/order/orderSlice';

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
                <div>
                    <h2>Shipping</h2>
                    <p>Address:
                        {cart.shippingAddress.address},
                        {cart.shippingAddress.city}
                        {cart.shippingAddress.country}
                        {cart.shippingAddress.postalCode}
                    </p>
                </div>
                <div>
                    <h2>Payment Method</h2>
                    <p>Method: {cart.paymentMethod}</p>
                </div>
                <div>
                    <h2>Order Items</h2>
                    <div>
                        {cart.cartItems.length === 0 ? <p>Your Cart Is Empty</p> : (
                            <div>
                                {cart.cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt={item.name} width={50} height={50} />
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        <p>{item.qty} x {item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section>
                <h2>Order Summary</h2>
                <div>
                    <h3>Items</h3>
                    <p>{itemsPrice}</p>
                </div>
                <div>
                    <h3>Shipping</h3>
                    <p>{shippingPrice}</p>
                </div>
                <div>
                    <h3>Total</h3>
                    <p>{totalPrice}</p>
                </div>
                <div>
                    <button
                        type="button"
                        disabled={cart.cartItems.length === 0}
                        onClick={placeOrderHandler}
                    >
                        Place Order
                    </button>
                </div>
            </section>

        </>
    );
}

export default PlaceOrder;