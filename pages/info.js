import { use, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import BackButton from "@/components/BackButton";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [feeling, setFeelings] = useState("");
  const [loading, setLoading] = useState(false); // NEW
  const [isHovered, setIsHovered] = useState(false);


  const handleSubmit = async () => {
    setLoading(true);
    router.push({
      pathname: "/message",
      query: { name, score, feeling },
    });
  };

  return (
    <Layout>
      <BackButton />
      <h1 style={styles.heading}>Thông tin của em</h1>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ flex: 2 }}>
          <label style={styles.label}>Em là:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chọn tên em"
            style={{
              ...styles.input,
              width: "250px"
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Điểm số em muốn: </label>
          <input
            type="text"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Điểm số mong muốn"
            style={{
              ...styles.input,
              width: "200px"
            }}
          />
        </div>
      </div>

      <label style={{
        ...styles.label,
        marginTop: "0",
        marginBottom: "0.5rem",
      }}>Cảm xúc của em: </label>
      <textarea
        value={feeling}
        onChange={(e) => setFeelings(e.target.value)}
        placeholder="Em đang cảm thấy như thế nào?"
        style={styles.textarea}
      />

      <button onClick={handleSubmit} style={{
        ...styles.button,
        backgroundColor: isHovered ? '#A98C7B' : '#8B6F61',
        scale: isHovered ? '1.05' : '1',
        transition: 'background-color 0.3s ease',
      }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        my message for you</button>
    </Layout>
  );
}

const styles = {
  textarea: {
    padding: "0.5rem",
    width: "480px",
    height: "120px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#fffaf0",
    borderColor: "#d8a7a7",
    borderWidth: "2px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "1rem",
    fontFamily: "Roboto, sans-serif",
    fontSize: "1rem",
    color: "#333",
  },
  heading: {
    fontFamily: "Montagu Slab, serif",
    color: "#DC143C",
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  input: {
    backgroundColor: "#fffaf0",
    fontSize: "1rem",
    padding: "0.5rem",
    margin: "0.5rem",
    width: "250px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    borderColor: "#d8a7a7",
    borderWidth: "2px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "Roboto, sans-serif",
    color: "#333",
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#8B6F61',
    color: 'white',
    border: 'none',
    borderRadius: '18px',
    cursor: 'pointer',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    height: '50px',
    marginTop: '1rem',
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
  label: {
    fontFamily: "Crimson Text, serif",
    color: "black",
    fontSize: "1.5rem",
    marginTop: "1rem",
    display: "block",
    textAlign: "left",
    paddingLeft: "0.5rem",
  }
};