import { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import NewStudent from "./components/NewStudent";

function App() {
  const [mode, setMode] = useState("login");
  const [page, setPage] = useState("auth");

  function handleLoginSuccess(result) {
    console.log("Logged in user:", result.user);
    setPage("student");
  }

  function handleSignupSuccess() {
    setMode("login");
  }

  return (
    <main className="auth-page">
      <nav className="navbar">
        <div className="brand">STUDENT<span>DB</span></div>

        <div className="nav-status">
          <span className="status-dot"></span>MongoDB Connected</div>
      </nav>


      {page === "auth" && mode === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setMode("signup")}
        />
      )}

      {page === "auth" && mode === "signup" && (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setMode("login")}
        />
      )}

      {page === "student" && (
        <section className="student-section">
          <div className="student-header">
            <p className="kicker">STUDENT MANAGEMENT</p>
            <h1>New <span>Student.</span></h1>
            <p>Add a new student record to the student database.</p>
          </div>
          <div className="student-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">NEW RECORD</p>
                <h2>Create Student</h2>
              </div>
            </div>
            <p>New Student component will be added here next.</p>
          </div>
        </section>
      )}

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