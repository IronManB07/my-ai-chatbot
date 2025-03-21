const apiKey = "sk-29ef2fc760334fc681d7032ee0dd3979"; // Put your DeepSeek API key here
const apiUrl = "https://api.deepseek.com/v1/chat/completions";

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p class="user-message"><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: userInput }],
            }),
        });

        if (!response.ok) {
            throw new Error("Error fetching response.");
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        chatBox.innerHTML += `<p class="bot-message"><strong>Bot:</strong> ${botMessage}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<p class="bot-message"><strong>Error:</strong> Unable to get a response. Check console for details.</p>`;
    }
}
