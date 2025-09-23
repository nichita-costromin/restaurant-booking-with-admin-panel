import { useState } from "react";
import { useBooking } from "../contexts/BookingContext";
import styles from "./FormPopup.module.css";

function FormPopup() {
  const { isFormOpen, closeBooking } = useBooking();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    people: "",
    additional: "",
  });

  if (!isFormOpen) return null;

  const closeHandle = () => {
    closeBooking();
    document.querySelector("html").classList = "";
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullDate = `${formData.date}T${formData.time}:00`;

    try {
      const res = await fetch("http://localhost:8000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: fullDate,
          numberOfPeople: parseInt(formData.people),
          details: formData.additional,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Something went wrong");
      } else {
        alert("Reservation received! We'll contact you in short time.");
      }
    } catch (err) {
      alert("Failed to send:" + err.message);
      console.log(err.message);
    }
  };

  return (
    <div className={`${styles.popup} ${isFormOpen ? styles.popup__show : ""}`}>
      <div className={styles.popup__wrapper}>
        <div
          className={`${styles.popup__content} ${isFormOpen ? styles.popup__show : ""}`}
        >
          <div className={styles.popup__body}>
            <div className={styles.popup__close__button}>
              <button
                className={styles.popup__close}
                onClick={closeHandle}
              ></button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className={`${styles.popup__form} ${styles.form}`}
          >
            <h3 className={styles.form__title}>Reservations</h3>
            <div className={styles.form__text}>
              After submitting the form, our manager will contact you with to
              confirm your reservation.
            </div>
            {/* Form Item 1 Separator */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                className={`${styles.form__input}`}
              />
            </div>
            {/* Form Item 2 Separator */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>
                Phone number <span className={styles.required}>*</span>
              </label>
              <input
                onChange={handleChange}
                type="tel"
                name="phone"
                className={`${styles.form__input}`}
              />
            </div>
            {/* Form Item 3 Separator */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className={`${styles.form__input}`}
              />
            </div>
            {/* Form Item 4 Separator */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>
                When are you planning to visit us? Date:
                <span className={styles.required}>*</span>
              </label>
              <input
                onChange={handleChange}
                type="date"
                name="date"
                className={`${styles.form__input}`}
              />
            </div>
            {/* Form Item 5 Separator */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>
                Please indicate your desired time? Time:
                <span className={styles.required}>*</span>
              </label>
              <input
                onChange={handleChange}
                type="time"
                name="time"
                className={`${styles.form__input}`}
              />
            </div>
            {/* Form Item 6 Separator */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>
                Specify the number of people visiting{" "}
                <span className={styles.required}>*</span>
              </label>
              <input
                onChange={handleChange}
                type="number"
                name="people"
                className={`${styles.form__input}`}
              />
            </div>
            {/* Form Item 7 Separator */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>Additional requests</label>
              <input
                onChange={handleChange}
                type="text"
                name="additional"
                className={`${styles.form__input}`}
              />
            </div>
            {/* Form Item 8 Separator */}
            <div className="form__action btn-center">
              <button
                type="submit"
                title="send"
                className={`${styles.form__button} ${styles.reservation__sent}`}
              >
                <span className="btn__name">send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default FormPopup;
