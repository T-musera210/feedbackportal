import { useState } from "react";

export default function Submit() {
  const [formData, setFormData] = useState({
    email: "",
    customer: "",
    region: [],
    product: "",
    feedbackType: "",
    description: "",
    impact: "",
    urgency: 3,
    affectedCustomers: "",
    suggestion: "",
    benefit: "",
    additional: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        region: checked
          ? [...prev.region, value]
          : prev.region.filter((r) => r !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Feedback submitted!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Submit Feedback</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        
        <input name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
        <input name="customer" placeholder="Customer Name" onChange={handleChange} required style={styles.input} />

        {/* REGION */}
        <div>
          <p>Region:</p>
          {["Kenya", "Uganda", "Tanzania", "Rwanda", "Zambia"].map((r) => (
            <label key={r} style={styles.checkbox}>
              <input type="checkbox" value={r} onChange={handleChange} />
              {r}
            </label>
          ))}
        </div>

        {/* PRODUCT */}
        <select name="product" onChange={handleChange} required style={styles.input}>
          <option value="">Select Product</option>
          <option>Checkout</option>
          <option>API</option>
          <option>Dashboard</option>
        </select>

        {/* FEEDBACK TYPE */}
        <select name="feedbackType" onChange={handleChange} required style={styles.input}>
          <option value="">Feedback Type</option>
          <option>Bug</option>
          <option>Feature Request</option>
          <option>Recommendation</option>
          <option>Other</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe the issue..."
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        {/* IMPACT */}
        <select name="impact" onChange={handleChange} required style={styles.input}>
          <option value="">Impact</option>
          <option>Minor inconvenience</option>
          <option>Significant disruption</option>
          <option>Complete loss</option>
        </select>

        {/* URGENCY */}
        <label>
          Urgency: {formData.urgency}
          <input
            type="range"
            min="1"
            max="5"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          />
        </label>

        <input name="affectedCustomers" placeholder="Other affected customers" onChange={handleChange} style={styles.input} />
        <textarea name="suggestion" placeholder="Suggestions..." onChange={handleChange} style={styles.textarea} />
        <textarea name="benefit" placeholder="Business benefit..." onChange={handleChange} style={styles.textarea} />
        <textarea name="additional" placeholder="Additional info..." onChange={handleChange} style={styles.textarea} />

        <button type="submit" style={styles.button}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "700px",
    margin: "auto"
  },
  title: {
    color: "#064dae",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  textarea: {
    padding: "10px",
    height: "80px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  button: {
    backgroundColor: "#064dae",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  checkbox: {
    marginRight: "10px"
  }
};