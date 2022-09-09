import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message/Message';
import Spinner from '../../components/Spinner/Spinner';
import { getOrderDetails } from '../../features/order/orderSlice';

function Order() {

    const { orderDetails, isLoading, isError, isSuccess, message } = useSelector((state) => state.order);

    const params = useParams();
    const orderId = params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {isError && <Message text={message} />}


            <section>
                <h2>Order {orderDetails._id}</h2>
                {orderDetails.user && orderDetails.user.name && <p>Name: {orderDetails.user.name}</p>}
                {orderDetails.user && orderDetails.user.email && <p>Email: {orderDetails.user.email}</p>}
                <div>
                    {orderDetails.shippingAddress &&
                        <span>Shipping:
                            {orderDetails.shippingAddress.address}
                            {orderDetails.shippingAddress.city}
                            {orderDetails.shippingAddress.country}
                            {orderDetails.shippingAddress.postalCode}
                        </span>}

                </div>
                <div>
                    <h2>Payment Method</h2>
                    <p>Method: {orderDetails.paymentMethod}</p>

                </div>
                <div>
                    <h2>Order items</h2>
                    {orderDetails.orderItems.map((item) => (
                        <div key={item.product}>
                            <img src={item.image} alt={item.name} width={50} height={50} />
                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                            <p>{item.qty} x {item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <section>
                    <h2>Order Summary</h2>
                    <div>
                        <h3>Items</h3>
                        <p>{orderDetails.totalPrice}</p>
                    </div>
                    <div>
                        <h3>Shipping</h3>
                        <p>{orderDetails.shippingPrice}</p>
                    </div>
                    <div>
                        <h3>Total</h3>
                        <p>{orderDetails.totalPrice}</p>
                    </div>
                    <div>
                    </div>
                </section>

            </section>

        </>
    );
}

export default Order;