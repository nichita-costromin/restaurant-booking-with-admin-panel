import { useState } from "react";
import styles from "./NavMenu.module.css";

function NavMenu() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <ul className="menu__list menu-list pl-[3rem] text-left antialiased">
      <li className={`${styles.menu__item}`}>
        <a
          href="https://lumeneobistro.md/en/menu"
          target="_self"
          className={`${styles.menu__link} uppercase`}
        >
          Menu
        </a>{" "}
      </li>
      <li className={`${styles.menu__item}`}>
        <button
          onClick={() => toggleDropdown("wine")}
          type="button"
          className={`${styles.dropdown__toggle} ${styles.menu__link} uppercase`}
        >
          Wine
        </button>{" "}
        {activeDropdown === "wine" && (
          <ul
            aria-labelledby="dropdownMenuButton"
            data-target="parent_4"
            className={`${styles.dropdown__menu} dropdown__menu`}
          >
            <li className="dropdown__item">
              <a
                href="https://lumeneobistro.md/en/menu/winecard"
                className={`${styles.dropdown__link}`}
              >
                Wine list
              </a>
            </li>
            <li className="dropdown__item">
              <a
                href="https://lumeneobistro.md/en/menu/wine-shop"
                className={`${styles.dropdown__link}`}
              >
                Wine shop
              </a>
            </li>
          </ul>
        )}
      </li>
      <li className={`${styles.menu__item}`}>
        <button
          onClick={() => toggleDropdown("services")}
          type="button"
          className={`${styles.dropdown__toggle} ${styles.menu__link} uppercase`}
        >
          Services
        </button>{" "}
        {activeDropdown === "services" && (
          <ul
            aria-labelledby="dropdownMenuButton"
            data-target="parent_1"
            className={`${styles.dropdown__menu} dropdown__menu`}
          >
            <li className="dropdown__item">
              <a
                href="https://lumeneobistro.md/en/event-formats"
                className={`${styles.dropdown__link}`}
              >
                Event formats
              </a>
            </li>
            <li className="dropdown__item">
              <a
                href="https://lumeneobistro.md/en/catering"
                className={`${styles.dropdown__link}`}
              >
                Catering
              </a>
            </li>
            <li className="dropdown__item">
              <a
                href="https://lumeneobistro.md/en/promo"
                className={`${styles.dropdown__link}`}
              >
                Special offers
              </a>
            </li>
          </ul>
        )}
      </li>
      <li className={`${styles.menu__item}`}>
        <a
          href="https://lumeneobistro.md/en/events"
          className={`${styles.menu__link} uppercase`}
        >
          Events
        </a>{" "}
      </li>
      <li className={`${styles.menu__item}`}>
        <button
          onClick={() => toggleDropdown("about")}
          type="button"
          className={`${styles.dropdown__toggle} ${styles.menu__link} uppercase`}
        >
          About 
        </button>{" "}
        {activeDropdown === "about" && (
          <ul className={`${styles.dropdown__menu} dropdown__menu`}>
            <li className="dropdown__item">
              <a
                href="https://lumeneobistro.md/en/concept"
                className={`${styles.dropdown__link}`}
              >
                Concept
              </a>
            </li>
            <li className="dropdown__item">
              <a
                href="https://lumeneobistro.md/en/atmosphere"
                className={`${styles.dropdown__link}`}
              >
                Atmosphere
              </a>
            </li>
            <li className="dropdown__item">
              <a
                href="https://lumeneobistro.md/en/wines-from-moldova"
                className={`${styles.dropdown__link}`}
              >
                Moldovan wines
              </a>
            </li>
            <li className="dropdown__item">
              <a
                href="https://lumeneobistro.md/en/contacts"
                className={`${styles.dropdown__link}`}
              >
                Contacts
              </a>
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
}

export default NavMenu;
