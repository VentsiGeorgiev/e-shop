import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../features/auth/authSlice';
import { getUserOrders } from '../../features/order/orderSlice';

function Profile() {

    const { user } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.order);

    console.log('orders');
    console.log(orders);
    console.log('orders');

    const [changeDetails, setChangeDetails] = useState(false);
    const [updatedName, setupdatedName] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders());
    }, []);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        setChangeDetails(false);

        const data = {
            name: updatedName
        };

        dispatch(update(data));

    };

    return (
        <>
            <section>
                <h2>User Profile</h2>
                {
                    changeDetails
                        ? (<form onSubmit={onSubmitHandler}>
                            <input
                                type="text"
                                name="name"
                                value={updatedName}
                                onChange={(e) => setupdatedName(e.target.value)}
                            />
                            <button>Submit</button>
                        </form>)
                        : (<div>
                            <h3>profile name: {user.name}</h3>
                            <button onClick={() => setChangeDetails((prevState) => !prevState)}>Update name</button>
                        </div>)

                }


            </section>
        </>
    );
}

export default Profile;