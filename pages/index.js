import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { AlignCenter } from "lucide-react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Layout>
      <h1 style={{
        fontFamily: 'Montagu Slab, serif',
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#DC143C'
      }}>To My Little Warriors</h1>
      <p style={{
        fontFamily: 'Crimson Text, serif',
        fontWeight: 'bold',
        color: '#D8A7A7',
        fontSize: '1.5rem',
        marginTop: '1rem',
        width: '580px',
        textAlign: 'left'
      }}>About this app</p>
      <TypingAnimation
        style={{
          fontFamily: 'Crimson Text, serif',
          fontSize: '1.3rem',
          textAlign: 'left',
          lineHeight: '1.5',
          marginBottom: '2rem',
          color: "black",
          maxWidth: '580px',
          fontStyle: 'italic',
        }}>
        A little gift I want to send to my students before their high school entrance exam. Good luck with your exam 🍀🍀🍀
      </TypingAnimation>
      <Link href={"/info"}>
        <button style={{
          ...styles.button,
          backgroundColor: isHovered ? '#A98C7B' : '#8B6F61',
          scale: isHovered ? '1.05' : '1',
          transition: 'background-color 0.3s ease',
        }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >Start</button>
      </Link>
    </Layout>
  );
}

const styles = {
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#8B6F61',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.3rem',
    width: '100px',
    height: '50px',
  },
};