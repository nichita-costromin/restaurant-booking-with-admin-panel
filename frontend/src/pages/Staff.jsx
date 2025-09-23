import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleCancelReservation,
  handleUpdateReservation,
} from "../utils/reservationHandlers";
import CancelReservationForm from "../components/CancelReservationForm";
import { useSecureFetch } from "../hooks/useSecureFetch";
import Navbar from "../components/Navbar";
import styles from "./Staff.module.css";

function Staff() {
  const [cancelPopupStatus, setCancelPopupStatus] = useState(false);
  const [updatePopupStatus, setUpdatePopupStatus] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [reservationToUpdate, setReservationToUpdate] = useState(null);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const secureFetch = useSecureFetch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await secureFetch("http://localhost:8000", { method: "GET" });
      if (!res) return; // Redirect happened

      const data = await res.json();
      setData(data);
    };

    fetchData();
  }, [secureFetch]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    alert("You've been logged out successfully.");
    navigate("/login");
  };

  return (
    <>
      <Navbar handleLogout={handleLogout}/>
      <div className={styles.management__background}>
        <div className={styles.management__inner}>
          {data && Array.isArray(data) ? (
            data.map((reservation) => (
              <div key={reservation._id} className={styles.reservation}>
                <p className={styles.reservation__text}>
                  <strong>Name:</strong> {reservation.name}
                </p>
                <p className={styles.reservation__text}>
                  <strong>Phone:</strong> {reservation.phone}
                </p>
                <p className={styles.reservation__text}>
                  <strong>Email:</strong> {reservation.email}
                </p>
                <p className={styles.reservation__text}>
                  <strong>Date:</strong>{" "}
                  {new Date(reservation.date).toLocaleString()}
                </p>
                <p className={styles.reservation__text}>
                  <strong>People:</strong> {reservation.numberOfPeople}
                </p>
                <p className={styles.reservation__text}>
                  <strong>Details:</strong> {reservation.details}
                </p>
                <p className={styles.reservation__text}>
                  <strong>Status:</strong> {reservation.status || "N/A"}
                </p>
                <div className={styles.management__buttons}>
                  <a
                    href={`/staff/update-reservation/${reservation._id}`}
                    style={{ cursor: "pointer", textAlign: "left" }}
                  >
                    <strong>Update</strong>
                  </a>
                  <button
                    style={{ color: "#a02222" }}
                    onClick={() => {
                      setCancelPopupStatus(!cancelPopupStatus);
                      setReservationToCancel(reservation._id);
                    }}
                  >
                    Cancel Reservation
                  </button>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p>Loading reservations...</p>
          )}
        </div>
      </div>
      {/* Cancel Popup Status */}
      {cancelPopupStatus && (
        <CancelReservationForm
          onSubmit={(e) =>
            handleCancelReservation(
              e,
              reservationToCancel,
              data,
              setData,
              setCancelPopupStatus,
              setReservationToCancel,
            )
          }
          onCancel={() => setCancelPopupStatus(false)}
        />
      )}
      {/* Update Popup Status */}
      {updatePopupStatus && (
        <UpdateReservationForm
          onSubmit={(e) =>
            handleUpdateReservation(
              e,
              reservationToUpdate,
              setUpdatePopupStatus,
              setReservationToUpdate,
            )
          }
          onCancel={() => setUpdatePopupStatus(false)}
        />
      )}
      <p>
        Current user: {userName}. Role: {role}
      </p>
    </>
  );
}

export default Staff;
