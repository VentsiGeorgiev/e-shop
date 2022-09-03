import { FaArrowCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button className={styles['back-btn']} onClick={() => navigate(-1)}>
            <FaArrowCircleLeft className={styles.icon} /> Back
        </button>
    );
};

export default BackButton;