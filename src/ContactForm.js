// import React, { useState } from "react";
// import { useRef } from "react";
// import emailjs from "@emailjs/browser";

// const ContactForm = ({ theme }) => {
//   // Log the value of the theme prop
//   console.log("Received theme:", theme);

//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
//         publicKey: "YOUR_PUBLIC_KEY",
//       })
//       .then(
//         () => {
//           console.log("SUCCESS!");
//         },
//         (error) => {
//           console.log("FAILED...", error.text);
//         }
//       );
//   };

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Collect form data
//     const data = { name, email, message };
//     console.log("Form data:", data);

//     // Submit form data to the server
//     fetch("http://localhost:5000/api/contact", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     })
//       .then((res) => {
//         console.log("Response received:", res);
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Success:", data);
//         setSuccess("Message sent successfully!");
//         setError(null);

//         // Send email using EmailJS
//         emailjs
//           .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
//             publicKey: "YOUR_PUBLIC_KEY",
//           })
//           .then(
//             () => {
//               console.log("Email sent successfully!");
//             },
//             (error) => {
//               console.log("Failed to send email...", error.text);
//               setError("Error sending email. Please try again.");
//             }
//           );
//       })
//       .catch((error) => {
//         console.log("Error sending form data:", error);
//         setError("Error sending message. Please try again.");
//         setSuccess(null);
//       });
//   };

//   // Determine styles based on theme
//   const isDarkTheme = theme === "Dark Theme";

//   return (
//     <>
//       {/* Inline styles for responsiveness */}
//       <style>
//         {`
//           @media (max-width: 480px) {
//             .container {
//               width: 300px;
//             }
//           }
//           @media (min-width: 481px) and (max-width: 768px) {
//             .container {
//               width: 500px;
//             }
//           }
//           @media (min-width: 769px) {
//             .container {
//               width: 600px;
//               max-width: 1024px;
//             }
//           }

//           input, textarea {
//             transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transitions */
//           }

//           input:focus, textarea:focus {
//             border-color: #007bff; /* Blue border on focus for both themes */
//             box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Subtle shadow for focus indication */
//           }

//           input:hover, textarea:hover {
//             border-color: ${
//               isDarkTheme ? "#aaa" : "#666"
//             }; /* Different hover color for each theme */
//           }
//         `}
//       </style>

//       <div style={styles.container} className="container">
//         <h2 style={styles.heading}>Contact Form</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <label style={styles.label}>
//             Name:
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               style={{
//                 ...styles.input,
//                 backgroundColor: isDarkTheme ? "#333" : "#fff",
//                 color: isDarkTheme ? "#fff" : "#000",
//                 borderColor: isDarkTheme ? "#555" : "#ccc",
//                 outline: "none",
//                 cursor: "text", // Ensures the input has a text cursor
//               }}
//             />
//           </label>

//           <label style={styles.label}>
//             Email:
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={{
//                 ...styles.input,
//                 backgroundColor: isDarkTheme ? "#333" : "#fff",
//                 color: isDarkTheme ? "#fff" : "#000",
//                 borderColor: isDarkTheme ? "#555" : "#ccc",
//                 outline: "none", // Ensure there's no default browser outline
//               }}
//             />
//           </label>
//           <label style={styles.label}>
//             Message:
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               style={{
//                 ...styles.textarea,
//                 backgroundColor: isDarkTheme ? "#333" : "#fff",
//                 color: isDarkTheme ? "#fff" : "#000",
//                 borderColor: isDarkTheme ? "#555" : "#ccc",
//                 outline: "none", // Ensure there's no default browser outline
//               }}
//             />
//           </label>
//           <button type="submit" style={styles.button}>
//             Send Message
//           </button>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           {success && <p style={{ color: "green" }}>{success}</p>}
//         </form>
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//     backgroundColor: "transparent",
//     borderRadius: "10px",
//     boxSizing: "border-box",
//     margin: "0 auto",
//   },
//   heading: {
//     marginBottom: "20px",
//     fontSize: "1.5em",
//   },
//   form: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//   },
//   label: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "10px",
//     fontWeight: "bold",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     boxSizing: "border-box",
//   },
//   textarea: {
//     width: "100%",
//     padding: "10px",
//     height: "100px",
//     marginBottom: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     boxSizing: "border-box",
//     resize: "vertical",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#333",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default ContactForm;
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_mef82lx", "template_n6o06yu", form.current, {
        publicKey: "ecWP3lc5RDegTKkBG",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div>
      <style>
        {`
          form {
            background-color: transparent;
            padding: 20px;
            border: none;
            box-shadow: none;
          }

          label {
            display: block;
            margin-bottom: 10px;
          }

          input, textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          input[type="submit"] {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          input[type="submit"]:hover {
            background-color: #3e8e41;
          }
            button: {
     width: "100%",
  padding: "10px",
    backgroundColor: "#333",
     color: "white",
    border: "none",
     borderRadius: "5px",
    cursor: "pointer",
  },
        `}
      </style>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" required />

        <label>Email</label>
        <input type="email" name="user_email" required />

        <label>Message</label>
        <textarea name="message" required />

        <button type="submit" value="Send">
          Send Message
        </button>
      </form>
    </div>
  );
};
