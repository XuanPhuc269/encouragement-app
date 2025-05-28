import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <h1 style={{ 
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#DC143C'
      }}>To My Little Warrior</h1>
      <p style={{
        color: '#D8A7A7',
        marginTop: '1rem'
      }}>About this app</p>
      <p style={{
        maxWidth: 300,
        marginBottom: '2rem'
      }}>
        Just a little gift I wanted to send to my students before the big high shool exam 💫.
      </p>
      <Link href={"/info"}>
        <button style={styles.button}>Start</button>
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
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};