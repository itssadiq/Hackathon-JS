import { registerUser } from "../backend/backend.js";
import { loginUser } from "../backend/backend.js";

// Simple form switching functionality
document.getElementById("show-signup").addEventListener("click", function () {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("signup-form").classList.remove("hidden");
});

document.getElementById("show-login").addEventListener("click", function () {
  document.getElementById("signup-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
});

// Login signup functionality

const signupForm = document.getElementById("signup-form");
const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPass = document.getElementById("signup-password");

function sendSignUpDetailstoDB() {
  const email = signupEmail.value;
  const password = signupPass.value;
  const name = signupName.value;

  registerUser(email, password, name);
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendSignUpDetailstoDB();
});

const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPass = document.getElementById("login-password");

async function userLogin() {
  const email = loginEmail.value;
  const password = loginPass.value;

  try {
    const data = await loginUser(email, password);
    if (data) {
      window.location.href = "dashboard.html";
    }
  } catch (error) {
    alert(error.message);
  }
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  userLogin();
});
