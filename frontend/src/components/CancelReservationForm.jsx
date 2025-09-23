import styles from "./CancelReservationForm.module.css";

function CancelReservationForm({onSubmit, onCancel}) {
  return (
    <div className={styles.popup}>
      <div className={styles.popup__wrapper}>
        <form onSubmit={onSubmit}>
          <h1>Are you sure you want to cancel that reservation?</h1>
          <button className={styles.cancel__res__btn__first} type="submit">
            Yes, Cancel
          </button>
          <button
            className={styles.cancel__res__btn}
            type="button"
            onClick={onCancel}
          >
            No, Go Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default CancelReservationForm;
