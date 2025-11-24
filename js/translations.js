// ===============================
// 🌐 Translations – Prognosis Signature Generator
// ===============================

export const translations = {
  gr: {
    // === FORM LABELS ===
    name: "Ονοματεπώνυμο",
    namePlaceholder: "π.χ. George Papalazaridis",
    title: "Θέση / Τίτλος",
    titlePlaceholder: "π.χ. Front End Angular Developer",
    phone: "Σταθερό τηλέφωνο",
    address: "Διεύθυνση",
    mobile: "Κινητό",
    mobilePlaceholder: "π.χ. +30 6987 331 449",

    // === BUTTONS & MESSAGES ===
    button: "Δημιουργία Bookmarklet",
    alertMissing: "Συμπλήρωσε τουλάχιστον όνομα και τίτλο",
    success: "✅ Το signature προστέθηκε!",
    notFound:
      "⚠️ Δεν βρέθηκε ο editor. Άνοιξε Ρυθμίσεις → Mail → Compose & reply → Email signature.",

    // === HEADINGS ===
    heading: "Prognosis Email Signature Generator",
    step1Title: "Βήμα 1: Συμπλήρωση στοιχείων",
    step2Title: "Βήμα 2: Προεπισκόπηση Υπογραφής",
    step1Subtitle:
      "Συμπλήρωσε τα στοιχεία σου και πάτα «Δημιουργία Bookmarklet».",
    step2Subtitle:
      "Έλεγξε την υπογραφή σου πριν προχωρήσεις στη μέθοδο εγκατάστασης.",

    // === HELP LINK ===
    helpLinkText: "📄 Οδηγίες βήμα-βήμα",
    helpLinkHref: "docs/Οδηγίες Εγκατάστασης Υπογραφής Email.pdf",
    previewTitle: "Προεπισκόπηση Υπογραφής",

    // === BOOKMARKLET SECTION ===
    dragText:
      "Αν όλα εμφανίζονται σωστά παραπάνω, <strong>σύρε το παρακάτω κουμπί</strong> στη μπάρα των σελιδοδεικτών σου:",
    instruction:
      "➡️ Στη συνέχεια, άνοιξε το <strong>Outlook Web</strong> (Ρυθμίσεις → Υπογραφές) και πάτησε το bookmark για να προστεθεί αυτόματα η υπογραφή σου.",
    bookmarkletTooltip: "Σύρε αυτό το κουμπί στη μπάρα των σελιδοδεικτών σου",

    outlook_step1_title:
      "Σύρε το bookmarklet 'Δημιουργία Υπογραφής' στη μπάρα σελιδοδεικτών",
    outlook_step1_note_intro:
      "Αν δεν εμφανίζεται η μπάρα σελιδοδεικτών στον browser σου:",
    outlook_step1_note_mac: "• Σε macOS: Menu → View → Show Bookmarks Bar",
    outlook_step1_note_win:
      "• Σε Windows: πάτα Ctrl + Shift + B για να την εμφανίσεις",

    outlook_step2_title: "Άνοιξε το Outlook Web",
    outlook_open_button: "Άνοιγμα Outlook Web",
    outlook_step3_title: "Πήγαινε: Ρυθμίσεις → Λογαριασμός → Υπογραφές",
    outlook_step3_text:
      "Δημιούργησε νέα υπογραφή και κάνε κλικ μέσα στο πεδίο κειμένου.",
    outlook_step4_title: "Πάτα το bookmarklet",
    outlook_step4_text:
      "Κάνε κλικ στο bookmarklet “Δημιουργία Υπογραφής” που αποθήκευσες προηγουμένως. Η υπογραφή θα προστεθεί αυτόματα στο πεδίο.",
    bookmarkletLabel: "Δημιουργία Υπογραφής",

    next: "Επόμενο",
    back: "Πίσω",
    continue: "Συνέχεια",
    finish: "Τέλος",
    returnToPlatforms: "Επιστροφή στις πλατφόρμες",
  },

  en: {
    // === FORM LABELS ===
    name: "Full Name",
    namePlaceholder: "e.g. George Papalazaridis",
    title: "Job Title",
    titlePlaceholder: "e.g. Front End Angular Developer",
    phone: "Office Phone",
    address: "Address",
    mobile: "Mobile",
    mobilePlaceholder: "e.g. +30 6987 331 449",

    // === BUTTONS & MESSAGES ===
    button: "Generate Bookmarklet",
    alertMissing: "Please fill in at least your name and title",
    success: "✅ Signature inserted successfully!",
    notFound:
      "⚠️ Editor not found. Open Settings → Mail → Compose & reply → Email signature.",

    // === HEADINGS ===
    heading: "Prognosis Email Signature Generator",
    step1Title: "Step 1: Fill in your details",
    step2Title: "Step 2: Signature preview",
    step1Subtitle: "Fill in your details and click “Generate Bookmarklet”.",
    step2Subtitle:
      "Review your signature before choosing an installation method.",

    // === HELP LINK ===
    helpLinkText: "📄 Installation guide",
    helpLinkHref: "docs/Οδηγίες Εγκατάστασης Υπογραφής Email.pdf",
    previewTitle: "Signature Preview",

    // === BOOKMARKLET SECTION ===
    dragText:
      "If everything looks correct above, <strong>drag the button below</strong> to your bookmarks bar:",
    instruction:
      "➡️ Then open <strong>Outlook Web</strong> (Settings → Signatures) and click the bookmark to insert your signature automatically.",
    bookmarkletTooltip: "Drag this button to your bookmarks bar",

    outlook_step1_title:
      "Drag the “Generate Signature” bookmarklet to your bookmarks bar",
    outlook_step1_note_intro: "If your browser’s bookmarks bar is not visible:",
    outlook_step1_note_mac: "• On macOS: Menu → View → Show Bookmarks Bar",
    outlook_step1_note_win: "• On Windows: press Ctrl + Shift + B to show it",

    outlook_step2_title: "Open Outlook Web",
    outlook_open_button: "Open Outlook Web",
    outlook_step3_title: "Go to: Settings → Account → Signatures",
    outlook_step3_text:
      "Create a new signature and click inside the editor box.",
    outlook_step4_title: "Click the bookmarklet",
    outlook_step4_text:
      "Click the “Generate Signature” bookmarklet you saved earlier. The signature will be inserted automatically.",
    bookmarkletLabel: "Generate Signature",

    next: "Next",
    back: "Back",
    continue: "Continue",
    finish: "Finish",
    returnToPlatforms: "Return to platforms",
  },
};

