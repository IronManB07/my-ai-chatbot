// ✅ Add your DeepSeek API Key here
const API_KEY = "c2ef91b847e54e1c97af49ac74af1dd6";

// ✅ CORS Proxy to avoid errors
const API_URL = "https://corsproxy.io/?https://api.deepseek.com/v1/chat/completions";

// ✅ Send User Message and Get Bot Response
async function sendMessage() {
    const userInput = document.getElementById("userInput").value;

    // ✅ Display user message in chatbox
    if (userInput.trim() === "") return;
    document.getElementById("chatbox").innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // ✅ Prepare request data
    const data = {
        model: "deepseek-chat",  // Model name for DeepSeek
        messages: [{ role: "user", content: userInput }],
    };

    try {
        // ✅ Fetch API response
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(data),
        });

        // ✅ Check if the response is successful
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        // ✅ Parse API response
        const result = await response.json();

        // ✅ Extract bot's response
        const botResponse = result.choices[0].message.content;

        // ✅ Display bot response
        document.getElementById("chatbox").innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("chatbox").innerHTML += `<p><strong>Error:</strong> Unable to get a response. Check console for details.</p>`;
    }

    // ✅ Clear input box
    document.getElementById("userInput").value = "";
}
