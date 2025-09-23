// Header.jsx
import Hamburger from "./Hamburger";
import NavMenu from "./NavMenu";
import { useState } from "react";
import styles from "./Header.module.css";
import { useBooking } from "../contexts/BookingContext";


function Header() {
  const {openBooking} = useBooking()
  const [menuOpen, setMenuOpen] = useState(false);

const callFunc = () => {
  openBooking()
  document.querySelector("html").className = "popup__show"
}

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} px-[20px]`}>
        <Hamburger isOpen={menuOpen} setIsOpen={setMenuOpen} />

        <div
          className={`${styles.header__menu} ${
            menuOpen ? styles.active : ""
          }`}
        >
          <nav className={styles.menu__body}>
            <NavMenu closeMenu={() => setMenuOpen(false)} />
          </nav>
        </div>

        <a className={`${styles.header__logo} pr-[20px] pl-[20px]`} href="/">
          <img src="images/logo.svg" className="h-[40px] w-[40px]" alt="" />
        </a>
        <div className="header__action flex items-center">
          <a href="tel:+37369822974" className="mt-[5px]">
            <div
              className={`${styles.action__header__item} material-symbols-outlined ${styles.header_phone_icon}`}
            >
              call
            </div>
          </a>
          <div className="action__header__item">
            <button className={`${styles.bookings__button}`}
            onClick={callFunc}>
              <span className={`${styles.btn__icon} material-symbols-outlined calendar-icon`}>
                date_range
              </span>
              <span className="btn__name tracking-[normal]">Bookings</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
