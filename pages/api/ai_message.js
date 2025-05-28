import { generateMessage } from "@/lib/openai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, score, feeling } = req.body;

    if (!name || !score || !feeling) {
        return res.status(400).json({ error: 'Name, score, and feeling are required' });
    }

    try {
        const message = await generateMessage({ name, score, feeling });
        return res.status(200).json({ message });
    } catch (error) {
        console.error('Error generating message:', error);
        return res.status(500).json({ error: 'Failed to generate message' });
    }
}