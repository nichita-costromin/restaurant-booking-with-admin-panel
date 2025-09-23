import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./CreateStaff.module.css";

function CreateStaff() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/admin/create-staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, role }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Staff Creation failed.");
      } else {
        navigate("/staff/members");
      }
    } catch (err) {
      alert("Error caught: " + err);
      console.log(err)
    }
    setIsLoading(false);
  };
  return (
    <>
    <Navbar />
      <div className={styles.staff__reg__background}>
        <div className={styles.staff__reg__inner}>
          <h1>Register Staff</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Email */}
            <div className={styles.inner__form__div}>
              <label>
                Email:<span className={styles.required}>*</span>
                <br />
              </label>
              <input
                className={styles.input__text}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              ></input>
            </div>
            {/* Name */}
            <div className={styles.inner__form__div}>
              <label>
                Name:<span className={styles.required}>*</span>
                <br />
              </label>
              <input
                className={styles.input__text}
                type="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            {/* Role */}
            <div className={styles.inner__form__div}>
              <label>
                Role:<span className={styles.required}>*</span>
                <br />
              </label>
              <input
                className={styles.input__text}
                type="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              ></input>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={styles.submit__btn}
            >
              {loading ? "Creating the user..." : "Submit"}
            </button>
            {error && (
              <div style={{ color: "#a02222", marginTop: "20px" }}>{error}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateStaff;
