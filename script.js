const API_KEY = "sk-c2ef91b847e54e1c97af49ac74af1dd6";  // Paste your DeepSeek API Key here
const API_URL = "https://cors-anywhere.herokuapp.com/https://api.deepseek.com/v1/chat/completions";


async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    document.getElementById("chatbox").innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Create payload for API
    const data = {
        model: "deepseek-chat",  // Model name for DeepSeek API
        messages: [{ role: "user", content: userInput }],
    };

    // Call DeepSeek API
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sk-c2ef91b847e54e1c97af49ac74af1dd6}`
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    const botResponse = result.choices[0].message.content;

    document.getElementById("chatbox").innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
    document.getElementById("userInput").value = "";
}
