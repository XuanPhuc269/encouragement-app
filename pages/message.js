import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MessagePage() {
    const router = useRouter();
    const { name, score, feeling } = router.query;
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        console.log("router.isReady:", router.isReady);
        console.log("query:", { name, score, feeling });
        if (!router.isReady) return;
        if (name && score && feeling) {
            fetch('/api/ai_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, score, feeling }),
            })
            .then(async (res) => res.json())
            .then((data) => { 
                if (data.message) setMessage(data.message); 
                else setMessage("No message generated.");
            })
            .catch((error) => setMessage("Failed to load message."))
        }
    }, [router.isReady, name, score, feeling]);

    return (
        <Layout>
            <BackButton />
            <h2 style={{ color: "#DC143C", fontSize: "2rem", fontWeight: "bold" }}>{name}</h2>
            <p>Điểm số em mong muốn: <strong>{score}</strong></p>

            <div style={styles.card}>
                <p><strong>Lời nhắn của anh:</strong></p>
                <p style={{ marginTop: "0.5rem" }}>{message}</p>
                <p style={{ textAlign: "right", fontStyle: "italic", marginTop: "1rem" }}>
                — Ông anh giả sư làm trò 😎
                </p>
            </div>
        </Layout>
    )
}

const styles = {
    card: {
        border: "1px solid #a98c7b",
        borderRadius: "10px",
        padding: "1rem",
        backgroundColor: "#fff",
        maxWidth: "500px",
        marginTop: "1rem",
    },
};