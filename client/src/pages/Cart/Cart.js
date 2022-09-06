import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
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


    return (
        <>
            <BackButton />
            <div>Cart</div>
        </>

    );
}

export default Cart;