// FAREED — interactive behaviour and contact-form validation
"use strict";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

// Open and close the mobile navigation menu.
menuToggle.addEventListener("click", function () {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Close the mobile menu after a navigation link is selected.
mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Display the current year automatically in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Validate the contact form. This demonstration does not transmit messages.
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  feedback.className = "form-feedback";

  if (!fullName || !email || !subject || !message) {
    showFeedback("Please complete every field before continuing.", "error");
    return;
  }

  if (!emailPattern.test(email)) {
    showFeedback("Please enter a valid email address.", "error");
    return;
  }

  if (message.length < 10) {
    showFeedback("Please make your message at least 10 characters long.", "error");
    return;
  }

  showFeedback("Validation successful. This demo form does not send or store messages.", "success");
  contactForm.reset();
});

function showFeedback(text, status) {
  feedback.textContent = text;
  feedback.classList.add(status);
}
