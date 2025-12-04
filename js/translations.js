import { setText, setPlaceholder } from "./utils/dom-utils.js";

// ===============================
// 🌐 Translations – Prognosis Signature Generator
// ===============================
export const translations = {
  gr: {
    //
    // 🏷️ FORM LABELS
    //
    form: {
      name: "Ονοματεπώνυμο",
      namePlaceholder: "π.χ. George Papalazaridis",
      title: "Θέση / Τίτλος",
      titlePlaceholder: "π.χ. Front End Angular Developer",
      phone: "Σταθερό τηλέφωνο",
      mobile: "Κινητό",
      mobilePlaceholder: "π.χ. +30 6987 331 449",
      address: "Διεύθυνση",

      alertMissing: "⚠️ Συμπλήρωσε τουλάχιστον Όνομα και Τίτλο",
    },

    //
    // 🔹 GLOBAL BUTTONS
    //
    buttons: {
      next: "Επόμενο",
      back: "Πίσω",
      continue: "Συνέχεια",
      finish: "Τέλος",
      returnToPlatforms: "Επιστροφή στις πλατφόρμες",
      copyHtml: "Αντιγραφή HTML",
      copyHtmlOutlook: "Αντιγραφή HTML Υπογραφής",
    },

    //
    // ✨ STEP HEADERS / SUBTITLES
    //
    steps: {
      step1Title: "Βήμα 1: Συμπλήρωση στοιχείων",
      step1Subtitle:
        "Συμπλήρωσε τα στοιχεία σου για να δημιουργήσουμε την υπογραφή.",

      step2Title: "Βήμα 2: Προεπισκόπηση Υπογραφής",
      step2Subtitle: "Έλεγξε την υπογραφή σου πριν συνεχίσεις.",

      step3Title: "Βήμα 3: Επιλογή πλατφόρμας",
      step3Subtitle:
        "Επίλεξε την πλατφόρμα όπου θέλεις να εγκαταστήσεις την υπογραφή σου.",

      step4Title: "Βήμα 4: Εγκατάσταση",
      step4Subtitle:
        "Ακολούθησε τις παρακάτω οδηγίες για να ολοκληρώσεις την εγκατάσταση.",
    },

    //
    // 🪟 PLATFORM TITLES & DESCRIPTIONS
    //
    platforms: {
      outlook: {
        title: "Microsoft Outlook",
        desc: "Εισαγωγή υπογραφής ως εικόνα για τέλεια απεικόνιση στο Outlook.",
      },
      thunderbird: {
        title: "Thunderbird",
        desc: "Λήψη αρχείου .html για import.",
      },
      monday: {
        title: "Monday.com",
        desc: "Copy–Paste HTML υπογραφής.",
      },
    },

    //
    // 💾 OUTLOOK WEB FLOW
    //
    outlook: {
      step1: "Πάτησε «Αντιγραφή Υπογραφής».",
      step2:
        "Άνοιξε Outlook → Ρυθμίσεις → Compose and Reply → Email Signature.",
      step3: "Κάνε επικόλληση με Ctrl+V (Windows) ή Cmd+V (Mac).",

      previewLabel: "Προεπισκόπηση Υπογραφής",
      copyHtmlButton: "Αντιγραφή Υπογραφής",
      openOutlook: "Άνοιγμα Outlook Web",
    },

    //
    // 📨 THUNDERBIRD FLOW
    //
    thunderbird: {
      step1: "Κατέβασε το αρχείο της υπογραφής",
      step2: "Άνοιξε το Thunderbird",
      step3: "Πήγαινε: Ρυθμίσεις → Ρυθμίσεις Λογαριασμού",
      step4: "Ενεργοποίησε: «Επισύναψη υπογραφής από αρχείο (text, HTML)»",
      step5: "Πάτησε “Choose…” και επίλεξε το αρχείο που κατέβασες",
      step6: "Πάτησε OK για αποθήκευση",

      download: "Κατέβασμα HTML Αρχείου",
      downloadSuccess: "Το αρχείο HTML κατέβηκε!",
    },

    //
    // ☁ Monday.com FLOW
    //
    monday: {
      stepTitle: "Εγκατάσταση σε Monday.com",
      stepInstructions:
        "Ακολούθησε τα παρακάτω βήματα για να επικολλήσεις την υπογραφή σου:",
      stepNote1: "Άνοιξε Emails & Activities",
      stepNote2: "Πάτησε 'Compose Email'",
      stepNote3: "Κάνε επικόλληση (⌘+V / Ctrl+V) της υπογραφής",
      copyBtn: "Αντιγραφή HTML Υπογραφής",

      modalTitle: "HTML υπογραφής για Monday.com",
      modalDescription:
        "Πάτησε «Copy» για να αντιγράψεις τον HTML κώδικα στο clipboard.",
      copySuccess: "✂️ Το HTML της υπογραφής αντιγράφηκε!",
    },

    //
    // 🎉 SUCCESS
    //
    success: {
      installDone:
        "🎉 Ευχαριστούμε που χρησιμοποίησες τον Signature Generator!",
      copied: "Υπογραφή αντιγράφηκε!",
      fallbackCopy: "Αντιγραφή μέσω fallback!",
    },

    //
    // 🧭 OTHER HEADERS
    //
    heading: "Prognosis Email Signature Generator",
    previewTitle: "Προεπισκόπηση Υπογραφής",
  },

  en: {
    //
    // 🏷️ FORM LABELS
    //
    form: {
      name: "Full Name",
      namePlaceholder: "e.g. George Papalazaridis",
      title: "Job Title",
      titlePlaceholder: "e.g. Front End Angular Developer",
      phone: "Office Phone",
      mobile: "Mobile",
      mobilePlaceholder: "e.g. +30 6987 331 449",
      address: "Address",

      alertMissing: "⚠️ Please fill in at least Name and Job Title",
    },

    //
    // 🔹 GLOBAL BUTTONS
    //
    buttons: {
      next: "Next",
      back: "Back",
      continue: "Continue",
      finish: "Finish",
      returnToPlatforms: "Return to platforms",
      copyHtml: "Copy HTML",
      copyHtmlOutlook: "Copy Signature HTML",
    },

    //
    // ✨ STEP HEADERS / SUBTITLES
    //
    steps: {
      step1Title: "Step 1: Fill in your details",
      step1Subtitle: "Fill in your information to generate your signature.",

      step2Title: "Step 2: Signature Preview",
      step2Subtitle: "Review your signature before continuing.",

      step3Title: "Step 3: Choose platform",
      step3Subtitle:
        "Select the platform where you want to install your signature.",

      step4Title: "Step 4: Installation",
      step4Subtitle: "Follow the instructions below to complete installation.",
    },

    //
    // 🪟 PLATFORM TITLES & DESCRIPTIONS
    //
    platforms: {
      outlook: {
        title: "Microsoft Outlook",
        desc: "Insert signature as an image for perfect visual accuracy in Outlook.",
      },
      thunderbird: {
        title: "Thunderbird",
        desc: "Download .html file for import.",
      },
      monday: {
        title: "Monday.com",
        desc: "Copy–Paste signature HTML.",
      },
    },

    //
    // 💾 OUTLOOK WEB FLOW
    //
    outlook: {
      step1: "Click “Copy Signature”.",
      step2: "Open Outlook → Settings → Compose and Reply → Email Signature.",
      step3: "Paste with Ctrl+V (Windows) or Cmd+V (Mac).",

      previewLabel: "Signature Preview",
      copyHtmlButton: "Copy Signature",
      openOutlook: "Open Outlook Web",
    },

    //
    // 📨 THUNDERBIRD FLOW
    //
    thunderbird: {
      step1: "Download the signature file using the button below",
      step2: "Open Thunderbird",
      step3: "Go to: Settings → Account Settings",
      step4: "Enable: “Attach signature from a file (text, HTML)”",
      step5: "Click “Choose…” and select the downloaded file",
      step6: "Click OK to save changes",

      download: "Download HTML File",
      downloadSuccess: "HTML file downloaded!",
    },

    //
    // ☁ Monday.com FLOW
    //
    monday: {
      stepTitle: "Install in Monday.com",
      stepInstructions: "Follow the steps below to paste your signature:",

      stepNote1: "Open Emails & Activities",
      stepNote2: "Click ‘Compose Email’",
      stepNote3: "Paste your signature (⌘+V / Ctrl+V)",

      copyBtn: "Copy Signature HTML",

      modalTitle: "HTML signature for Monday.com",
      modalDescription:
        "Click “Copy” to copy the HTML signature to your clipboard.",

      copySuccess: "✂️ Signature HTML copied!",
    },

    //
    // 🎉 SUCCESS MESSAGES
    //
    success: {
      installDone: "🎉 Thank you for using the Signature Generator!",
      copied: "Signature copied!",
      fallbackCopy: "Copy fallback executed!",
    },

    //
    // 🧭 OTHER HEADERS
    //
    heading: "Prognosis Email Signature Generator",
    previewTitle: "Signature Preview",
  },
};

