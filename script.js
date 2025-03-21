const API_KEY = "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"; // Your OpenRouter API key

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") {
        return;
    }

    // Show user message
    appendMessage("You", userInput, "user");

    // Prepare API request
    const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
    const requestBody = {
        model: "deepseek-ai/deepseek-chat",
        messages: [{ role: "user", content: userInput }],
        max_tokens: 100
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const botReply = data.choices[0]?.message?.content || "No response received.";

        // Show bot reply
        appendMessage("Bot", botReply, "bot");

    } catch (error) {
        console.error("Error fetching response:", error);
        appendMessage("Bot", "Error: Unable to get a response. Check console for details.", "error");
    }

    // Clear input
    document.getElementById("user-input").value = "";
}

function appendMessage(sender, message, type) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}
