import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, resetAuth } from '../../features/auth/authSlice';
import { resetCart } from '../../features/cart/cartSlice';
import styles from './Header.module.scss';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(resetAuth());
        dispatch(resetCart());
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <section className='container'>
                <div className={styles.header__navigation}>
                    <div>
                        <span >
                            <NavLink className={styles.header__navigation__logo} to='/'>e-Shop</NavLink>
                        </span>
                    </div>
                    <nav>
                        <ul className={styles.header__navigation__links}>
                            <li>
                                <AiOutlineShoppingCart className={styles.header__navigation__icon} />
                                <NavLink className={styles.header__navigation__link} to='/cart'>Cart</NavLink>
                            </li>
                            {user
                                ? (
                                    <li>
                                        <AiOutlineUser className={styles.header__navigation__icon} />
                                        <NavLink className={styles.header__navigation__link} to='/profile'>Profile</NavLink>
                                        <button className={`${styles['logout-btn']} btn`} onClick={onLogout}>Logout</button>
                                    </li>
                                )
                                : (<li>
                                    <AiOutlineUser className={styles.header__navigation__icon} />
                                    <NavLink className={styles.header__navigation__link} to='/sign-in'>Sign In</NavLink> </li>)
                            }

                        </ul>
                    </nav>

                </div>
            </section>
        </header >
    );
}

export default Header;