// ===============================
// 🔧 Language Switcher
// ===============================
export function setLanguage(lang) {
  const t = translations[lang] || translations["en"];
  if (!t) return;

  // === HEADINGS ===
  const titleHeading = document.getElementById("titleHeading");
  if (titleHeading) titleHeading.textContent = t.heading;

  const step1Header = document.querySelector("#step1 .step-header");
  if (step1Header) step1Header.textContent = t.step1Title;

  const step2TitleEl = document.querySelector("#step2Title");
  if (step2TitleEl) step2TitleEl.textContent = t.step2Title;

  const step1Subtitle = document.getElementById("step1Subtitle");
  if (step1Subtitle) step1Subtitle.textContent = t.step1Subtitle;

  const step2Subtitle = document.getElementById("step2Subtitle");
  if (step2Subtitle) step2Subtitle.textContent = t.step2Subtitle;

  const previewTitle = document.getElementById("previewTitle");
  if (previewTitle) previewTitle.textContent = t.previewTitle;

  // Help link
  const helpLink = document.getElementById("helpLink");
  if (helpLink) {
    helpLink.textContent = t.helpLinkText;
    helpLink.href = t.helpLinkHref;
    helpLink.setAttribute(
      "aria-label",
      lang === "gr"
        ? "Άνοιγμα αρχείου PDF με οδηγίες εγκατάστασης σε νέο παράθυρο"
        : "Open PDF installation guide in a new tab"
    );
  }

  // Second help link (below preview)
  const helpLinkAfter = document.getElementById("helpLinkAfter");
  if (helpLinkAfter) {
    helpLinkAfter.textContent = t.helpLinkText;
    helpLinkAfter.href = t.helpLinkHref;
    helpLinkAfter.setAttribute(
      "aria-label",
      lang === "gr"
        ? "Άνοιγμα αρχείου PDF με οδηγίες εγκατάστασης σε νέο παράθυρο"
        : "Open PDF installation guide in a new tab"
    );
  }

  // === FORM LABELS ===
  document.getElementById("labelName").textContent = t.name;
  document.getElementById("labelTitle").textContent = t.title;

  document.getElementById("labelAddress").textContent = t.address;
  document.getElementById("labelPhone").textContent = t.phone;
  document.getElementById("labelMobile").textContent = t.mobile;
  document.getElementById("mobile").placeholder = t.mobilePlaceholder;

  document.getElementById("step1Header").textContent = t.step1Title;

  document.getElementById("toStep2Btn").textContent = t.next;
  document.getElementById("toStep3Btn").textContent = t.continue;
  document.getElementById("toStep4Btn").textContent = t.continue;

  document.getElementById("backToStep1").textContent = t.back;
  document.getElementById("backToStep2").textContent = t.back;
  document.getElementById("backToStep3").textContent = t.returnToPlatforms;

  document.getElementById("finishBtn").textContent = t.finish;

  // === BUTTON ===
  const generateBtn = document.getElementById("generateBtn");
  if (generateBtn) generateBtn.textContent = t.button;

  // === BOOKMARKLET SECTION ===
  const dragTextEl = document.getElementById("dragText");
  const instructionEl = document.getElementById("instructionText");
  const bookmarkletLink = document.getElementById("bookmarklet");

  if (dragTextEl) dragTextEl.innerHTML = t.dragText;
  if (instructionEl) instructionEl.innerHTML = t.instruction;

  if (bookmarkletLink) {
    bookmarkletLink.textContent = t.bookmarkletLabel;
    bookmarkletLink.setAttribute("data-tooltip", t.bookmarkletTooltip);
  }

  // === STATE ===
  window.currentLang = translations[lang] ? lang : "en";

  // Signal to index.js that language changed
  document.dispatchEvent(new CustomEvent("language-changed"));
}
