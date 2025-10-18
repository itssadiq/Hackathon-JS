// Simple form switching functionality
document.getElementById("show-signup").addEventListener("click", function () {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("signup-form").classList.remove("hidden");
});

document.getElementById("show-login").addEventListener("click", function () {
  document.getElementById("signup-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
});

// Form submission handling (you can customize this)
document.getElementById("login").addEventListener("submit", function (e) {
  e.preventDefault();
  // Add your login logic here
  alert("Login form submitted - add your backend logic");
});

document.getElementById("signup").addEventListener("submit", function (e) {
  e.preventDefault();
  // Add your signup logic here
  alert("Sign up form submitted - add your backend logic");
});
