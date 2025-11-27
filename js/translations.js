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
    helpLinkText: "📄 Οδηγίες βήμα-βήμα",
    helpLinkHref: "docs/Οδηγίες Εγκατάστασης Υπογραφής Email.pdf",
    previewTitle: "Προεπισκόπηση Υπογραφής",

    // Step subtitles
    step1Title: "Βήμα 1: Συμπλήρωση στοιχείων",
    step1Subtitle:
      "Συμπλήρωσε τα στοιχεία σου και πάτα «Δημιουργία Bookmarklet».",
    step2Title: "Βήμα 2: Προεπισκόπηση Υπογραφής",
    step2Subtitle: "Έλεγξε την υπογραφή σου πριν συνεχίσεις.",
    step3Title: "Βήμα 3: Επιλογή πλατφόρμας",
    step3Subtitle:
      "Επίλεξε την πλατφόρμα όπου θέλεις να εγκαταστήσεις την υπογραφή σου.",

    step4Title: "Βήμα 4: Εγκατάσταση",
    step4Subtitle:
      "Ακολούθησε τις παρακάτω οδηγίες για να εγκαταστήσεις την υπογραφή σου στην επιλεγμένη πλατφόρμα.",

    // === PLATFORM CARDS ===
    platformOutlookTitle: "Microsoft Outlook",
    platformOutlookDesc: "Αυτόματη εισαγωγή υπογραφής μέσω Bookmarklet.",

    platformThunderbirdTitle: "Thunderbird",
    platformThunderbirdDesc: "Λήψη αρχείου .html για import.",

    platformMondayTitle: "Monday.com",
    platformMondayDesc: "Copy–Paste HTML υπογραφής.",

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

    thunderbird_step_title: "Εγκατάσταση στο Thunderbird",
    thunderbird_step_instructions:
      "Ακολούθησε τα παρακάτω βήματα για να εισάγεις την υπογραφή σου στο Thunderbird:",

    th_step1: "Κατέβασε το αρχείο της υπογραφής",
    th_step2: "Άνοιξε το Thunderbird",
    th_step3: "Πήγαινε: Ρυθμίσεις → Ρυθμίσεις Λογαριασμού",
    th_step4: "Ενεργοποίησε: «Επισύναψη υπογραφής από αρχείο (text, HTML)»",
    th_step5: "Πάτησε “Choose…” και επίλεξε το αρχείο που κατέβασες",
    th_step6: "Πάτησε OK για αποθήκευση",

    download_button_label: "Κατέβασμα HTML Αρχείου",
    download_success: "Το αρχείο HTML κατέβηκε!",

    monday_step_title: "Εγκατάσταση σε Monday.com",
    monday_step_instructions:
      "Ακολούθησε τα παρακάτω βήματα για να επικολλήσεις την υπογραφή σου στα emails του Monday.com:",
    monday_step_note1: "Άνοιξε Emails & Activities",
    monday_step_note2: "Πάτησε 'Compose Email'",
    monday_step_note3: "Κάνε επικόλληση (⌘+V / Ctrl+V) της υπογραφής",
    monday_copy_btn_label: "Αντιγραφή HTML Υπογραφής",

    monday_modal_title: "HTML υπογραφής για Monday.com",
    monday_modal_description:
      "Αυτός είναι ο HTML κώδικας που θα κάνεις επικόλληση στο Monday.com. Πάτησε «Copy» για να τον αντιγράψεις στο clipboard.",
    monday_modal_copy_btn: "Copy HTML",
    monday_copy_success: "✂️ Το HTML της υπογραφής αντιγράφηκε!",

    finished_thanks:
      "🎉 Ευχαριστούμε που χρησιμοποίησες τον Signature Generator!",
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
    helpLinkText: "📄 Installation guide",
    helpLinkHref: "docs/Οδηγίες Εγκατάστασης Υπογραφής Email.pdf",
    previewTitle: "Signature Preview",

    // Step subtitles
    step1Title: "Step 1: Fill in your details",
    step1Subtitle: "Fill in your details and click “Generate Bookmarklet”.",
    step2Title: "Step 2: Signature Preview",
    step2Subtitle: "Review your signature before continuing.",
    step3Title: "Step 3: Choose platform",
    step3Subtitle:
      "Choose the platform where you want to install your signature.",
    step4Title: "Step 4: Installation",
    step4Subtitle:
      "Follow the instructions below to correctly install your signature on the selected platform.",

    // === PLATFORM CARDS ===
    platformOutlookTitle: "Microsoft Outlook",
    platformOutlookDesc: "Automatic signature insertion via Bookmarklet.",

    platformThunderbirdTitle: "Thunderbird",
    platformThunderbirdDesc: "Download .html file for import.",

    platformMondayTitle: "Monday.com",
    platformMondayDesc: "Copy–Paste the HTML signature.",

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

    thunderbird_step_title: "Install in Thunderbird",
    thunderbird_step_instructions:
      "Follow the steps below to import your signature into Thunderbird:",

    th_step1: "Download signature file using the button below",
    th_step2: "Open Thunderbird",
    th_step3: "Go to: Settings → Account Settings",
    th_step4: "Enable: “Attach signature from a file (text, HTML)”",
    th_step5: "Click “Choose…” and select the downloaded file",
    th_step6: "Click OK to save changes",

    download_button_label: "Download HTML File",
    download_success: "HTML file downloaded!",

    monday_step_title: "Install in Monday.com",
    monday_step_instructions:
      "Follow the steps below to easily paste your signature inside Monday.com emails:",
    monday_step_note1: "Open Emails & Activities",
    monday_step_note2: "Click 'Compose Email'",
    monday_step_note3: "Paste your signature (⌘+V / Ctrl+V)",
    monday_copy_btn_label: "Copy Signature HTML",

    monday_modal_title: "HTML signature for Monday.com",
    monday_modal_description:
      "This is the HTML code you will paste into Monday.com. Click “Copy” to copy it to your clipboard.",
    monday_modal_copy_btn: "Copy HTML",
    monday_copy_success: "✂️ Signature HTML copied!",

    finished_thanks: "🎉 Thank you for using the Signature Generator!",
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

  const step2Title = document.querySelector("#step2Title");
  if (step2Title) step2Title.textContent = t.step2Title;

  const step3Title = document.querySelector("#step3Title");
  if (step3Title) step3Title.textContent = t.step3Title;

  const step4Title = document.getElementById("step4Title");
  if (step4Title) step4Title.textContent = t.step4Title;

  const step1Subtitle = document.getElementById("step1Subtitle");
  if (step1Subtitle) step1Subtitle.textContent = t.step1Subtitle;

  const step2Subtitle = document.getElementById("step2Subtitle");
  if (step2Subtitle) step2Subtitle.textContent = t.step2Subtitle;

  const step3Subtitle = document.getElementById("step3Subtitle");
  if (step3Subtitle) step3Subtitle.textContent = t.step3Subtitle;

  const step4Subtitle = document.getElementById("step4Subtitle");
  if (step4Subtitle) step4Subtitle.textContent = t.step4Subtitle;

  const previewTitle = document.getElementById("previewTitle");
  if (previewTitle) previewTitle.textContent = t.previewTitle;

  // === FORM LABELS ===
  const labelName = document.getElementById("labelName");
  if (labelName) labelName.textContent = t.name;

  const labelTitle = document.getElementById("labelTitle");
  if (labelTitle) labelTitle.textContent = t.title;

  const labelAddress = document.getElementById("labelAddress");
  if (labelAddress) labelAddress.textContent = t.address;

  const labelMobile = document.getElementById("labelMobile");
  if (labelMobile) labelMobile.textContent = t.mobile;

  const labelPhone = document.getElementById("labelPhone");
  if (labelPhone) labelPhone.textContent = t.phone;

  // === FORM PLACEHOLDERS ===
  const nameInput = document.getElementById("name");
  if (nameInput) nameInput.placeholder = t.namePlaceholder;

  const titleInput = document.getElementById("title");
  if (titleInput) titleInput.placeholder = t.titlePlaceholder;

  const addressInput = document.getElementById("address");
  if (addressInput) addressInput.placeholder = t.address;

  const mobileInput = document.getElementById("mobile");
  if (mobileInput) mobileInput.placeholder = t.mobilePlaceholder;

  const phoneInput = document.getElementById("phone");
  if (phoneInput) phoneInput.placeholder = t.phone;

  document.getElementById("outlookTitle").textContent = t.platformOutlookTitle;
  document.getElementById("outlookDesc").textContent = t.platformOutlookDesc;

  document.getElementById("thunderTitle").textContent =
    t.platformThunderbirdTitle;
  document.getElementById("thunderDesc").textContent =
    t.platformThunderbirdDesc;

  document.getElementById("mondayTitle").textContent = t.platformMondayTitle;
  document.getElementById("mondayDesc").textContent = t.platformMondayDesc;

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

  // === Buttons ===
  const generateBtn = document.getElementById("generateBtn");
  if (generateBtn) generateBtn.textContent = t.button;

  document.getElementById("toStep2Btn").textContent = t.next;
  document.getElementById("toStep3Btn").textContent = t.continue;
  document.getElementById("toStep4Btn").textContent = t.continue;
  document.getElementById("backToStep1").textContent = t.back;
  document.getElementById("backToStep2").textContent = t.back;
  document.getElementById("backToStep3").textContent = t.returnToPlatforms;
  document.getElementById("finishBtn").textContent = t.finish;

  // === BOOKMARKLET SECTION ===
  const dragTextEl = document.getElementById("dragText");
  if (dragTextEl) dragTextEl.innerHTML = t.dragText;

  const instructionEl = document.getElementById("instructionText");
  if (instructionEl) instructionEl.innerHTML = t.instruction;

  const bookmarkletLink = document.getElementById("bookmarklet");
  if (bookmarkletLink) {
    bookmarkletLink.textContent = t.bookmarkletLabel;
    bookmarkletLink.setAttribute("data-tooltip", t.bookmarkletTooltip);
  }

  // === STATE ===
  window.currentLang = translations[lang] ? lang : "en";

  // Re-render Step 4 if needed
  document.dispatchEvent(new CustomEvent("language-changed"));
}
