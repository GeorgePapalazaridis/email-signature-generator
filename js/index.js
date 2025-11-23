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

// Buttons
const toStep2Btn = document.getElementById("toStep2Btn");
const toStep3Btn = document.getElementById("toStep3Btn");
const backToStep1Btn = document.getElementById("backToStep1");
const backToStep2Btn = document.getElementById("backToStep2");
const generateFinalBtn = document.getElementById("generateFinalBtn");

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
let selectedPlatform = null;
let signatureHtml = "";

// ===========================
// Helpers
// ===========================
function showStep(stepEl) {
  [step1, step2, step3].forEach((s) => {
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

  signatureHtml = buildSignatureHtml();

  if (previewBox) previewBox.innerHTML = signatureHtml;

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
  if (!signatureHtml) signatureHtml = buildSignatureHtml();
  showStep(step3);
});

// Back Step 3 -> Step 2
backToStep2Btn?.addEventListener("click", () => {
  showStep(step2);
});

// ===========================
// Step 3 Platform selection
// ===========================
platformCards.forEach((card) => {
  card.addEventListener("click", () => {
    platformCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedPlatform = card.dataset.platform;

    if (generateFinalBtn) generateFinalBtn.disabled = false;
  });
});

// ===========================
// Final action (depends on platform)
// ===========================
generateFinalBtn?.addEventListener("click", async () => {
  if (!selectedPlatform) return;

  const t = translations[window.currentLang || "gr"];
  if (!signatureHtml) signatureHtml = buildSignatureHtml();

  if (selectedPlatform === "outlook") {
    // create bookmarklet
    const js = makeBookmarklet(signatureHtml, t);

    // If you kept old container, fill it
    if (bookmarkletLink) bookmarkletLink.href = js;
    if (dragTextEl) dragTextEl.innerHTML = t.dragText;
    if (instructionEl) instructionEl.innerHTML = t.instruction;

    if (bookmarkletContainer) {
      bookmarkletContainer.style.display = "block";
      requestAnimationFrame(() => bookmarkletContainer.classList.add("show"));
      showToast(
        window.currentLang === "gr"
          ? "✅ Bookmarklet έτοιμο — σύρε το κουμπί στα bookmarks."
          : "✅ Bookmarklet ready — drag it to bookmarks."
      );
      bookmarkletContainer.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // fallback: copy bookmarklet to clipboard
    const ok = await copyToClipboard(js);
    showToast(
      ok
        ? window.currentLang === "gr"
          ? "✅ Bookmarklet αντιγράφηκε στο clipboard."
          : "✅ Bookmarklet copied to clipboard."
        : window.currentLang === "gr"
        ? "⚠️ Δεν μπόρεσα να το αντιγράψω — κάνε copy χειροκίνητα."
        : "⚠️ Could not copy — please copy manually.",
      ok ? "success" : "error"
    );
    return;
  }

  if (selectedPlatform === "thunderbird") {
    downloadHtmlFile(signatureHtml);
    showToast(
      window.currentLang === "gr"
        ? "✅ Κατέβηκε αρχείο HTML για import."
        : "✅ HTML file downloaded for import."
    );
    return;
  }

  if (selectedPlatform === "monday") {
    const ok = await copyToClipboard(signatureHtml);
    showToast(
      ok
        ? window.currentLang === "gr"
          ? "✅ Η υπογραφή αντιγράφηκε — κάνε paste στο Monday."
          : "✅ Signature copied — paste it into Monday."
        : window.currentLang === "gr"
        ? "⚠️ Δεν μπόρεσα να την αντιγράψω."
        : "⚠️ Could not copy signature.",
      ok ? "success" : "error"
    );
    return;
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
