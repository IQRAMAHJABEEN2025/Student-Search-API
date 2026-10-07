import { useState } from "react";

function NewStudent({ onStudentCreated }) {
  const [studentData, setStudentData] = useState({
    studentId: "",
    fullName: "",
    email: "",
    phone: "",
    className: "",
    age: "",
    gender: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setStudentData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    try {
      // API connection will be added in the next step
      console.log("Student data:", studentData);

      setMessage("Student form submitted successfully.");

      setStudentData({
        studentId: "",
        fullName: "",
        email: "",
        phone: "",
        className: "",
        age: "",
        gender: "",
        address: "",
      });

      if (onStudentCreated) {
        onStudentCreated();
      }
    } catch (error) {
      setMessage(
        error.message || "Something went wrong."
      );
    }
  }

  return (
    <section className="student-section">

      <div className="student-header">
        <p className="kicker">STUDENT MANAGEMENT</p>
        <h1>New <span>Student.</span></h1>
        <p> Add a new student record to the student database.</p>
      </div>

      <div className="student-panel">
        <div className="panel-heading">
          <div>
            <p className="panel-kicker">NEW RECORD</p>
            <h2>Create Student</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="student-grid">
            <div className="field">
              <label htmlFor="studentId">STUDENT ID</label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                value={studentData.studentId}
                onChange={handleChange}
                placeholder="e.g. STU001"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="fullName">FULL NAME</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={studentData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ali Ahmed"
                required
              />
            </div>

            <div className="field">
             <label htmlFor="email"> EMAIL</label>
              <input
                id="email"
                name="email"
                type="email"
                value={studentData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="phone">PHONE</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={studentData.phone}
                onChange={handleChange}
                placeholder="03001234567"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="className">CLASS</label>
              <input
                id="className"
                name="className"
                type="text"
                value={studentData.className}
                onChange={handleChange}
                placeholder="e.g. 11"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="age">AGE</label>
              <input
                id="age"
                name="age"
                type="number"
                value={studentData.age}
                onChange={handleChange}
                placeholder="e.g. 17"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="gender">GENDER</label>
              <select
                id="gender"
                name="gender"
                value={studentData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="address">ADDRESS</label>
              <input
                id="address"
                name="address"
                type="text"
                value={studentData.address}
                onChange={handleChange}
                placeholder="Student address"
                required
              />
            </div>
          </div>

          <button type="submit"> CREATE STUDENT<span>→</span></button>
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
      </div>
    </section>
  );
}

export default NewStudent;