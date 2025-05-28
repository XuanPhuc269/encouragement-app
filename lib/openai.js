export async function generateMessage({ name, score, feeling }) {
    const prompt = `Generate an encouraging message for ${name} who is aiming for a score of ${score} the message must align with their current ${feeling}`

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
                    content: prompt,
                },
            ],
            temperature: 0.8,
        }),
    });
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? 'Error generating message';
}