import { useEffect, useState } from "react";
import axios from "axios";

type Feedback = {
  _id: string; // 🔥 MongoDB uses _id
  email: string;
  customer: string;
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
  status: string;
  assignedTo?: string;
};

export default function Dashboard() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Feedback | null>(null);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:5000/feedback");
      setFeedbackList(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // ✅ UPDATE STATUS (API)
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/feedback/${id}`, {
        status: newStatus
      });

      fetchFeedback(); // refresh list

      if (selectedTicket?._id === id) {
        setSelectedTicket({ ...selectedTicket, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Feedback Dashboard</h2>

      <div style={styles.card}>
        <div style={styles.layout}>
          
          {/* TABLE */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Urgency</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {feedbackList.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => setSelectedTicket(item)}
                  style={styles.row}
                >
                  <td style={styles.td}>{item.customer}</td>
                  <td style={styles.td}>{item.product}</td>
                  <td style={styles.td}>{item.feedbackType}</td>
                  <td style={styles.td}>{item.urgency}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* SIDE PANEL */}
          {selectedTicket && (
            <div style={styles.panel}>
              <h3 style={{ color: "#064dae" }}>Feedback Details</h3>

              <p><strong>Customer:</strong> {selectedTicket.customer}</p>
              <p><strong>Email:</strong> {selectedTicket.email}</p>
              <p><strong>Product:</strong> {selectedTicket.product}</p>
              <p><strong>Type:</strong> {selectedTicket.feedbackType}</p>
              <p><strong>Region:</strong> {selectedTicket.region.join(", ")}</p>
              <p><strong>Impact:</strong> {selectedTicket.impact}</p>
              <p><strong>Urgency:</strong> {selectedTicket.urgency}</p>

              <p><strong>Description:</strong></p>
              <p>{selectedTicket.description}</p>

              <p><strong>Suggestion:</strong></p>
              <p>{selectedTicket.suggestion}</p>

              <p><strong>Business Benefit:</strong></p>
              <p>{selectedTicket.benefit}</p>

              <p><strong>Additional Info:</strong></p>
              <p>{selectedTicket.additional}</p>

              {/* ACTIONS */}
              <div style={styles.actions}>
                <button
                  style={styles.button}
                  onClick={() => updateStatus(selectedTicket._id, "Open")}
                >
                  Open
                </button>

                <button
                  style={styles.button}
                  onClick={() =>
                    updateStatus(selectedTicket._id, "In Progress")
                  }
                >
                  In Progress
                </button>

                <button
                  style={styles.button}
                  onClick={() => updateStatus(selectedTicket._id, "Done")}
                >
                  Done
                </button>
              </div>

              <button
                style={styles.close}
                onClick={() => setSelectedTicket(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: "30px",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh"
  },
  title: {
    color: "#064dae",
    marginBottom: "20px"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  layout: {
    display: "flex",
    gap: "20px"
  },
  table: {
    width: "60%",
    borderCollapse: "collapse" as const
  },
  th: {
    textAlign: "left",
    padding: "12px",
    background: "#064dae",
    color: "#fff"
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee"
  },
  row: {
    cursor: "pointer"
  },
  panel: {
    width: "40%",
    padding: "20px",
    borderRadius: "10px",
    background: "#fafafa",
    border: "1px solid #eee"
  },
  badge: {
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    background: "#e6efff",
    color: "#064dae"
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px"
  },
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#064dae",
    color: "#fff"
  },
  close: {
    marginTop: "20px",
    background: "#ddd",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  }
};