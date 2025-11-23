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
    subtitle: "Συμπλήρωσε τα στοιχεία σου και πάτα «Δημιουργία Bookmarklet».",
    helpLinkText: "📄 Χρειάζεσαι βοήθεια; Δες τις οδηγίες βήμα-βήμα",
    helpLinkHref: "docs/Οδηγίες Εγκατάστασης Υπογραφής Email.pdf",
    previewTitle: "Προεπισκόπηση Υπογραφής",

    // === BOOKMARKLET SECTION ===
    dragText:
      "Αν όλα εμφανίζονται σωστά παραπάνω, <strong>σύρε το παρακάτω κουμπί</strong> στη μπάρα των σελιδοδεικτών σου:",
    instruction:
      "➡️ Στη συνέχεια, άνοιξε το <strong>Outlook Web</strong> (Ρυθμίσεις → Υπογραφές) και πάτησε το bookmark για να προστεθεί αυτόματα η υπογραφή σου.",
    bookmarkletLabel: "Prognosis Υπογραφή",
    bookmarkletTooltip: "Σύρε αυτό το κουμπί στη μπάρα των σελιδοδεικτών σου",
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
    subtitle: "Fill in your details and click “Generate Bookmarklet”.",
    helpLinkText: "📄 Need help? Open the step-by-step installation guide",
    helpLinkHref: "docs/Οδηγίες Εγκατάστασης Υπογραφής Email.pdf",
    previewTitle: "Signature Preview",

    // === BOOKMARKLET SECTION ===
    dragText:
      "If everything looks correct above, <strong>drag the button below</strong> to your bookmarks bar:",
    instruction:
      "➡️ Then open <strong>Outlook Web</strong> (Settings → Signatures) and click the bookmark to insert your signature automatically.",
    bookmarkletLabel: "Prognosis Signature",
    bookmarkletTooltip: "Drag this button to your bookmarks bar",
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

  const subtitleText = document.getElementById("subtitleText");
  if (subtitleText) subtitleText.textContent = t.subtitle;

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

  // === BUTTON ===
  const generateBtn = document.getElementById("generateBtn");
  if (generateBtn) generateBtn.textContent = t.button;

  // === BOOKMARKLET SECTION ===
  const dragTextEl = document.getElementById("dragText");
  const instructionEl = document.getElementById("instructionText");
  const bookmarkletLink = document.getElementById("bookmarklet");
  if (bookmarkletLink) {
    bookmarkletLink.textContent = t.bookmarkletLabel;
    bookmarkletLink.setAttribute("data-tooltip", t.bookmarkletTooltip);
  }

  // 🩵 Πλήρης ενημέρωση και σε αρχικό load
  if (dragTextEl) dragTextEl.innerHTML = t.dragText;
  if (instructionEl) instructionEl.innerHTML = t.instruction;
  if (bookmarkletLink) bookmarkletLink.textContent = t.bookmarkletLabel;

  // === STATE ===
  window.currentLang = translations[lang] ? lang : "en";
}
