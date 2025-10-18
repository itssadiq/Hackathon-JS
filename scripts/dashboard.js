import { retrieveSession } from "../backend/backend.js";

async function checkAuthentication() {
  const data = await retrieveSession();

  if (data.session == null) {
    window.location.href = "index.html";
  }

  console.log(data.session.user);
}

checkAuthentication();

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Chat elements
const chatBox = document.querySelector(".chatbox");
const inputEl = document.querySelector(".message-input");
const buttonEl = document.querySelector(".send-button");
const welcomeContainer = document.querySelector(".welcome-container");

// API key
const geminiKey = "AIzaSyC0AaxUzME9O9IqN_r--VXy0EPI2WLvYiQ";

// Send message on button click
buttonEl.addEventListener("click", sendMessage);

// Send message on Enter key (but allow Shift+Enter for new line)
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const idea = inputEl.value.trim();
  if (!idea) return;

  hideWelcomeMessage();
  addUserMessage(idea);
  showLoadingIndicator();
  clearInput();
  disableSendButton();
  scrollToBottom();

  generatePitch(idea);
}

function hideWelcomeMessage() {
  welcomeContainer.style.display = "none";
}

function addUserMessage(message) {
  chatBox.innerHTML += `
    <div class="message">
      <div class="message-avatar user-avatar">U</div>
      <div class="message-content">
        <div class="idea"><p>${message}</p></div>
      </div>
    </div>
  `;
}

function showLoadingIndicator() {
  chatBox.innerHTML += `
    <div class="message">
      <div class="message-avatar assistant-avatar">AI</div>
      <div class="message-content">
        <div class="loading">
          <span>Crafting your startup pitch</span>
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function clearInput() {
  inputEl.value = "";
}

function disableSendButton() {
  buttonEl.disabled = true;
}

function enableSendButton() {
  buttonEl.disabled = false;
}

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLastMessage() {
  const messages = document.querySelectorAll(".message");
  if (messages.length > 0) {
    messages[messages.length - 1].remove();
  }
}

async function generatePitch(idea) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a startup pitch assistant.
Task: Generate a startup name, tagline, short pitch, target audience and website landing page content for the following business idea.
If the text does not sound like a business idea, answer to text in a natural tone not more than a line and at the end, just add: "Please provide your business idea."

Business Idea: ${idea}
"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const pitch = data.candidates[0].content.parts[0].text;

    removeLastMessage();
    addAssistantResponse(pitch);
  } catch (error) {
    console.error("Error generating pitch:", error);
    removeLastMessage();
    showErrorMessage();
  } finally {
    enableSendButton();
    inputEl.focus();
  }
}

function addAssistantResponse(pitch) {
  chatBox.innerHTML += `
    <div class="message">
      <div class="message-avatar assistant-avatar">AI</div>
      <div class="message-content">
        <div class="response">${formatPitch(pitch)}</div>
      </div>
    </div>
  `;
  scrollToBottom();
}

function showErrorMessage() {
  chatBox.innerHTML += `
    <div class="message">
      <div class="message-avatar assistant-avatar">AI</div>
      <div class="message-content">
        <div class="response">
          <p>Sorry, I couldn't generate your pitch right now. Please try again.</p>
        </div>
      </div>
    </div>
  `;
  scrollToBottom();
}

function formatPitch(pitch) {
  let formattedPitch = pitch
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");

  if (pitch.includes("Name:") || pitch.includes("Startup Name:")) {
    return formattedPitch;
  }

  return `<p>${formattedPitch}</p>`;
}
