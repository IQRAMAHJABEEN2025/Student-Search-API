import { useState } from "react";

function Signup({ onSignupSuccess, onSwitchToLogin }) {
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

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to create account"
        );
      }

      setMessage("Account created successfully.");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Tell App.jsx that signup was successful
      if (onSignupSuccess) {
        onSignupSuccess(result);
      }

    } catch (error) {
      setMessage(
        error.message || "Something went wrong."
      );
    }
  }

  return (
    <section className="auth-section">

      {/* LEFT SIDE */}
      <div className="auth-content">
        <p className="kicker">STUDENT MANAGEMENT</p>
        <h1>Create your<br /><span>account.</span></h1>
        <p className="hero-text">
          Create an account and start managing your student records.</p>
        <div className="feature-row">
          <div><strong>01</strong><span>Secure login</span></div>
          <div><strong>02</strong><span>Manage students</span></div>
          <div><strong>03</strong><span>MongoDB storage</span></div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="auth-panel">
        <div className="panel-heading">
          <div><p className="panel-kicker">NEW ACCOUNT</p>
            <h2> Sign Up</h2></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
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

          <div className="field">
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
          <div className="field">
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
          <div className="field">
            <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
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
          <button type="submit">CREATE ACCOUNT<span>→</span></button>
        </form>
        {/* MESSAGE */}
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

        {/* SWITCH TO LOGIN */}
        <div className="switch-auth">
          <span>Already have an account?</span>
          <button
            type="button"
            className="switch-button"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

export default Signup;