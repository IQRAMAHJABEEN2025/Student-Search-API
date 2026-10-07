import { useState } from "react";
function Login ({onLoginSuccess , onSwitchToSignup }) {
const [formData, setFormData] = useState({
            email:"",
            password:""
        });
const [message, setMessage] = useState("");
function handleChange(event){
    const{ name, value } = event.target;
    setFormData((previous)=>({
        ...previous,
        [name]: value
    }))
}
async function handleSubmit(event){
    event.previousDefault();
    try{
        const response = await fetch("https://127.0.0.1:8000/auth/login",{
            method:"POST",
            header:{
                "Content-Type":"application/json"
            },body:JSON.stringify({
                email:formData.email,
                password:formData.password,
            }),
            }
);

const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Invalid email or password"
        );
      }
      setMessage("Login successful.");
      onLoginSuccess(result);

    } catch (error) {
      setMessage(
        error.message || "Something went wrong."
      );
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-content">
         <p className="kicker">STUDENT MANAGEMENT</p>
         <h1>Welcome<br /><span>back.</span></h1>
         <p className="hero-text">Sign in to access your student management dashboard.</p>
        <div className="feature-row">
          <div><strong>01</strong><span>Secure login</span></div>
          <div><strong>02</strong><span>Manage students</span></div>
          <div><strong>03</strong><span>MongoDB storage</span></div>
        </div>
      </div>

     
      <div className="auth-panel">
        <div className="panel-heading">
          <div><p className="panel-kicker">WELCOME BACK</p>
            <h2>Login</h2>
          </div>
          <div className="record-icon">→</div>
        </div>

        <form onSubmit={handleSubmit}>
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
          <button type="submit">LOGIN<span>→</span></button>
        </form>

        {message && (
          <div
            className={`notice ${
              message.includes("successful")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="switch-auth"><span>Don't have an account?</span>
          <button
            type="button"
            className="switch-button"
            onClick={onSwitchToSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
}
export default Login;