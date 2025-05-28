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

            <label>Em là:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chọn tên em"
                style={styles.input}
            />

            <label>Điểm số em muốn: </label>
            <input
                type="text"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Chọn tên em"
                style={styles.input}
            />
            <label>Cảm xúc của em: </label>
            <textarea
                value={feeling}
                onChange={(e) => setFeelings(e.target.value)}
                placeholder="Em đang cảm thấy như thế nào?"
                style={styles.textarea}
            />

            <button onClick={handleSubmit} style={styles.button}>my message for you</button>
        </Layout>
    );
}

const styles = {
  textarea: {
    padding: "0.5rem", 
    width: "250px", 
    height: "80px", 
    borderRadius: "8px", 
    border: "1px solid #ccc"
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