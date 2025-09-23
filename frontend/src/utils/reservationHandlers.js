// CANCEL RESERVATION HANDLER

export const handleCancelReservation = async (
  e,
  reservationToCancel,
  data,
  setData,
  setPopupStatus,
  setReservationToCancel,
) => {
  e.preventDefault();
  if (!reservationToCancel) return;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:8000/api/reservations/${reservationToCancel}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (res.ok) {
      alert("Reservation canceled successfully.");
      // Optionally refetch reservations list here or remove locally
      setData(data.filter((r) => r._id !== reservationToCancel));
    } else {
      alert("Failed to cancel reservation.");
    }
  } catch (err) {
    alert("Server error, please try again.");
    console.log(err);
  } finally {
    setPopupStatus(false);
    setReservationToCancel(null);
  }
};

// UPDATE RESERVATION HANDLER

export const handleUpdateReservation = async (
  e,
  reservationToUpdate,
  setData,
  setReservationToUpdate,
) => {
  e.preventDefault();
  if (!reservationToUpdate) return;
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:8000/api/reservations/${reservationToUpdate}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          /* your data here */
        }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to update reservation");
    }

    const updatedReservation = await res.json();
    setData((prevData) =>
      prevData.map((r) =>
        r._id === reservationToUpdate ? updatedReservation : r,
      ),
    );

    alert("Reservation updated successfully.");
  } catch (err) {
    alert("Error updating the reservation");
    console.log("There was an error updating the reservation: ", err);
  } finally {
    setReservationToUpdate(null);
  }
};
