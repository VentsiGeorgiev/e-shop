import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Checkout from '../../components/Checkout/Checkout';
import { addShippingAddress } from '../../features/cart/cartSlice';

function Shipping() {

    const { shippingAddress } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            address,
            city,
            postalCode,
            country
        };

        dispatch(addShippingAddress(data));
        navigate('/payment');

    };

    return (
        <>
            <Checkout step1 step2 />
            <h1>Shipping</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Postal code"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="contry"
                        name="contry"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                    />
                </div>
                <button>Continue</button>
            </form>
        </>

    );
}

export default Shipping; 