export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, score } = req.body;

    if (!name || !score) {
        return res.status(400).json({ error: 'Name and score are required' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that provides encouraging messages.',
                    },
                    {
                        role: 'user',
                        content: `Generate an encouraging message for ${name} who is aiming for a score of ${score} in English exam.
                        Keep it short, warm, and personalized.`,
                    },
                ],
                temperature: 0.8,
            }),         
        });


    const data = await response.json();
    const message = data.choices[0].message.content;

    return res.status(200).json({ message });
    } catch (error) {
        console.error('Error generating message:', error);
        return res.status(500).json({ error: 'Failed to generate message' });
    }
}