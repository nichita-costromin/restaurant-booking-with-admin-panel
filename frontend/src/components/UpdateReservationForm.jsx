import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./UpdateReservationForm.module.css";

function UpdateReservationForm({ onSubmit, onCancel }) {
  const { reservation_id } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [nrOfPeople, setNrOfPeople] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // On Load

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8000/api/reservations/${reservation_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!res.ok) throw new Error("Failed to fetch reservation data");

        const data = await res.json();
        setReservation(data);

        setDate(data.date ? data.date.slice(0, 10) : ""); // Format ISO date for input type=date
        if (data.date) {
          const d = new Date(data.date);
          const hh = d.getHours().toString().padStart(2, "0");
          const mm = d.getMinutes().toString().padStart(2, "0");
          setTime(`${hh}:${mm}`);
        } else {
          setTime("");
        }
        setNrOfPeople(data.numberOfPeople?.toString() || "");
        setDetails(data.details || "");
      } catch (err) {
        setError(err.message || err.toString());
      }
    };
    fetchReservation();
  }, [reservation_id]);

  // Submit Handle

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      // Date and Time
      const fullDateTime = `${date}T${time}:00`;

      const res = await fetch(
        `http://localhost:8000/api/reservation/${reservation_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: fullDateTime, numberOfPeople:parseInt(nrOfPeople, 10), details }), // Replace with actual updatable fields
        },
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update reservation");
      }

      alert("Reservation updated successfully.");
      navigate("/staff");
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.update__form__background}>
      <div className={styles.update__form__inner}>
        <h1>Update Reservation</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className={styles.inner__form__div}>
            {/* Date */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>
                Date<span className={styles.required}>*</span>
                <br />
              </label>
              <input
                className={styles.input__text}
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                autoFocus
              />
            </div>
            {/* Time */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>
                Time<span className={styles.required}>*</span>
                <br />
              </label>
              <input
                className={styles.input__text}
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            {/* Number of People */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>
                People<span className={styles.required}>*</span>
                <br />
              </label>
              <input
                className={styles.input__text}
                type="number"
                required
                value={nrOfPeople}
                onChange={(e) => setNrOfPeople(e.target.value)}
                autoFocus
              />
            </div>
            {/* Details */}
            <div className={styles.form__item}>
              <label className={styles.form__label}>
                Details<span className={styles.required}>*</span>
                <br />
              </label>
              <input
                className={styles.input__text}
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          {error && (
            <div style={{ color: "#a02222", marginTop: "20px" }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submit__btn}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button type="button" onClick={() => navigate("/staff")}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateReservationForm;
