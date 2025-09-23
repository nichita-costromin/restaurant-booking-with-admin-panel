import FormPopup from "./FormPopup";
import Header from "./Header";
import styles from "./Homepage.module.css";
import Footer from "./Footer";
function Homepage() {
  return (
    <>
      <Header></Header>
      <main className={`${styles.page} py-[0] pt-[100px]`}>
        <div className={`${styles.page__container__wrapper}`}>
          <div className={`${styles.main__container}`}>
            <h1 className={`${styles.title__text} font-main pt-20`}>
              RESTAURANT LUME
            </h1>
          </div>
          <div className={`${styles.page__container}`}>
            {/* Container 2 */}
            <div className={`${styles.headline__container} one`}>
              <img
                className={`${styles.chess__field__image} ${styles.first__child__element}`}
                src="/images/interier.webp"
              ></img>
            </div>
            {/* Container 1 */}
            <div className={`${styles.headline__container} one`}>
              <h2 className={`${styles.headline__text} font-main pb-[20px]`}>
                A place of love and passion for the culinary craft
              </h2>
              <p
                className={`${styles.headline__description} font-secondary text-left text-[1rem] tracking-[normal] antialiased`}
              >
                Lume is a cozy corner of fusion cuisine in the heart of the
                Moldovan capital. Our restaurant offers a unique combination of
                modern cuisine and traditonal local dishes to delight our guests
                with a unique gastronomic experience.
              </p>
              <p
                className={`${styles.headline__description} font-secondary pt-[20px] text-left text-[1rem] tracking-[normal] antialiased`}
              >
                Being situated in the center of Chisinau makes it an ideal
                location for getting togetgher with friends, business meetings,
                romantic dinners and family celebrations. Lume brings people
                together.
              </p>
            </div>
          </div>
          {/* Part 3 */}
          <div className={`${styles.page__container} ${styles.third__section}`}>
            {/* Container 1 */}
            <div className={`${styles.headline__container} one`}>
              <h2
                className={`${styles.headline__text} ${styles.first__child__element} font-main pb-[20px]`}
              >
                Passion of the Open Flame
              </h2>
              <p
                className={`${styles.headline__description} font-secondary text-left text-[1rem] tracking-[normal] antialiased`}
              >
                Lume is a stylish restaurant where the attention to detail
                creates a unique atmosphere and experience. Handmade pottery
                serving dishes delight your senses while the hand crafted
                interior elements showcase the talent of our local artisans.
              </p>
              <p
                className={`${styles.headline__description} font-secondary pt-[20px] text-left text-[1rem] tracking-[normal] antialiased`}
              >
                The emphasis on natural materials interplays with the unique
                tastes and textures of Umami and the nature of fire to awaken
                your every sense. <br></br>Join us at Lume and discover culinary
                art at a whole new level.
              </p>
            </div>
            {/* Container 2 */}
            <div className={`${styles.headline__container} one`}>
              <img
                className={styles.chess__field__image}
                src="/images/interface2.webp"
              ></img>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
      <FormPopup></FormPopup>
    </>
  );
}

export default Homepage;
