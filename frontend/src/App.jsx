import { useState } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      setMessage("Account created successfully.");
      return;
    }

    setMessage("Login submitted successfully.");
  }

  function switchMode() {
    setMode(mode === "login" ? "signup" : "login");
    setMessage("");

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <main className="auth-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="brand">
          STUDENT<span>DB</span>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          MongoDB Connected
        </div>
      </nav>

      {/* AUTH SECTION */}
      <section className="auth-section">

        {/* LEFT SIDE */}
        <div className="auth-content">

          <p className="kicker">STUDENT MANAGEMENT</p>

          {mode === "login" ? (
            <>
              <h1>
                Welcome<br />
                <span>back.</span>
              </h1>

              <p className="hero-text">
                Sign in to access your student management dashboard.
              </p>
            </>
          ) : (
            <>
              <h1>
                Create your<br />
                <span>account.</span>
              </h1>

              <p className="hero-text">
                Create an account and start managing your student records.
              </p>
            </>
          )}

          <div className="feature-row">
            <div>
              <strong>01</strong>
              <span>Secure login</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Manage students</span>
            </div>

            <div>
              <strong>03</strong>
              <span>MongoDB storage</span>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="auth-panel">

          <div className="panel-heading">
            <div>
              <p className="panel-kicker">
                {mode === "login" ? "WELCOME BACK" : "NEW ACCOUNT"}
              </p>

              <h2>
                {mode === "login" ? "Login" : "Sign Up"}
              </h2>
            </div>

            <div className="record-icon">
              {mode === "login" ? "→" : "+"}
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* FULL NAME ONLY FOR SIGNUP */}
            {mode === "signup" && (
              <div className="field full">
                <label htmlFor="fullName">FULL NAME</label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Iqra Mahjabeen"
                  required
                />
              </div>
            )}

            {/* EMAIL */}
            <div className="field full">
              <label htmlFor="email">EMAIL</label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="field full">
              <label htmlFor="password">PASSWORD</label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            {mode === "signup" && (
              <div className="field full">
                <label htmlFor="confirmPassword">
                  CONFIRM PASSWORD
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <button type="submit">
              {mode === "login" ? "LOGIN" : "CREATE ACCOUNT"}
              <span>→</span>
            </button>

          </form>

          {message && (
            <div
              className={`notice ${
                message.includes("successfully")
                  ? "success"
                  : "error"
              }`}
            >
              {message}
            </div>
          )}

          {/* SWITCH LOGIN / SIGNUP */}
          <div className="switch-auth">
            <span>
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              className="switch-button"
              onClick={switchMode}
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer>
        <span>FASTAPI</span>
        <span className="line"></span>
        <span>MONGODB ATLAS</span>
        <span className="line"></span>
        <span>STUDENT PORTAL</span>
      </footer>

    </main>
  );
}

export default App;