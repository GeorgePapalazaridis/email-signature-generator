import { translations } from "./translations.data.js";
import { setText, setPlaceholder } from "../utils/dom-utils.js";

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
