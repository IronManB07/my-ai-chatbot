// ✅ Base64 Encoded API Key
const encodedKey = "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==";
const API_KEY = atob(encodedKey);

// ✅ Hugging Face API URL for LLaMA 2
const API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf";

// ✅ Send User Message and Get Bot Response
async function sendMessage() {
    const userInput = document.getElementById("userInput").value;

    // ✅ Display user message in chatbox
    if (userInput.trim() === "") return;
    document.getElementById("chatbox").innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // ✅ Prepare request data
    const data = {
        inputs: userInput,  // User message to LLaMA 2
    };

    try {
        // ✅ Fetch API response
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
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
        const botResponse = result[0]?.generated_text || "Sorry, I couldn't process that.";

        // ✅ Display bot response
        document.getElementById("chatbox").innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("chatbox").innerHTML += `<p><strong>Error:</strong> Unable to get a response. Check console for details.</p>`;
    }

    // ✅ Clear input box
    document.getElementById("userInput").value = "";
}
