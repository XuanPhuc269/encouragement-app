import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router"; // Add router import

const EMOJIS = ["✨", "🌟", "💫", "🥳", "🎉", "🍀", "🦄"];

export default function Layout({ children }) {
  const [sparks, setSparks] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter(); // Get router
  
  // Handle click for sparks effect
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

  // Set up audio when component mounts
  useEffect(() => {
    // Browser security requires user interaction before playing audio
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying && !router.pathname.includes('/message')) {
        audioRef.current.volume = 0.7; // Set to 30% volume
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Music started playing");
          })
          .catch(err => console.log("Audio play failed:", err));
      }
    };

    // Add event listeners for user interactions
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isPlaying, router.pathname]);

  // Check if we're on the message page and mute audio
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (router.pathname.includes('/message')) {
      // On message page - pause audio
      audioRef.current.pause();
    } else if (isPlaying) {
      // On other pages - resume audio if it was playing
      audioRef.current.play().catch(err => console.log("Resume failed:", err));
    }
  }, [router.pathname, isPlaying]);

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
      {/* Audio element in Layout persists across pages */}
      <audio 
        ref={audioRef} 
        src="/background_music.mp3" 
        loop 
        preload="auto"
      />
      
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