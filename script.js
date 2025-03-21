// script.js - DeepSeek API Integration

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    const chatbox = document.getElementById("chatbox");

    // Show user message
    chatbox.innerHTML += `<div class="user-message">You: ${userInput}</div>`;
    document.getElementById("userInput").value = "";  // Clear input

    try {
        // ✅ DeepSeek API URL
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,  // ✅ Using Secure Key from config.js
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: userInput }],
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const botMessage = data.choices[0].message.content;

            // ✅ Show DeepSeek Response
            chatbox.innerHTML += `<div class="bot-message">DeepSeek: ${botMessage}</div>`;
        } else {
            chatbox.innerHTML += `<div class="bot-message error">Error: Unable to get a response.</div>`;
        }
    } catch (error) {
        chatbox.innerHTML += `<div class="bot-message error">Error: Unable to get a response. Check console for details.</div>`;
        console.error("Error:", error);
    }

    chatbox.scrollTop = chatbox.scrollHeight;  // Auto-scroll to bottom
}
