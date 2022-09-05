import styles from './Message.module.scss';

function Message({ text }) {
    return (
        <div className={styles.message}>
            <span>{text}</span>
        </div>

    );
}

export default Message;