import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <img
            src="https://lumeneobistro.md/img/logo_05.svg"
            alt="LUME Neobistro"
            width="100"
            height="49"
          ></img>
        </div>
        <div className={`${styles.footer__contacts} ${styles.footer_contacts}`}>
          <div className={styles.footer_contacts__item}>
            str. Vlaicu Pârcălab 43, Chișinău, MD-2012
          </div>
          <div className={styles.footer_contacts__item}>
            <a href="tel:+37369712000">
              +37369712000
            </a>
            ,
            <a href="mailto:neobistro.lume@gmail.com">
              neobistro.lume@gmail.com
            </a>
          </div>
          <div className={styles.footer_contacts__item}>
            Waiting for you from 10:00 to 23:00
          </div>
        </div>
        <div className="footer__copy copy-footer">
          <span className="copy-footer__item">© 2024, All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
