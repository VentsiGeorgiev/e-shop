import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../features/auth/authSlice';
import { getUserOrders } from '../../features/order/orderSlice';

function Profile() {

    const { user } = useSelector((state) => state.auth);
    const { userOrders } = useSelector((state) => state.order);

    const [changeDetails, setChangeDetails] = useState(false);
    const [updatedName, setupdatedName] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch]);


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

            <section>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userOrders && userOrders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.updatedAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? 'Yes' : 'No'}</td>
                                <td>In process</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </section>
        </>
    );
}

export default Profile;