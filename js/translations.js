// Translations
export const translations = {
  gr: {
    name: "Ονοματεπώνυμο",
    namePlaceholder: "π.χ. George Papalazaridis",
    title: "Θέση / Τίτλος",
    titlePlaceholder: "π.χ. Front End Angular Developer",
    phone: "Σταθερό τηλέφωνο",
    address: "Διεύθυνση",
    mobile: "Κινητό",
    mobilePlaceholder: "π.χ. +30 6987 331 449",
    button: "Δημιουργία Bookmarklet",
    alertMissing: "Συμπλήρωσε τουλάχιστον όνομα και τίτλο",
    success: "✅ Το signature προστέθηκε!",
    heading: "Prognosis Email Signature Generator",
    subtitle: "Συμπλήρωσε τα στοιχεία σου και πάτα “Generate Bookmarklet”.",
    dragText: "Σύρε αυτό το κουμπί στη μπάρα των bookmarks σου:",
    instruction:
      "➡️ Άνοιξε Outlook Web (Settings → Signatures) και πάτησε το bookmark για να μπει η υπογραφή.",
    notFound:
      "⚠️ Δεν βρέθηκε ο editor. Άνοιξε Settings → Mail → Compose & reply → Email signature.",
  },
  en: {
    name: "Full Name",
    namePlaceholder: "e.g. George Papalazaridis",
    title: "Job Title",
    titlePlaceholder: "e.g. Front End Angular Developer",
    phone: "Office Phone",
    address: "Address",
    mobile: "Mobile",
    mobilePlaceholder: "e.g. +30 6987 331 449",
    button: "Generate Bookmarklet",
    alertMissing: "Please fill in at least your name and title",
    success: "✅ Signature inserted successfully!",
    heading: "Prognosis Email Signature Generator",
    subtitle: "Fill in your details and click “Generate Bookmarklet”.",
    dragText: "Drag this button to your bookmarks bar:",
    instruction:
      "➡️ Open Outlook Web (Settings → Signatures) and click the bookmark to insert your signature.",
    notFound:
      "⚠️ Editor not found. Open Settings → Mail → Compose & reply → Email signature.",
  },
};

export function setLanguage(lang) {
  const t = translations[lang] || translations["en"]; // fallback safety
  if (!t) return;

  document.getElementById("titleHeading").textContent = t.heading;
  document.getElementById("subtitleText").textContent = t.subtitle;
  document.getElementById("dragText").textContent = t.dragText;
  document.getElementById("instructionText").textContent = t.instruction;

  document.getElementById(
    "labelName"
  ).innerHTML = `${t.name} <span style="color:red;">*</span>`;
  document.getElementById("name").placeholder = t.namePlaceholder;

  document.getElementById(
    "labelTitle"
  ).innerHTML = `${t.title} <span style="color:red;">*</span>`;
  document.getElementById("title").placeholder = t.titlePlaceholder;

  document.getElementById("labelAddress").textContent = t.address;
  document.getElementById("labelPhone").textContent = t.phone;
  document.getElementById("labelMobile").textContent = t.mobile;
  document.getElementById("mobile").placeholder = t.mobilePlaceholder;

  document.getElementById("generateBtn").textContent = t.button;

  window.currentLang = translations[lang] ? lang : "en";
}
