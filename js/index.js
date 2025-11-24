import { logoBase64 } from "../assets/base64/logo-base64.js";
import { translations, setLanguage } from "./translations.js";
import { buildSignature } from "./signature-template.js";
import { bindDom } from "./dom-bindings.js";

// ===========================
// DOM Refs (new 3-step wizard)
// ===========================
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");

// Buttons
const toStep2Btn = document.getElementById("toStep2Btn");
const toStep3Btn = document.getElementById("toStep3Btn");
const toStep4Btn = document.getElementById("toStep4Btn");

const backToStep1Btn = document.getElementById("backToStep1");
const backToStep2Btn = document.getElementById("backToStep2");
const backToStep3Btn = document.getElementById("backToStep3");

const finishBtn = document.getElementById("finishBtn");

// Inputs
const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const addressInput = document.getElementById("address");
const mobileInput = document.getElementById("mobile");
const phoneInput = document.getElementById("phone");

// Preview box (Step 2)
const previewBox = document.getElementById("preview-box");

// Platform cards (Step 3)
const platformCards = document.querySelectorAll(".platform-card");

// Optional old/final DOM (if you decide to keep them later)
const bookmarkletContainer = document.getElementById("bookmarklet-container");
const bookmarkletLink = document.getElementById("bookmarklet");
const dragTextEl = document.getElementById("dragText");
const instructionEl = document.getElementById("instructionText");

// ===========================
// State
// ===========================
window.selectedPlatform = null;

window.signatureHtml = "";

