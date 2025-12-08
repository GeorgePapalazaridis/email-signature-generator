import { translations } from "./translations/translations.data.js";

/**
 * Notifications Module
 * - Toasts for success/error/info states
 * - Completion popup with confetti celebration
 *
 * Pure UI module — no business logic inside
 * Translations must be passed in by caller
 */

/**
 * Simple top toast (error/success)
 */
export function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastOut 0.4s ease forwards";
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

/**
 * Center popup with confetti when the flow is completed
 */
export function showThankYouPopup() {
  const popup = document.getElementById("thankYouPopup");
  const msg = document.getElementById("thankYouMessage");
  if (!popup || !msg) return;

  const t = translations[window.currentLang || "gr"] || translations["gr"];

  msg.textContent = t.success.installDone;
  popup.classList.remove("hidden");
  popup.setAttribute("aria-hidden", "false");

  // 🎉 Confetti burst
  const container = popup.querySelector(".confetti-container");
  if (!container) return;

  container.innerHTML = "";

  const colors = ["#ed6900", "#001489", "#f6a86e", "#ffdd55", "#36c"];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = 1 + Math.random() * 1.4 + "s";
    container.appendChild(p);
  }

  setTimeout(() => {
    popup.classList.add("hidden");
    popup.setAttribute("aria-hidden", "true");
  }, 2400);
}
