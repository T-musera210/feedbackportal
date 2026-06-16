import { useState } from "react";
import type { FC, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
  email: string;
  merchant: string;
  region: string[];
  product: string;
  feedbackType: string;
  description: string;
  impact: string;
  urgency: number;
  affectedCustomers: string;
  suggestion: string;
  benefit: string;
  additional: string;
}

const SubmitFeedback: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    merchant: "",
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        region: checked
          ? [...prev.region, value]
          : prev.region.filter((r) => r !== value)
      }));
    } else if (type === "range") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/feedback",
        formData
      );

      console.log("Saved:", res.data);
      alert("Feedback submitted ");

      // reset form
      setFormData({
        email: "",
        merchant: "",
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
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong ");
    }
  };

  return (
    <div style={styles.container}>
     <div style={styles.hero}>
  <img
    src="/pesapal-logo.png"
    alt="Pesapal"
    style={styles.logo}
  />

  <h1 style={styles.heroTitle}>
    Help us improve the Customers' Experience
  </h1>

  <p style={styles.heroText}>
    We value your opinion and want to ensure that Pesapal products meet
    customers' needs. Please take a moment to share feedback.
  </p>
</div>

{/* <h2 style={styles.title}>Submit Feedback</h2> */}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          placeholder="Your email address"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
   <input
          name="merchant"
          placeholder="Merchant Name"
          value={formData.merchant}
          onChange={handleChange}
          required
          style={styles.input}
        />
        {/* <input
          name="customer"
          placeholder="Your Name"
          value={formData.customer}
          onChange={handleChange}
          required
          style={styles.input}
        /> */}

     

        <div>
          <p>Region:</p>
          {["Kenya", "Uganda", "Tanzania", "Rwanda", "Zambia"].map((r) => (
            <label key={r} style={styles.checkbox}>
              <input
                type="checkbox"
                value={r}
                checked={formData.region.includes(r)}
                onChange={handleChange}
              />
              {r}
            </label>
          ))}
        </div>

        <select
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Product</option>
          <option>Pesapal Mobile</option>
          <option>Sabi POS</option>
          <option>Ecommerce</option>
          <option>Merchant Dashboard</option>
          <option>Ticketsasa</option>
          <option>Openfloat</option>
          <option>Reserveport</option>
          <option>PFMS Forecourt Management</option>
          <option>Oracle</option>
          <option>Merchant Credit</option>
          <option>Other</option>
        </select>

        <select
          name="feedbackType"
          value={formData.feedbackType}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Feedback Type</option>
          <option>Bug</option>
          <option>Feature Request</option>
          <option>Recommendation</option>
          <option>Other</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe the feedback/issue."
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        <select
          name="impact"
          value={formData.impact}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Impact</option>
          <option>Minor inconvenience</option>
          <option>Significant disruption</option>
          <option>Complete loss</option>
        </select>

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

        <input
          name="affectedCustomers"
          placeholder="Other affected customers"
          value={formData.affectedCustomers}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="suggestion"
          placeholder="Suggestions..."
          value={formData.suggestion}
          onChange={handleChange}
          style={styles.textarea}
        />

        <textarea
          name="benefit"
          placeholder="Business benefit..."
          value={formData.benefit}
          onChange={handleChange}
          style={styles.textarea}
        />

        <textarea
          name="additional"
          placeholder="Additional info..."
          value={formData.additional}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default SubmitFeedback;

const styles: { [key: string]: React.CSSProperties } = {
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