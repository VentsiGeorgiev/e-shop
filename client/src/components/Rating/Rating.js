import { BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import styles from './Rating.module.scss';

function Rating({ value, numReviews }) {

    return (
        <div className={styles['rating']}>
            <ul className={styles['rating__list']}>

                <li className={styles['rating__star']}>
                    {value >= 1
                        ? <BsStarFill />
                        : value >= 0.5
                            ? <BsStarHalf />
                            : <BsStar />
                    }
                </li>
                <li className={styles['rating__star']}>
                    {value >= 2
                        ? <BsStarFill />
                        : value >= 1.5
                            ? <BsStarHalf />
                            : <BsStar />
                    }
                </li>
                <li className={styles['rating__star']}>
                    {value >= 3
                        ? <BsStarFill />
                        : value >= 2.5
                            ? <BsStarHalf />
                            : <BsStar />
                    }
                </li>
                <li className={styles['rating__star']}>
                    {value >= 4
                        ? <BsStarFill />
                        : value >= 3.5
                            ? <BsStarHalf />
                            : <BsStar />
                    }
                </li>
                <li className={styles['rating__star']}>
                    {value >= 5
                        ? <BsStarFill />
                        : value >= 4.5
                            ? <BsStarHalf />
                            : <BsStar />
                    }
                </li>

                <span> {numReviews && numReviews} Reviews</span>
            </ul>
        </div>
    );
}

export default Rating;