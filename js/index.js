import { logoBase64 } from "../assets/base64/logo-base64.js";
import { translations, setLanguage } from "./translations.js";
import { buildSignature } from "./signature-template.js";
import { bindDom } from "./dom-bindings.js";

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

// Κύρια λειτουργία
export function generate() {
  const t = translations[window.currentLang || "gr"];
  const name = document.getElementById("name").value || "";
  const title = document.getElementById("title").value || "";
  const address =
    document.getElementById("address").value ||
    "Farsalon 153, Larissa, 41335 - Greece";
  const mobile = document.getElementById("mobile").value.trim();
  const phone =
    document.getElementById("phone").value.trim() || "+30 2410 623 922";

  if (!name || !title) {
    alert(t.alertMissing);
    return;
  }

  const signature = buildSignature({
    name,
    title,
    address,
    phone,
    mobile,
    logoBase64,
  });

  const js = makeBookmarklet(signature, t);
  const link = document.getElementById("bookmarklet");
  link.href = js;

  const container = document.getElementById("bookmarklet-container");
  container.classList.add("show");
}

// αρχικοποίηση εφαρμογής
document.addEventListener("DOMContentLoaded", () => {
  // default language
  window.currentLang = "gr";
  setLanguage("gr");

  // δέσιμο DOM handlers
  bindDom({
    onGenerate: generate,
    onLanguageChange: (lang) => setLanguage(lang),
  });
  console.log("App initialized ✅");
  console.log("Logo base64 preview:", logoBase64.slice(0, 50) + "...");
});
