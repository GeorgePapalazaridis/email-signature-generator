import { logoBase64 } from "../assets/base64/logo-base64.js";
import { translations, setLanguage } from "./translations.js";
import { buildSignature } from "./signature-template.js";
import { bindDom } from "./dom-bindings.js";

// ===========================
// STEP NAV + VALIDATION (Step 1)
// ===========================
const step1Section = document.getElementById("step1Section");
const step2Section = document.getElementById("step2Section");

const nextBtn = document.getElementById("nextBtn");
const backToStep1Btn = document.getElementById("backToStep1Btn");

const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");

// required τώρα = name + title (όπως ήδη είχες validation)
function step1IsValid() {
  return (
    nameInput.value.trim().length > 0 && titleInput.value.trim().length > 0
  );
}

function updateNextButtonState() {
  nextBtn.disabled = !step1IsValid();
}

// listeners για live enable/disable)
[nameInput, titleInput].forEach((el) => {
  el.addEventListener("input", updateNextButtonState);
});

updateNextButtonState(); // αρχική κατάσταση

nextBtn.addEventListener("click", () => {
  if (!step1IsValid()) return;

  step1Section.style.display = "none";
  step2Section.style.display = "block";
  step2Section.scrollIntoView({ behavior: "smooth", block: "start" });
});

backToStep1Btn.addEventListener("click", () => {
  step2Section.style.display = "none";
  step1Section.style.display = "block";
  step1Section.scrollIntoView({ behavior: "smooth", block: "start" });
});

// ===========================
// STEP 2 — Platform selection
// ===========================
let selectedPlatform = null;
const platformCards = document.querySelectorAll(".platform-card");
const step2ContinueBtn = document.getElementById("step2ContinueBtn"); // FIXED

platformCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Clear previous selection
    platformCards.forEach((c) => c.classList.remove("selected"));

    // Set new selection
    card.classList.add("selected");
    selectedPlatform = card.dataset.platform;

    // Enable continue
    step2ContinueBtn.disabled = false;
  });
});

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

// === Helper: Toast notifications ===
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

// === Κύρια λειτουργία ===
export function generate() {
  const t = translations[window.currentLang || "gr"];

  // === DOM refs ===
  const resultSection = document.getElementById("resultSection");
  const previewSection = document.getElementById("preview-section");
  const previewBox = document.getElementById("preview-box");
  const bookmarkletContainer = document.getElementById("bookmarklet-container");
  const link = document.getElementById("bookmarklet");
  const btn = document.getElementById("generateBtn");

  // === Field values ===
  const name = document.getElementById("name").value.trim();
  const title = document.getElementById("title").value.trim();
  const address =
    document.getElementById("address").value ||
    "Farsalon 153, Larissa, 41335 - Greece";
  const mobile = document.getElementById("mobile").value.trim();
  const phone =
    document.getElementById("phone").value.trim() || "+30 2410 623 922";

  // === Reset view ===
  if (previewBox) previewBox.innerHTML = "";
  if (previewSection) previewSection.style.display = "none";
  if (bookmarkletContainer) {
    bookmarkletContainer.classList.remove("show");
    bookmarkletContainer.style.display = "none";
  }
  if (resultSection) {
    resultSection.classList.remove("show");
    resultSection.style.display = "none";
  }

  // === Validation ===
  if (!name || !title) {
    const msg =
      window.currentLang === "gr"
        ? "⚠️ Συμπλήρωσε τουλάχιστον Όνομα και Τίτλο"
        : "⚠️ Please fill in at least Name and Title";
    showToast(msg, "error");
    return;
  }

  // === Loader state στο κουμπί ===
  const oldText = btn.textContent;
  btn.disabled = true;
  btn.classList.add("loading");
  btn.textContent =
    window.currentLang === "gr" ? "Δημιουργία..." : "Generating...";

  // === Ελαφρύ delay για UX feedback ===
  setTimeout(() => {
    // === Build signature ===
    const signature = buildSignature({
      name,
      title,
      address,
      phone,
      mobile,
      logoBase64,
    });

    // === Make bookmarklet ===
    const js = makeBookmarklet(signature, t);
    if (link) link.href = js;

    // === Show results ===
    if (previewBox) previewBox.innerHTML = signature;
    if (previewSection) previewSection.style.display = "block";

    // === Show parent section ===
    if (resultSection) {
      resultSection.style.display = "block";
      requestAnimationFrame(() => resultSection.classList.add("show"));
    }

    // === Fade-in bookmarklet ===
    if (bookmarkletContainer) {
      bookmarkletContainer.style.display = "block";
      requestAnimationFrame(() => bookmarkletContainer.classList.add("show"));
    }

    // === Smooth scroll στο αποτέλεσμα ===
    setTimeout(() => {
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);

    // === Restore κουμπί ===
    setTimeout(() => {
      btn.disabled = false;
      btn.classList.remove("loading");
      // === Toast message ===
      const msg =
        window.currentLang === "gr"
          ? "✅ Η υπογραφή δημιουργήθηκε επιτυχώς!"
          : "✅ Signature generated successfully!";
      showToast(msg);

      btn.textContent = oldText;
    }, 800);
  }, 200);
}

// === Αρχικοποίηση εφαρμογής ===
document.addEventListener("DOMContentLoaded", () => {
  // Default language
  window.currentLang = "gr";
  setLanguage("gr");

  // Δέσιμο DOM handlers
  bindDom({
    onGenerate: generate,
    onLanguageChange: (lang) => setLanguage(lang),
  });

  console.log("App initialized ✅");
  console.log("Logo base64 preview:", logoBase64.slice(0, 50) + "...");
});
