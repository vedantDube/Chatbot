const apiKey = "AIzaSyBRnouI_calY6MmoftvdM-B4-kpy_qemZ4"
const chatContainer = document.getElementById("chatContainer");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, "user-message");
    userInput.value = "";

    // Get bot response from Gemini API
    const response = await getBotResponse(message);
    addMessage(response, "bot-message");
});

function addMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.textContent = text;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function getBotResponse(message) {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;
    const requestBody = {
        contents: [{
            parts: [{ text: message }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "Sorry, something went wrong!";
    }
}
function clearChat() {
    chatContainer.innerHTML = "";
}