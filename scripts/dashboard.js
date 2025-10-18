// Simple mobile menu toggle
document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("open");
});

const geminiKey = "AIzaSyC0AaxUzME9O9IqN_r--VXy0EPI2WLvYiQ";

const inputEl = document.querySelector(".message-input");
const buttonEl = document.querySelector(".send-button");

buttonEl.addEventListener("click", () => {
  console.log(inputEl.value);
});

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const prompt = inputEl.value;
    sendPrompt(prompt);
  }
});

async function sendPrompt(idea) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: idea }] }],
      }),
    }
  );

  const data = await response.json();
  console.log(data.candidates[0].content.parts[0].text);
}
