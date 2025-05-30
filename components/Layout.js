export default function Layout({ children }) {
    return (
        <div style={{
            backgroundColor: '#FFFFE0',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            {children}
        </div>
    )
}