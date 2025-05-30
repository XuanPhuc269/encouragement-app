import { useRouter } from 'next/router';

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            style={{
                position: 'absolute',
                top: 20,
                left: 20,
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                color: 'black'
            }}
            aria-label='Back'>
                <span className="material-symbols-outlined">arrow_back_ios</span>   
        </button>
    )
}