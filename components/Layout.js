import { useState } from "react";

const EMOJIS = ["✨", "🌟", "💫", "🥳", "🎉", "🍀", "🦄"];

export default function Layout({ children }) {
  const [sparks, setSparks] = useState([]);

  const handleClick = (e) => {
    // Lấy vị trí click
    const x = e.clientX;
    const y = e.clientY;
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const id = Math.random().toString(36).slice(2);

    setSparks((prev) => [
      ...prev,
      { id, x, y, emoji }
    ]);

    // Xóa emoji sau khi animation xong
    setTimeout(() => {
      setSparks((prev) => prev.filter(s => s.id !== id));
    }, 900);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFE0',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
      onClick={handleClick}
    >
      {children}
      {sparks.map(spark => (
        <span
          key={spark.id}
          style={{
            position: "fixed",
            left: spark.x,
            top: spark.y,
            fontSize: "2.5rem",
            pointerEvents: "none",
            userSelect: "none",
            animation: "sparkle 0.9s ease-out forwards",
            zIndex: 9999,
          }}
        >
          {spark.emoji}
        </span>
      ))}
      <style jsx global>{`
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0.5) translateY(0); }
          20% { opacity: 1; transform: scale(1.2) translateY(-10px);}
          80% { opacity: 1; }
          100% { opacity: 0; transform: scale(0.8) translateY(-40px);}
        }
      `}</style>
    </div>
  );
}