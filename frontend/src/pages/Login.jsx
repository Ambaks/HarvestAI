import { FaLock, FaUser } from "react-icons/fa";
import React, { useContext,useState, useEffect } from "react";
import styles from "../LoginRegister.module.css"; // Import the CSS module
import HeaderBlank from "../components/HeaderBlank";

import { useNavigate } from "react-router-dom";
import { login, register } from "../api/authService";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");    //setting first and last names here, use them below and run. 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate();
  const [action, setAction] = useState("");
  const { setUser } = useContext(UserContext); // Access setUser from context

  useEffect(() => {
      const validateSession = async () => {
        try {
          const response = await axios.get("/auth/validate", { withCredentials: true });
          setUser(response.data);
        } catch (error) {
          console.error("Session validation failed:", error.response?.data);
          setUser(null);
        }
      };
  
      validateSession();
    }, []);
  

  const registerLink = () => {
    setAction("active");
  };

  const loginLink = () => {
    setAction("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call login API and get full user info.
      const { user_info } = await login(email, password);
      setUser(user_info); // Save full user info to context.
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      await register(first_name, last_name, email, password); // Call the register function
    } catch (error) {
      setError(error.response?.data?.detail || "Registration failed"); // Display a meaningful error message
    }
  };

  return (
    <div className={styles.container}>
      <HeaderBlank />
      <div
        className={`${styles.wrapper} ${action === "active" ? styles.active : ""}`}
      >
        <div className={`${styles["form-box"]} ${styles.login}`}>
          <form onSubmit={handleLoginSubmit}>
            <h1 className={styles.h1}>Login</h1>
            <div className={styles["input-box"]}>
              <input
                type="text"
                value={email}
                placeholder="Enter e-mail:"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input
                type="password"
                value={password}
                placeholder="Enter password:"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className={styles.icon} />
            </div>
            <div className={styles["remember-forgot"]}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Login</button>
            <div className={styles["register-link"]}>
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className={`${styles["form-box"]} ${styles.register}`}>
          <form onSubmit={handleRegisterSubmit}>
            <h1 className={styles.h1}>Registration</h1>
            <div className={styles["input-box"]}>
              <input type="text" placeholder="First name:" onChange={(e) => setFirstName(e.target.value)} required />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input type="text" placeholder="Last name:" onChange={(e) => setLastName(e.target.value)} required />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input type="text" placeholder="E-mail:" onChange={(e) => setEmail(e.target.value)} required />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input type="password" placeholder="Password:" onChange={(e) => setPassword(e.target.value)} required />
              <FaLock className={styles.icon} />
            </div>
            <div className={styles["remember-forgot"]}>
              <label>
                <input type="checkbox" required/> I agree to the terms & conditions.
              </label>
            </div>
            <button type="submit" onClick={loginLink}>Register</button>
            <div className={styles["register-link"]}>
              <p>
                Already have an account?{" "}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
