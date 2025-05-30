import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Confetti from 'react-confetti';

export default function MessagePage() {
    const router = useRouter();
    const { name, score, message } = router.query;
    const [aiMessage, setAiMessage] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiPieces, setConfettiPieces] = useState(300);
    const audioRef = useRef(null);

    useEffect(() => {
        if (message) {
            setAiMessage(decodeURIComponent(message));
            setShowConfetti(true);
            setConfettiPieces(300);

            // Play background music
            if (audioRef.current) {
                audioRef.current.volume = 0;
                audioRef.current.currentTime = 0;
                audioRef.current.play().then(() => {
                    audioRef.current.muted = false; 
                }).catch(() => {
                    
                });

                // Fade in effect
                let vol = 0;
                const fadeStep = 0.05;
                const fadeInterval = setInterval(() => {
                    if (audioRef.current && vol < 1) {
                        vol = Math.min(vol + fadeStep, 1);
                        audioRef.current.volume = vol;
                    } else {
                        clearInterval(fadeInterval);
                    }
                }, 150); // Adjust speed here (ms)
            }

            // Sau 10s, bắt đầu giảm dần số lượng confetti
            const fadeTimeout = setTimeout(() => {
                let pieces = 500;
                const fadeInterval = setInterval(() => {
                    pieces -= 30;
                    setConfettiPieces(Math.max(pieces, 0));
                    if (pieces <= 0) {
                        clearInterval(fadeInterval);
                        setTimeout(() => setShowConfetti(false), 3000);
                    }
                }, 100);
            }, 10000); // 10s đầu giữ nguyên, sau đó fade out

            return () => clearTimeout(fadeTimeout);
        }
    }, [message]);

    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Layout>
            <audio ref={audioRef} src="/sfx.mp3" autoPlay muted/>
            {showConfetti && (
                <Confetti
                    width={dimensions.width}
                    height={dimensions.height}
                    numberOfPieces={confettiPieces}
                />
            )}
            <BackButton />
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                <div style={{ flex: 1 }}>
                    <img
                        src={
                            name === "Phương Bảo Ngọc"
                                ?"/ngoc_ava.png"
                                : name === "Nguyễn Trúc Quỳnh"
                                ? "/quynh_ava.png"
                                : "/ava_frame.png"

                        }
                        alt="Student Avatar"
                        style={{ width: 397, height: 380, borderRadius: "50%", objectFit: "cover", alignContent: "center" }}
                    />
                    <h2 style={{
                        ...styles.heading,
                        maxWidth: "100%",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        padding: "0 2rem 0 1rem"
                    }}>{name}</h2>
                    <p style={{
                        ...styles.label,
                        padding: "0 2rem 0 1rem"
                    }}>Điểm số em mong muốn: <strong>{score}</strong></p>
                </div>
                <div style={{
                    ...styles.card,
                    flex: 3,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "300px",
                }}>
                    <p style={styles.subheading}><strong>Lời nhắn của anh:</strong></p>
                    <p style={{
                        ...styles.message,
                        marginTop: "0.5rem",
                        whiteSpace: "pre-wrap",
                    }}>{aiMessage}</p>
                    <p style={{
                        ...styles.from,
                        textAlign: "right", fontStyle: "italic", marginTop: "1rem", marginBottom: 0
                    }}>
                        <strong>Từ:</strong> Ông anh gia sư lắm trò 😎
                    </p>
                </div>
            </div>



        </Layout>
    )
}

const styles = {
    card: {
        border: "1px solid #a98c7b",
        borderWidth: "2px",
        borderRadius: "10px",
        padding: "1rem",
        backgroundColor: "#fff",
        maxWidth: "700px",
        marginTop: "1rem",
    },
    heading: {
        fontFamily: "Montagu Slab, serif",
        color: "#DC143C",
        fontSize: "2rem",
        marginBottom: "0.5rem",
        textAlign: "center",
        fontWeight: "bold",
    },
    subheading: {
        fontFamily: "Crimson Text, serif",
        fontWeight: "semi-bold",
        color: "#D8A7A7",
        fontSize: "1.2rem",
        textAlign: "left",
    },
    message: {
        fontSize: "1.2rem",
        color: "black",
        maxWidth: "700px",
        marginBottom: "1rem",
        fontFamily: "Crimson Text, serif",
    },
    from: {
        color: "#888",
        fontStyle: "italic",
        fontFamily: "Playfair Display, serif",
    },
    label: {
        fontFamily: "Crimson Text, serif",
        color: "black",
        fontSize: "1.5rem",
        marginTop: "0.5rem",
        display: "block",
        textAlign: "center",
        paddingLeft: "0.5rem",
    }
};