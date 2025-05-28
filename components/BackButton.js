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
                fontSize: '1.5rem',
                cursor: 'pointer'
            }}
            aria-label='Back'>
            ←
        </button>
    )
}