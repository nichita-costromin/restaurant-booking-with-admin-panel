import { useState, createContext, useContext } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toggleBooking = () => setIsFormOpen((prev) => !prev);
  const openBooking = () => setIsFormOpen(true);
  const closeBooking = () => setIsFormOpen(false);

  return (
    <BookingContext.Provider
      value={{ isFormOpen, toggleBooking, openBooking, closeBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
