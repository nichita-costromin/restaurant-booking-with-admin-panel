import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ResetPassword.module.css";
function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Get Search Params
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  // Other States
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token || !userId) {
      setError("Invalid or missing reset token.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, id: userId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password.");
      } else {
        setSuccess("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      setError("Server error: ", err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.reset__background}>
        <div className={styles.reset__inner}>
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.inner__form__div}>
              <label>
                Password:<span className={styles.required}>*</span>
                <br />
              </label>
              <input
                className={styles.input__text}
                type="password"
                minLength={6}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              ></input>
            </div>
            <div className={styles.inner__form__div}>
              <label>
                Confirm Password:<span className={styles.required}>*</span>
                <br />
              </label>
              <input
                className={styles.input__text}
                type="password"
                minLength={6}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {error && (
              <div style={{ color: "#a02222", marginTop: "20px" }}>{error}</div>
            )}
            {success && (
              <div style={{ color: "green", marginTop: "20px" }}>{success}</div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submit__btn}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
