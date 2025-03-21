// JavaScript Code for AI Chatbot Using DeepSeek (OpenRouter)
const apiKey = "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"; // Your valid OpenRouter API key
const apiUrl = "https://openrouter.ai/api/v1/chat/completions"; // Correct OpenRouter API endpoint

// Get references to DOM elements
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatContainer = document.getElementById("chatContainer");
// Function to display messages in the chatbox
function appendMessage(role, content) {
  const messageElement = document.createElement("div");
  messageElement.className = role === "user" ? "message user" : "message bot";
  messageElement.innerHTML = `<strong>${role === "user" ? "You" : "Bot"}:</strong> ${content}`;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Send user message and get AI response
async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage === "") return;

  // Display user message
  appendMessage("user", userMessage);
  userInput.value = ""; // Clear input field

  try {
    // Make API request to OpenRouter with DeepSeek model
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-coder", // Use the correct model name
        messages: [{ role: "user", content: userMessage }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content.trim();
    appendMessage("bot", botMessage);

  } catch (error) {
    console.error("Error:", error);
    appendMessage("bot", `Error: Unable to get a response. Check console for details.`);
  }
}

// Event listener for send button
sendButton.addEventListener("click", sendMessage);

// Press "Enter" to send message
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