// ===============================
// 🔧 Language Switcher
// ===============================
export function setLanguage(lang) {
  const t = translations[lang] || translations["en"];
  if (!t) return;

  //
  // 🧭 HEADINGS & SUBTITLES
  //
  setText("titleHeading", t.heading);

  setText("step1Header", t.steps.step1Title);
  setText("step2Title", t.steps.step2Title);
  setText("step3Title", t.steps.step3Title);
  setText("step4Title", t.steps.step4Title);

  setText("step1Subtitle", t.steps.step1Subtitle);
  setText("step2Subtitle", t.steps.step2Subtitle);
  setText("step3Subtitle", t.steps.step3Subtitle);
  setText("step4Subtitle", t.steps.step4Subtitle);

  //
  // 🏷️ FORM LABELS
  //
  setText("labelName", t.form.name);
  setText("labelTitle", t.form.title);
  setText("labelAddress", t.form.address);
  setText("labelMobile", t.form.mobile);
  setText("labelPhone", t.form.phone);

  //
  // ✍️ FORM PLACEHOLDERS
  //
  setPlaceholder("name", t.form.namePlaceholder);
  setPlaceholder("title", t.form.titlePlaceholder);
  setPlaceholder("address", t.form.address);
  setPlaceholder("mobile", t.form.mobilePlaceholder);
  setPlaceholder("phone", t.form.phone);

  //
  // 🪟 PLATFORM CARDS
  //
  setText("outlookTitle", t.platforms.outlook.title);
  setText("outlookDesc", t.platforms.outlook.desc);

  setText("thunderTitle", t.platforms.thunderbird.title);
  setText("thunderDesc", t.platforms.thunderbird.desc);

  setText("mondayTitle", t.platforms.monday.title);
  setText("mondayDesc", t.platforms.monday.desc);

  //
  // 🔘 GLOBAL BUTTONS
  //
  setText("toStep2Btn", t.buttons.next);
  setText("toStep3Btn", t.buttons.continue);
  setText("toStep4Btn", t.buttons.continue);
  setText("backToStep1", t.buttons.back);
  setText("backToStep2", t.buttons.back);
  setText("backToStep3", t.buttons.returnToPlatforms);
  setText("finishBtn", t.buttons.finish);

  //
  // 🌍 STATE
  //
  window.currentLang = translations[lang] ? lang : "en";

  //
  // 🔄 Refresh Step4 elements if visible
  //
  document.dispatchEvent(new CustomEvent("language-changed"));
}
