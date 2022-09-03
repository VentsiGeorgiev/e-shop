import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
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
                                <NavLink className={styles.header__navigation__link} to='/sign-in'>Sign In</NavLink>
                            </li>
                        </ul>
                    </nav>

                </div>
            </section>
        </header >
    );
}

export default Header;