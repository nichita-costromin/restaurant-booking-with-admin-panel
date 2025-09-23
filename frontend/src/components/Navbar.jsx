import styles from "./Navbar.module.css";

function Navbar({handleLogout}) {
  return (
    <nav className={styles.staff__nav}>
      <ul className={styles.staff__ul}>
        <li className={styles.staff__element}>
          <a href="/" className={styles.staff__btn}>
            Home
          </a>
        </li>
        <li className={styles.staff__element}>
          <a href="/staff" className={styles.staff__btn}>
            Staff
          </a>
        </li>
        <li className={styles.staff__element}>
          <a href="/staff/create-staff" className={styles.staff__btn}>
            Create Staff
          </a>
        </li>
        <li className={styles.staff__element}>
          <button onClick={handleLogout} className={styles.staff__btn}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
