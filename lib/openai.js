export async function generateMessage({ name, score, feeling }) {
    const prompt = `
        Bạn là một người thầy đang viết lời nhắn gửi tới học sinh trước kỳ thi vào lớp 10.

        *Mục tiêu*: Viết một tin nhắn cá nhân hoá để khích lệ học sinh dựa trên thông tin sau:
        - Tên học sinh: ${name}
        - Mức điểm mong muốn: ${score}
        - Cảm xúc hiện tại của học sinh: ${feeling}

        *Yêu cầu nội dung*:
        1. Gọi học sinh là “em”, và người gửi (tôi) là “Xuân Phúc”.
        2. Lời nhắn cần có **3 đoạn rõ ràng**:
        - **Đoạn 1**: Chúc mừng học sinh đã nỗ lực trong suốt thời gian qua.
        - **Đoạn 2**: Lời động viên cá nhân hoá, liên quan trực tiếp đến cảm xúc *${feeling}* và điểm số *${score}* của học sinh.

        *Định dạng đầu ra*:
        Gửi ${name},

        [Đoạn 1]

        [Đoạn 2]

    `;

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