import { use, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import BackButton from "@/components/BackButton";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [feeling, setFeelings] = useState("");
  const [loading, setLoading] = useState(false); 
  const [isHovered, setIsHovered] = useState(false);


  const handleSubmit = async () => {
    if (!name || !score || !feeling) {
      alert("Em hãy điền đầy đủ thông tin.");
      return;
    }
    setLoading(true);
     try {
      const res = await fetch("/api/ai_message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score, feeling }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.message) {
        router.push({
          pathname: "/message",
          query: { name, score, message: encodeURIComponent(data.message) },
        });
      } else {
        alert("Lỗi tạo tin nhắn.");
      }
    } catch (e) {
      setLoading(false);
      alert("Có lỗi xảy ra!");
    }
  };

  // Tải trước tất cả các hình ảnh
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = [
        "/ngoc_ava.png", 
        "/quynh_ava.png", 
        "/vietanh_ava.png", 
        "/ava_frame.png",
        "/card.png"
      ];
      
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };
    
    preloadImages();
  }, []);

  return (
    <Layout>
      <BackButton />
      <h1 style={styles.heading}>Thông tin của em</h1>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ flex: 2 }}>
          <label style={styles.label}>Em là:</label>
          <select
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              ...styles.input,
              width: "250px",
              cursor: "pointer"
            }}
          >
            <option value="">Chọn tên em</option>
            <option value="Phương Bảo Ngọc">Ngọc</option>
            <option value="Nguyễn Việt Anh">Việt Anh</option>
            <option value="Nguyễn Long Vũ">Vũ</option>
            <option value="Nguyễn Trúc Quỳnh">Quỳnh</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Mục tiêu của em: </label>
          <input
            type="number"
            value={score}
            onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (Number(value) >= 0 && Number(value) <= 30)) {
                  setScore(value);
                } else {
                  alert("Điểm số phải từ 0 đến 30.");
                }
              }
            }
            min="0"
            max="30"
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
      }}>Hãy để lại chút cảm nhận hiện giờ: </label>
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
        disabled={loading}
      >
        {loading ? "preparing..." : "my message for you"}
      </button>
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
    fontWeight: "bold",
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
    height: "40px",
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