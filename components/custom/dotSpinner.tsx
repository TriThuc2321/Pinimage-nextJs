import styles from '~/styles/DotSpinner.module.css';

function DotSpinner({ className }: { className?: string }) {
    return (
        <div className={`${styles.dot_spinner} ${className}`}>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
        </div>
    );
}

export default DotSpinner;
