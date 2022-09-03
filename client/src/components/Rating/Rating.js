import { BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import style from './Rating.module.scss';

function Rating({ value, reviewsCount }) {
    const startConut = [1, 2, 3, 4, 5];

    return (
        <div>
            <span>
                <h3>Rating</h3>
                <ul className={style.rating}>

                    <li >
                        {value >= 1
                            ? <BsStarFill />
                            : value >= 0.5
                                ? <BsStarHalf />
                                : <BsStar />
                        }
                    </li>
                    <li>
                        {value >= 2
                            ? <BsStarFill />
                            : value >= 1.5
                                ? <BsStarHalf />
                                : <BsStar />
                        }
                    </li>
                    <li>
                        {value >= 3
                            ? <BsStarFill />
                            : value >= 2.5
                                ? <BsStarHalf />
                                : <BsStar />
                        }
                    </li>
                    <li>
                        {value >= 4
                            ? <BsStarFill />
                            : value >= 3.5
                                ? <BsStarHalf />
                                : <BsStar />
                        }
                    </li>
                    <li>
                        {value >= 5
                            ? <BsStarFill />
                            : value >= 4.5
                                ? <BsStarHalf />
                                : <BsStar />
                        }
                    </li>

                    <span> {reviewsCount && reviewsCount} Reviews</span>
                </ul>
            </span>
        </div>
    );
}

export default Rating;