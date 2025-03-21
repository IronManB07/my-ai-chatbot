// script.js
async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") {
        return;
    }

    // Display user message
    displayMessage(`You: ${userInput}`, "user-message");

    // Send request to DeepSeek API
    try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ "role": "user", "content": userInput }]
            })
        });

        if (!response.ok) {
            throw new Error("API error. Check console for details.");
        }

        const data = await response.json();
        const botResponse = data.choices[0]?.message?.content || "No response received.";

        // Display bot response
        displayMessage(`Bot: ${botResponse}`, "bot-message");
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Error: Unable to get a response. Check console for details.", "error");
    }

    // Clear input field
    document.getElementById("userInput").value = "";
}

// Display messages in chatbox
function displayMessage(message, className) {
    const chatbox = document.getElementById("chatbox");
    const messageElement = document.createElement("div");
    messageElement.className = className;
    messageElement.innerText = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}
