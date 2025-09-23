import { useNavigate } from "react-router-dom";

export function useSecureFetch() {
  const navigate = useNavigate();

  return async function secureFetch(url, options = {}) {
    const token = localStorage.getItem("token");
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");

      // Redirect to login with error message
      navigate("/login", {
        state: { initialError: "Session expired. Please login again." },
      });

      return null;
    }

    return response;
  };
}
