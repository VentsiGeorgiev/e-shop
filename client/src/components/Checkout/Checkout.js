import { Link } from 'react-router-dom';
import styles from './Checkout.module.scss';

function Checkout({ step1, step2, step3, step4 }) {

    return (
        <div className={styles.checkout}>
            <div>
                {step1
                    ? (
                        <Link to='/sign-in'>
                            <p className={step1 ? `${styles.active}` : ''}>Sign In</p>
                        </Link>)
                    : (
                        <div disabled={true} to='/sign-in'>
                            <p className={step1 ? `${styles.active}` : ''}>Sign In</p>
                        </div>)
                }
            </div>
            <div>
                {step2
                    ? (
                        <Link to='/shipping'>
                            <p className={step2 ? `${styles.active}` : ''}>Shipping</p>
                        </Link>)
                    : (
                        <div disabled={true} to='/shipping'>
                            <p className={step2 ? `${styles.active}` : ''}>Shipping</p>
                        </div>)
                }
            </div>
            <div>
                {step3
                    ? (
                        <Link to='/payment'>
                            <p className={step3 ? `${styles.active}` : ''}>Payment</p>
                        </Link>)
                    : (
                        <div disabled={true} to='/payment'>
                            <p className={step3 ? `${styles.active}` : ''}>Payment</p>
                        </div>)
                }
            </div>
            <div>
                {step4
                    ? (
                        <Link to='/placeorder'>
                            <p className={step4 ? `${styles.active}` : ''}>Place Order</p>
                        </Link>)
                    : (
                        <div disabled={true} to='/placeorder'>
                            <p className={step4 ? `${styles.active}` : ''}>Place Order</p>
                        </div>)
                }
            </div>
        </div>

    );
}

export default Checkout;