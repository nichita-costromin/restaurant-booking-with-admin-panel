import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialError = location.state?.initialError || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        // Store JWT and user info as needed
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userName", data.name);
        navigate("/staff");
      }
    } catch (err) {
      setError("Server error.");
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.login__background}>
      <div className={styles.login__inner}>
        <h1>Staff Login</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
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
          <div className={styles.inner__form__div}>
            <label>
              Password:<span className={styles.required}>*</span>
              <br />
            </label>
            <input
              className={styles.input__text}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {error && (
            <div style={{ color: "#a02222", marginTop: "20px" }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={styles.submit__btn}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
