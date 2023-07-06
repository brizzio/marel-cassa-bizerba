
import styles from './BouncingDots.module.css'

const BouncingDotsLoader = () => {
  return (
      <div className={styles.bouncingLoader}>
        <div></div>
        <div></div>
        <div></div>
      </div>
  );
};

export default BouncingDotsLoader;