import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import styles from './Header.module.scss';

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
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
                        <ul>
                            <li>
                                <NavLink className={styles.header__navigation__link} to='/cart'>Cart</NavLink>
                                {user
                                    ? (
                                        <>
                                            <NavLink className={styles.header__navigation__link} to='/profile'>Profile</NavLink>
                                            <button className='btn' onClick={onLogout}>Logout</button>
                                        </>
                                    )
                                    : (<NavLink className={styles.header__navigation__link} to='/sign-in'>Sign In</NavLink>)
                                }

                            </li>
                        </ul>
                    </nav>

                </div>
            </section>
        </header >
    );
}

export default Header;