import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message/Message';
import Spinner from '../../components/Spinner/Spinner';
import { getOrderDetails, payOrder } from '../../features/order/orderSlice';

function Order() {

    const { orderDetails, isLoading, isError, isSuccess, message } = useSelector((state) => state.order);

    const params = useParams();
    const orderId = params.id;
    const dispatch = useDispatch();

    useEffect(() => {

        // const addPayPalScript = async () => {
        //     try {
        //         const res = await fetch('/api/config/paypal');
        //         const clientId = await res.json();

        //         const script = document.createElement('script');
        //         script.type = 'text/javascript';
        //         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        //         script.async = true;
        //         script.onload = () => {
        //             setSdkReady(true);
        //         };
        //         document.body.appendChild(script);

        //     } catch (error) {
        //         console.log(error);
        //     }

        // };
        // addPayPalScript();


        dispatch(getOrderDetails(orderId));

    }, [dispatch, orderId]);

    const completeOrder = (e) => {
        e.preventDefault();
        console.log('complete order');
        dispatch(getOrderDetails(orderId));
        dispatch(payOrder(orderId));
    };

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
                {
                    orderDetails.isPaid === false ? (
                        <h4>Not Delivered</h4>
                    ) : (
                        <h4>Delivery in proccess</h4>
                    )}
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

                <div>
                    <hr />
                    {orderDetails.isPaid === false && <button onClick={completeOrder}> Complete order</button>}


                </div>

            </section>

        </>
    );
}

export default Order;