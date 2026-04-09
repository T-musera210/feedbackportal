import { useEffect, useState, } from "react";

import type { FC} from "react";


// Define a type for the feedback items
interface Feedback {
  id: string;
  customer: string;
  product: string;
  feedbackType: string;
  urgency: number;
  status: "Open" | "In Progress" | "Done" | string;
}

const Dashboard: FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    const data: Feedback[] =
      JSON.parse(localStorage.getItem("feedback") || "[]");
    setFeedbackList(data);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Feedback Dashboard</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Type</th>
            <th>Urgency</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {feedbackList.map((item) => (
            <tr key={item.id}>
              <td>{item.customer}</td>
              <td>{item.product}</td>
              <td>{item.feedbackType}</td>
              <td>{item.urgency}</td>
              <td>
                <span style={getStatusStyle(item.status)}>{item.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

// Styles object
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "30px" },
  title: { color: "#064dae", marginBottom: "20px" },
  table: { width: "100%", borderCollapse: "collapse" },
};

// Status color helper
const getStatusStyle = (status: string): React.CSSProperties => {
  let color = "gray";
  if (status === "Open") color = "red";
  else if (status === "In Progress") color = "orange";
  else if (status === "Done") color = "green";

  return { color, fontWeight: "bold" };
};




// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [feedbackList, setFeedbackList] = useState([]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("feedback")) || [];
//     setFeedbackList(data);
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Feedback Dashboard</h2>

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th>Customer</th>
//             <th>Product</th>
//             <th>Type</th>
//             <th>Urgency</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {feedbackList.map((item) => (
//             <tr key={item.id}>
//               <td>{item.customer}</td>
//               <td>{item.product}</td>
//               <td>{item.feedbackType}</td>
//               <td>{item.urgency}</td>
//               <td>
//                 <span style={getStatusStyle(item.status)}>
//                   {item.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "30px" },
//   title: { color: "#064dae", marginBottom: "20px" },
//   table: { width: "100%", borderCollapse: "collapse" }
// };

// const getStatusStyle = (status) => {
//   let color = "gray";
//   if (status === "Open") color = "red";
//   if (status === "In Progress") color = "orange";
//   if (status === "Done") color = "green";

//   return { color, fontWeight: "bold" };
// };


