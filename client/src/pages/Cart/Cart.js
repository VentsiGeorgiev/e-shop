import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Spinner/Spinner';
import { addToCart, reset } from '../../features/cart/cartSlice';

function Cart() {

    const { cartItems, isLoading, isSuccess, isError, message } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const params = useParams();
    const [searchParams] = useSearchParams();

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
        console.log(id);
    };

    const checkoutHandler = () => {
        console.log('checkout');
    };

    return (
        <section>
            <BackButton />
            <h2>Shopping Cart</h2>

            {cartItems.length === 0
                ? <h3>Your Cart Is Currently Empty!</h3>
                : (
                    cartItems.map(item => (
                        <section>
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
                                    >
                                        Remove Item
                                    </button>
                                </div>
                                <hr />
                            </div>
                        </section>
                    ))
                )
            }

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
                    >
                        Proceed To Ckeckout
                    </button>
                </div>


            </section>

        </section>

    );
}

export default Cart;