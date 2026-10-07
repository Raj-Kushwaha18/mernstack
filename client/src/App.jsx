import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const emptyForm = { name: "", email: "", course: "", age: "" };

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      setStudents(response.data);
    } catch {
      setMessage("Could not connect to the backend.");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingId) {
        await axios.put(`${API_URL}/students/${editingId}`, form);
        setMessage("Student updated successfully.");
      } else {
        await axios.post(`${API_URL}/students`, form);
        setMessage("Student added successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const editStudent = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      course: student.course,
      age: student.age
    });
    setEditingId(student._id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`${API_URL}/students/${id}`);
      setMessage("Student deleted successfully.");
      await loadStudents();
    } catch {
      setMessage("Could not delete the student.");
    }
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">MERN STACK • VERCEL EXPERIMENT</p>
          <h1>Student Management System</h1>
          <p className="subtitle">
            React frontend + Express API + MongoDB database
          </p>
        </div>
        <div className="status">● MERN</div>
      </header>

      <main className="container">
        <section className="card">
          <h2>{editingId ? "Update Student" : "Add Student"}</h2>

          <form onSubmit={handleSubmit} className="form">
            <input
              name="name"
              placeholder="Student Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="course"
              placeholder="Course"
              value={form.course}
              onChange={handleChange}
              required
            />
            <input
              name="age"
              type="number"
              min="1"
              max="100"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
            />

            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingId ? "Update Student" : "Add Student"}
              </button>

              {editingId && (
                <button type="button" className="secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {message && <p className="message">{message}</p>}
        </section>

        <section className="card">
          <div className="section-title">
            <div>
              <h2>Students</h2>
              <p>{students.length} student(s) in the database</p>
            </div>
            <button className="secondary" onClick={loadStudents}>Refresh</button>
          </div>

          {students.length === 0 ? (
            <div className="empty">No students found. Add the first student above.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.course}</td>
                      <td>{student.age}</td>
                      <td className="row-actions">
                        <button onClick={() => editStudent(student)}>Edit</button>
                        <button className="danger" onClick={() => deleteStudent(student._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer>Student Management System • MERN Stack Hosting Experiment</footer>
    </div>
  );
}

export default App;