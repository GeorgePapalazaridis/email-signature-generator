/**
 * Multilingual string dictionary for UI localization (EN/GR)
 * - Consumed by setLanguage() for runtime UI updates
 * - Keys must remain consistent across languages
 * - Designed for easy extension (new texts or new languages)
 */

// ===============================
// 🌐 Translations – Prognosis Signature Generator
// ===============================
export const translations = {
  gr: {
    header: {
      languageLabel: "🌐 Γλώσσα:",
    },

    // 🏷️ FORM LABELS
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

    // 🔹 GLOBAL BUTTONS
    buttons: {
      next: "Επόμενο",
      back: "Πίσω",
      continue: "Συνέχεια",
      finish: "Τέλος",
      returnToPlatforms: "Επιστροφή στις πλατφόρμες",
      copyHtml: "Αντιγραφή HTML",
      copyHtmlOutlook: "Αντιγραφή HTML Υπογραφής",
      clearForm: "Καθαρισμός",
    },

    // ✨ STEP HEADERS / SUBTITLES
    steps: {
      step1Title: "Βήμα 1: Συμπλήρωση στοιχείων",
      step1Subtitle:
        "Συμπλήρωσε τα στοιχεία σου για να δημιουργήσουμε την υπογραφή.",

      step2Title: "Βήμα 2: Προεπισκόπηση Υπογραφής",
      step2Subtitle: "Έλεγξε την υπογραφή σου πριν συνεχίσεις.",

      step3Title: "Βήμα 3: Επιλογή πλατφόρμας",
      step3Subtitle:
        "Επίλεξε την πλατφόρμα όπου θέλεις να εγκαταστήσεις την υπογραφή σου.",

      step4TitleOutlook: "Βήμα 4: Εγκατάσταση υπογραφής στο Outlook",
      step4TitleThunderbird: "Βήμα 4: Εγκατάσταση υπογραφής στο Thunderbird",
      step4TitleMonday: "Βήμα 4: Εγκατάσταση υπογραφής στο Monday.com",

      step4Subtitle:
        "Ακολούθησε τις παρακάτω οδηγίες για να ολοκληρώσεις την εγκατάσταση.",
    },

    // 🪟 PLATFORM TITLES & DESCRIPTIONS
    platforms: {
      outlook: {
        title: "Microsoft Outlook",
        desc: "Επικόλληση HTML υπογραφής για τέλεια και σταθερή εμφάνιση στο Outlook.",
      },
      thunderbird: {
        title: "Thunderbird",
        desc: "Λήψη υπογραφής ως HTML αρχείο για εισαγωγή στις ρυθμίσεις λογαριασμού.",
      },
      monday: {
        title: "Monday.com",
        desc: "Επικόλληση HTML υπογραφής στα Emails μέσω του Emails & Activities panel.",
      },
    },

    // 💾 OUTLOOK WEB FLOW
    outlook: {
      step1: "Πάτησε «Αντιγραφή Υπογραφής».",
      step2:
        "Άνοιξε Outlook → Ρυθμίσεις → Compose and Reply → Email Signature.",
      step3: "Κάνε επικόλληση με Ctrl+V (Windows) ή Cmd+V (Mac).",

      previewLabel: "Προεπισκόπηση Υπογραφής",
      copyHtmlButton: "Αντιγραφή Υπογραφής",
      openOutlook: "Άνοιγμα Outlook Web",
    },

    // 📨 THUNDERBIRD FLOW
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

    // ☁ Monday.com FLOW
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

    // 🎉 SUCCESS
    success: {
      installDone:
        "🎉 Ευχαριστούμε που χρησιμοποίησες τον Signature Generator!",
      copied: "Υπογραφή αντιγράφηκε!",
      fallbackCopy: "Αντιγραφή μέσω fallback!",
    },

    // 🧭 OTHER HEADERS
    heading: "Prognosis Email Signature Generator",
    previewTitle: "Προεπισκόπηση Υπογραφής",
  },

  en: {
    header: {
      languageLabel: "🌐 Language:",
    },

    // 🏷️ FORM LABELS
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

    // 🔹 GLOBAL BUTTONS
    buttons: {
      next: "Next",
      back: "Back",
      continue: "Continue",
      finish: "Finish",
      returnToPlatforms: "Return to platforms",
      copyHtml: "Copy HTML",
      copyHtmlOutlook: "Copy Signature HTML",
      clearForm: "Clear",
    },

    // ✨ STEP HEADERS / SUBTITLES
    steps: {
      step1Title: "Step 1: Fill in your details",
      step1Subtitle: "Fill in your information to generate your signature.",

      step2Title: "Step 2: Signature Preview",
      step2Subtitle: "Review your signature before continuing.",

      step3Title: "Step 3: Choose platform",
      step3Subtitle:
        "Select the platform where you want to install your signature.",

      step4TitleOutlook: "Step 4: Install your signature in Outlook",
      step4TitleThunderbird: "Step 4: Install your signature in Thunderbird",
      step4TitleMonday: "Step 4: Install your signature in Monday.com",

      step4Subtitle: "Follow the instructions below to complete installation.",
    },

    // 🪟 PLATFORM TITLES & DESCRIPTIONS
    platforms: {
      outlook: {
        title: "Microsoft Outlook",
        desc: "Paste the HTML signature for perfect and consistent appearance in Outlook.",
      },
      thunderbird: {
        title: "Thunderbird",
        desc: "Download the signature as an HTML file and import it in Account Settings.",
      },
      monday: {
        title: "Monday.com",
        desc: "Paste the HTML signature into Emails using the Emails & Activities panel.",
      },
    },

    // 💾 OUTLOOK WEB FLOW
    outlook: {
      step1: "Click “Copy Signature”.",
      step2: "Open Outlook → Settings → Compose and Reply → Email Signature.",
      step3: "Paste with Ctrl+V (Windows) or Cmd+V (Mac).",

      previewLabel: "Signature Preview",
      copyHtmlButton: "Copy Signature",
      openOutlook: "Open Outlook Web",
    },

    // 📨 THUNDERBIRD FLOW
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

    // ☁ Monday.com FLOW
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

    // 🎉 SUCCESS MESSAGES
    success: {
      installDone: "🎉 Thank you for using the Signature Generator!",
      copied: "Signature copied!",
      fallbackCopy: "Copy fallback executed!",
    },

    // 🧭 OTHER HEADERS
    heading: "Prognosis Email Signature Generator",
    previewTitle: "Signature Preview",
  },
};
