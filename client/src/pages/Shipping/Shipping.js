import { useState } from 'react';

function Shipping() {
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalCode: '',
        contry: '',
    });

    const { address, city, postalCode, contry } = formData;

    const onChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            address,
            city,
            postalCode,
            contry
        };
        console.log(data);
    };

    return (
        <>
            <h1>Shipping</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={onChangeHandler}
                        placeholder="Address"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={onChangeHandler}
                        placeholder="City"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={postalCode}
                        onChange={onChangeHandler}
                        placeholder="Postal code"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="contry"
                        name="contry"
                        value={contry}
                        onChange={onChangeHandler}
                        placeholder="Country"
                    />
                </div>
                <button>Submit</button>
            </form>
        </>

    );
}

export default Shipping; 