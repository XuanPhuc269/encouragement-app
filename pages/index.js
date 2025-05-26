import { use, useState } from "react"; 

export default function Home() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // NEW

  const handleSubmit = async () => {
    setLoading(true); // NEW
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score }),
      });
      const data = await response.json();
      setMessage(data.message || "Something went wrong, please try again.");
      setStep(2);
    } catch (error) {
      setMessage("Failed to generate message. Please try again later.");
      setStep(2);
    }
    setLoading(false); // NEW
  };

  return (
    <main style={styles.container}>
      {step === 1 && (
        <>
          <h1 style={styles.heading}>💁🏻‍♂️ Your Info</h1>
          <input 
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Desired English mark"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            style={styles.input}
          />
          <button 
            onClick={handleSubmit} 
            style={styles.button}
            disabled={loading} // NEW
          >
            {loading ? "Generating..." : "My message for you 🎁"} {/* NEW */}
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <h1 style={styles.heading}>🎉 Your Message</h1>
          <p style={styles.message}>{message}</p>
          <p style={styles.from}>From: Your Teacher ❤️</p>
          <button 
            style={styles.button}
            onClick={() => {
              setStep(1);
              setName("");
              setScore("");
              setMessage("");
            }}
          >
            Back to Info
          </button>
        </>
      )}
    </main>
  );
}

const styles = {
  container: {
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#fff3cd",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    textAlign: "center",
  },
  heading: {
    color: "#d63384",
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  input: {
    fontSize: "1rem",
    padding: "0.5rem",
    margin: "0.5rem",
    width: "250px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    marginTop: "1rem",
    borderRadius: "8px",
    backgroundColor: "#d63384",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  message: {
    fontSize: "1.2rem",
    color: "#333",
    maxWidth: "600px",
    marginBottom: "1rem",
  },
  from: {
    color: "#888",
    fontStyle: "italic",
  },
};