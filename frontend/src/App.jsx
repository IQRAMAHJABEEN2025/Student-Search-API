import { useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    age: "",
    favColors: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
    setError("");
    setSaving(true);

    const student = {
      "full name": formData.fullName,
      address: {
        street: formData.street,
        city: formData.city,
        age: formData.age,
        "fav colors": formData.favColors
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean),
      },
    };

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Failed to save student");
      }

      setMessage(`Student saved successfully • ID: ${result.id}`);

      setFormData({
        fullName: "",
        street: "",
        city: "",
        age: "",
        favColors: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="app">
      <nav className="navbar">
        <div className="brand">STUDENT<span>DB</span></div>
        <div className="nav-status">
          <span className="status-dot" />
          MongoDB Connected
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="kicker">STUDENT MANAGEMENT</p>
          <h1>Build your<br /><span>student list.</span></h1>
          <p className="hero-text">
            Add a student and send their data directly to your FastAPI backend.
          </p>

          <div className="feature-row">
            <div><strong>01</strong><span>Enter data</span></div>
            <div><strong>02</strong><span>Send API request</span></div>
            <div><strong>03</strong><span>Save to MongoDB</span></div>
          </div>
        </div>

        <div className="form-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">NEW RECORD</p>
              <h2>Add Student</h2>
            </div>
            <div className="record-icon">+</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field full">
              <label htmlFor="fullName">FULL NAME</label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ali Khan"
                required
              />
            </div>

            <div className="field-grid">
              <div className="field">
                <label htmlFor="street">STREET</label>
                <input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="ABC Road"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="city">CITY</label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Karachi"
                  required
                />
              </div>
            </div>

            <div className="field-grid">
              <div className="field">
                <label htmlFor="age">AGE</label>
                <input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="16"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="favColors">FAVOURITE COLORS</label>
                <input
                  id="favColors"
                  name="favColors"
                  value={formData.favColors}
                  onChange={handleChange}
                  placeholder="red, blue, green"
                />
              </div>
            </div>

            <button type="submit" disabled={saving}>
              {saving ? "SAVING..." : "SAVE STUDENT"}
              {!saving && <span>→</span>}
            </button>
          </form>

          {message && <div className="notice success">{message}</div>}
          {error && <div className="notice error">{error}</div>}
        </div>
      </section>

      <footer>
        <span>FASTAPI</span>
        <span className="line" />
        <span>MONGODB ATLAS</span>
        <span className="line" />
        <span>STUDENT PORTAL</span>
      </footer>
    </main>
  );
}

export default App;
