const apiKey = "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"; // Replace with your DeepSeek API Key
const apiUrl = "https://api.deepseek.com/v1/chat/completions";

async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (!userInput.trim()) return;

  const messageBox = document.getElementById("chatbox");
  messageBox.innerHTML += `<div class="user-message"><strong>You:</strong> ${userInput}</div>`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", // DeepSeek R1 Zero model name
        messages: [{ role: "user", content: userInput }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const botReply = data.choices[0]?.message?.content || "No response received.";

    messageBox.innerHTML += `<div class="bot-message"><strong>Bot:</strong> ${botReply}</div>`;
  } catch (error) {
    console.error("Error:", error);
    messageBox.innerHTML += `<div class="error-message"><strong>Bot:</strong> Error: Unable to get a response. Check console for details.</div>`;
  }

  document.getElementById("userInput").value = "";
}
