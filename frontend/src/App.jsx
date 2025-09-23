import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import Staff from "./pages/Staff";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import CreateStaff from "./pages/CreateStaff";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateReservationForm from "./components/UpdateReservationForm";
import { BookingProvider } from "./contexts/BookingContext";

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/staff" element={<Staff />} />
            <Route path="/staff/create-staff" element={<CreateStaff />} />
            <Route path="/staff/update-reservation/:reservation_id" element={<UpdateReservationForm />}/>
          </Route>
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
