/* General body styles */
body {
    font-family: Arial, sans-serif;
    background-color: #f3f4f6;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Chat container styles */
.chat-container {
    width: 450px;
    height: 600px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* Header styles */
.chat-header {
    background-color: #0b6cf1;
    padding: 12px;
    color: white;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}

/* Chatbox styles */
.chatbox {
    flex-grow: 1;
    padding: 12px;
    overflow-y: auto;
    border-top: 1px solid #e5e7eb;
}

/* User and Bot messages */
p {
    margin: 6px 0;
}

/* User message styles */
p strong {
    color: #4a5568;
}

/* Bot message styles */
p.bot-message {
    background-color: #edf2f7;
    padding: 8px 12px;
    border-radius: 8px;
    max-width: 80%;
}

/* Input and button styles */
.chat-input {
    display: flex;
    padding: 12px;
    border-top: 1px solid #e5e7eb;
    background-color: #f9fafb;
}

#userInput {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
}

#sendButton {
    margin-left: 8px;
    padding: 10px 20px;
    background-color: #0b6cf1;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}

#sendButton:hover {
    background-color: #0852c1;
}

/* Responsive design */
@media screen and (max-width: 500px) {
    .chat-container {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
}
