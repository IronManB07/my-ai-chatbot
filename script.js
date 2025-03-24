const API_KEY = "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"; // Your OpenRouter API key

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") {
        return;
    }

    // Show user message
    appendMessage("You", userInput, "user");

    // Prepare API request
    const apiUrl = "https://openrouter.ai/api/v1";
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
