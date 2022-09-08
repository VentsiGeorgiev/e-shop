import { Link } from 'react-router-dom';
function Checkout({ step1, step2, step3, step4 }) {
    return (
        <>
            <div>
                {step1
                    ? (
                        <Link to='/sign-in'>
                            <h3>Sign In</h3>
                        </Link>)
                    : (
                        <div disabled={true} to='/sign-in'>
                            <p>Sign In</p>
                        </div>)
                }
            </div>
            <div>
                {step2
                    ? (
                        <Link to='/shipping'>
                            <h3>Shipping</h3>
                        </Link>)
                    : (
                        <div disabled={true} to='/shipping'>
                            <p>Shipping</p>
                        </div>)
                }
            </div>
            <div>
                {step3
                    ? (
                        <Link to='/payment'>
                            <h3>Payment</h3>
                        </Link>)
                    : (
                        <div disabled={true} to='/payment'>
                            <p>Payment</p>
                        </div>)
                }
            </div>
            <div>
                {step4
                    ? (
                        <Link to='/placeorder'>
                            <h3>Place Order</h3>
                        </Link>)
                    : (
                        <div disabled={true} to='/placeorder'>
                            <p>Place Order</p>
                        </div>)
                }
            </div>
        </>

    );
}

export default Checkout;