// Hamburger.jsx
import styles from "./Hamburger.module.css";

function Hamburger({ isOpen, setIsOpen }) {
  return (
    <div className={styles.burger}>
      <button
        type="button"
        aria-label="menu"
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.menu__icon} ${isOpen ? styles.open : ""}`}
      >
        <span></span>
      </button>
    </div>
  );
}

export default Hamburger;