// ===========================
// Helpers
// ===========================
function showStep(stepEl) {
  [step1, step2, step3, step4].forEach((s) => {
    if (!s) return;
    s.style.display = s === stepEl ? "block" : "none";
  });

  stepEl?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function step1IsValid() {
  return (
    nameInput?.value.trim().length > 0 && titleInput?.value.trim().length > 0
  );
}

function updateToStep2State() {
  if (!toStep2Btn) return;
  toStep2Btn.disabled = !step1IsValid();
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastOut 0.4s ease forwards";
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

function buildSignatureHtml() {
  const name = nameInput.value.trim();
  const title = titleInput.value.trim();
  const address = addressInput.value || "Farsalon 153, Larissa, 41335 - Greece";
  const mobile = mobileInput.value.trim();
  const phone = phoneInput.value.trim() || "+30 2410 623 922";

  return buildSignature({
    name,
    title,
    address,
    phone,
    mobile,
    logoBase64,
  });
}

function makeBookmarklet(signature, t) {
  // Προσοχή: JSON.stringify για ασφαλή embed
  return `javascript:(function(){
    function visible(el){return !!(el && el.offsetParent !== null);}
    function findEditor(win){
      var ed = win.document.querySelector('div[role="textbox"][contenteditable="true"]');
      if (visible(ed)) return ed;
      var cands = win.document.querySelectorAll('[contenteditable="true"], div[role="textbox"]');
      for (var i=0;i<cands.length;i++){ if(visible(cands[i])) return cands[i]; }
      var ifr = win.document.querySelectorAll('iframe');
      for (var j=0;j<ifr.length;j++){
        try { var r = findEditor(ifr[j].contentWindow); if (r) return r; } catch(e){}
      }
      return null;
    }
    var editor = findEditor(window);
    if(editor){
      editor.innerHTML = ${JSON.stringify(signature)};
      alert(${JSON.stringify(t.success)});
    } else {
      alert(${JSON.stringify(t.notFound)});
    }
  })();`;
}

function renderOutlookStep4(signatureHtml, t) {
  const container = document.getElementById("step4Content");
  if (!container) return;

  container.innerHTML = `
<div class="step4-card">

  <!-- 1) Step 1 -->
  <div class="step4-section">
    <h4 class="step4-subtitle">1. ${t.outlook_step1_title}</h4>

    <a id="bookmarkletButton"
       href="#"
       class="bookmarklet-btn">
      ${t.bookmarkletLabel}
    </a>

    <p class="step4-note">
      ${t.outlook_step1_note_intro}<br>
      ${t.outlook_step1_note_mac}<br>
      ${t.outlook_step1_note_win}
    </p>

  </div>

  <!-- 2) Step 2 -->
  <div class="step4-section">
    <h4 class="step4-subtitle">2. ${t.outlook_step2_title}</h4>

    <a href="https://outlook.office.com/" target="_blank" class="outlook-btn">
      ${t.outlook_open_button}
    </a>
  </div>

  <!-- 3) Step 3 -->
  <div class="step4-section">
    <h4 class="step4-subtitle">3. ${t.outlook_step3_title}</h4>
    <p class="step4-text">
      ${t.outlook_step3_text}
    </p>
  </div>

  <!-- 4) Step 4 -->
  <div class="step4-section">
    <h4 class="step4-subtitle">4. ${t.outlook_step4_title}</h4>
    <p class="step4-text">
      ${t.outlook_step4_text}
    </p>
  </div>

</div>
  `;

  // Connect Bookmarklet
  const btn = document.getElementById("bookmarkletButton");
  if (btn) {
    btn.href = makeBookmarklet(window.signatureHtml, t);
  }
}

function downloadHtmlFile(html, filename = "prognosis-signature.html") {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// ===========================
// Step 1 -> Step 2 (Preview)
// ===========================
[nameInput, titleInput].forEach((el) => {
  el?.addEventListener("input", updateToStep2State);
});
updateToStep2State();

toStep2Btn?.addEventListener("click", () => {
  if (!step1IsValid()) {
    const msg =
      window.currentLang === "gr"
        ? "⚠️ Συμπλήρωσε τουλάχιστον Όνομα και Τίτλο"
        : "⚠️ Please fill in at least Name and Title";
    showToast(msg, "error");
    return;
  }

  window.signatureHtml = buildSignatureHtml();

  if (previewBox) previewBox.innerHTML = window.signatureHtml;

  showStep(step2);
});

// Back Step 2 -> Step 1
backToStep1Btn?.addEventListener("click", () => {
  showStep(step1);
});

// ===========================
// Step 2 -> Step 3 (Platform)
// ===========================
toStep3Btn?.addEventListener("click", () => {
  // safety: if user somehow skipped build
  if (!window.signatureHtml) window.signatureHtml = buildSignatureHtml();
  showStep(step3);
});

// Back Step 3 -> Step 2
backToStep2Btn?.addEventListener("click", () => {
  showStep(step2);
});

backToStep3Btn?.addEventListener("click", () => {
  // Clear Step 4 content
  const container = document.getElementById("step4Content");
  if (container) container.innerHTML = "";

  // Reset platform selection completely
  window.selectedPlatform = null;
  platformCards.forEach((c) => c.classList.remove("selected"));
  if (toStep4Btn) toStep4Btn.disabled = true;

  // Go back to Step 3
  showStep(step3);
});

// ===========================
// Step 3 Platform selection
// ===========================
platformCards.forEach((card) => {
  card.addEventListener("click", () => {
    platformCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    window.selectedPlatform = card.dataset.platform;

    if (toStep4Btn) toStep4Btn.disabled = false;
  });
});

toStep4Btn?.addEventListener("click", () => {
  if (!window.selectedPlatform) return;

  // Πάντα χτίζουμε signatureHtml
  if (!window.signatureHtml) window.signatureHtml = buildSignatureHtml();

  showStep(step4);

  const t = translations[window.currentLang || "gr"];

  if (window.selectedPlatform === "outlook") {
    renderOutlookStep4(window.signatureHtml, t);
  }

  if (window.selectedPlatform === "thunderbird") {
    downloadHtmlFile(window.signatureHtml);
  }

  if (window.selectedPlatform === "monday") {
    copyToClipboard(window.signatureHtml);
  }
});

// ===========================
// Final action (depends on platform)
// ===========================
finishBtn?.addEventListener("click", () => {
  // Reset state
  window.selectedPlatform = null;
  window.signatureHtml = "";

  // Clear platform selections
  platformCards.forEach((c) => c.classList.remove("selected"));
  if (toStep4Btn) toStep4Btn.disabled = true;

  // Clear form
  document.getElementById("signatureForm").reset();
  updateToStep2State();

  // Clear Step 4 content
  const container = document.getElementById("step4Content");
  if (container) container.innerHTML = "";

  // Success toast
  showToast(
    window.currentLang === "gr"
      ? "🎉 Η διαδικασία ολοκληρώθηκε!"
      : "🎉 Completed!"
  );

  // Return to Step 1
  showStep(step1);
});

document.addEventListener("language-changed", () => {
  const step4El = document.getElementById("step4");
  const isVisible = step4El && step4El.offsetParent !== null;

  if (isVisible && window.selectedPlatform === "outlook") {
    if (!window.signatureHtml) window.signatureHtml = buildSignatureHtml();

    const t = translations[window.currentLang];
    renderOutlookStep4(window.signatureHtml, t);
  }
});

// ===========================
// Init
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // Default language
  window.currentLang = "gr";
  setLanguage("gr");

  // Δέσιμο DOM handlers
  bindDom({
    onLanguageChange: (lang) => setLanguage(lang),
  });

  console.log("App initialized ✅");
  console.log("Logo base64 preview:", logoBase64.slice(0, 50) + "...");
});
