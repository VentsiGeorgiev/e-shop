import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Checkout from '../../components/Checkout/Checkout';
import { savePaymentMethod } from '../../features/cart/cartSlice';

function Payment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

    if (!shippingAddress) {
        navigate('/shipping');
    }

    const [payment, setPayment] = useState(paymentMethod);


    const onSubmitHandler = (e) => {
        e.preventDefault();

        console.log(payment);

        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');

    };

    return (
        <>
            <Checkout step1 step2 step3 />
            <h1>Payment Method</h1>
            <form className='form' onSubmit={onSubmitHandler}>
                <fieldset>
                    <legend>Select a payment method:</legend>
                    <div>
                        <label htmlFor="PayPal">PayPal or Credit Card</label>
                        <input
                            type="radio"
                            id="PayPal"
                            name="PayPal"
                            value="PayPal"
                            checked={payment === 'PayPal'}
                            onChange={(e) => {
                                setPayment(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="PayByDelivery">Pay On Delivery</label>
                        <input
                            type="radio"
                            id="payOnDelivery"
                            name="payOnDelivery"
                            value="Pay On Delivery"
                            checked={payment === 'Pay On Delivery'}
                            onChange={(e) => {
                                setPayment(e.target.value);
                            }}
                        />
                    </div>
                </fieldset>

                <button className='btn'>Continue</button>
            </form>
        </>

    );
}

export default Payment; 