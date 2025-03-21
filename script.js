const apiKey = "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"; // Put your OpenRouter API Key here
const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput === "") return;

    // Display user message
    displayMessage(userInput, "user");

    // Call API and get bot response
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "openrouter/chatgpt-3.5", // Change if using other models like gpt-4
                messages: [{ role: "user", content: userInput }],
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content.trim();
        displayMessage(botMessage, "bot");
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Error: Unable to get a response. Check console for details.", "bot");
    }

    document.getElementById("user-input").value = "";
}

function displayMessage(message, sender) {
    const chatLog = document.getElementById("chat-log");
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "user" ? "user-message" : "bot-message";
    messageDiv.innerHTML = `<strong>${sender === "user" ? "You" : "Bot"}:</strong> ${message}`;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}
