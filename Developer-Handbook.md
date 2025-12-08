# 📘 Developer Handbook

### Prognosis Signature Generator

Copyright © 2025
Created by George Papalazaridis
Released under MIT License

Version **v0.1** — Last Updated: 2025-12-08
Maintained by: **George Papalazaridis**

1. Introduction
2. Architecture Overview
3. Repository Structure
4. Wizard Engine
5. Signature Rendering Engine
6. State & Persistence
7. Language System
8. Styling & SCSS Architecture
9. Deployment & Hosting
10. Future Roadmap
11. Glossary + Troubleshooting

---

## 1️⃣ Introduction

Prognosis Signature Generator is a fully client-side, static web application designed to create branded HTML email signatures for corporate use.
It supports multiple installation methods (Outlook Web, Thunderbird, Monday.com) and provides instant preview, language switch, persistent state, and guided installation flow.

No backend, no external dependencies — **pure browser execution**.

**Core capabilities**

- Multi-step wizard (data → preview → platform → install)
- Signature generation using HTML templates + Base64 assets
- Local state persistence (restore after refresh)
- Multi-language UI with live update (GR/EN)
- Theme toggle (light/dark)
- GitHub Pages sub-path deployment compatibility

---

## 2️⃣ Core Architecture Overview

The application uses a **modular vanilla-JS architecture**:

```
UI Shell (HTML)
│
├── Language & Theme System
│
├── Wizard Engine
│     ├── DOM references & bindings
│     ├── Validation + step transitions
│     ├── Signature build + preview
│     └── State persistence (localStorage)
│
├── Signature Templates
│     ├── Outlook Web V3 (optimized for copy-paste behavior)
│     └── Standard HTML version (Thunderbird / Monday.com)
│
├── Platform Renderers (Step 4 UI)
│     ├── Outlook Web copy block
│     ├── Thunderbird HTML download
│     └── Monday HTML clipboard modal
│
└── Design System (SCSS → compiled CSS)
      ├── Components
      ├── Layouts
      ├── Animations
      └── Theme tokens
```

**Key Decisions**

- No frameworks → maximum compatibility
- No build tools required for runtime (SCSS → compiled manually)
- JavaScript **ES modules** for clear boundaries
- UI state stored and recovered after page refresh
- All signatures are fully self-contained (Base64 icons + inline styles)

---

**Section 3 — Folder Structure & Responsibilities**

The project follows a clean separation of responsibilities between **assets**, **UI styling**, **wizard logic**, **signature templates**, and **runtime utilities**.

---

## 3️⃣ Repository Structure (Developer View)

```text
email-signature-generator/
│
├── assets/                            # Static assets deployed to browser
│   ├── base64/                        # Safe-to-embed Base64 logos & icons
│   │   ├── logo-base64.js
│   │   ├── icons/                     # Mobile, Call, Web, Social icons
│   │   │   ├── call.js
│   │   │   ├── facebook.js
│   │   │   ├── factory.js
│   │   │   ├── instagram.js
│   │   │   ├── linkedin.js
│   │   │   ├── mobile.js
│   │   │   └── youtube.js
│   ├── core/signature                 # Signature template engines
│   │   ├── signature-builder.service.js
│   │   ├── signature-html-standard.template.js
│   │   └── signature-outlook-web-v3.template.js
│   ├── icons/                         # Raster fallback icons (if required)
│   │   ├── call.png
│   │   ├── facebook.png
│   │   ├── factory.png
│   │   ├── instagram.png
│   │   ├── language.png
│   │   ├── linkedin.png
│   │   ├── M.png
│   │   └── youtube.png
│   └── css/
│       ├── index.css                      # Production, compiled & bundled CSS output
│       └── *.map                          # Source maps (dev only)
│
├── js/                                    # Entire application logic (ES Modules)
│   ├── config/
│   │   └── app.config.js                  # Global toggles (DEBUG, env mode, etc.)
│   ├── services/
│   │   └── state-storage.service.js       # Local storage save/restore/clear
│   ├── translations/
│   │   ├── translations.apply.js          # Live translation bindings
│   │   └── translations.data.js           # Language dictionary (GR/EN)
│   ├── utils/
│   │   ├── debug.js                       # Debug toggle + safe console logger
│   │   ├── dom-utils.js                   # Helpers for safe DOM access
│   │   ├── loader.js                      # Global loader show/hide logic
│   │   ├── phone-formatter.js             # Phone formatting rules (GR-first)
│   │   └── phone-validator.js             # Input sanitization for phone fields
│   ├── wizard/                            # Modular wizard architecture - multi-step flow controller & runtime
│   │   ├── wizard.core.js                 # Step logic, preview, validation
│   │   ├── wizard.dom.js                  # Cached DOM element lookups
│   │   ├── wizard.language-theme.js       # Theme toggle behavior
│   │   ├── wizard.runtime.js              # Session state model for active wizard
│   │   ├── wizard.state.js                # Restore wizard's data + UI after refresh
│   │   └── wizard.steps.js                # Navigation & event listeners (Step 1 → 4)
│   ├── step4-renderers.js                 # Different UI renderer per platform on Step 4
│   ├── dom-bindings.js                    # User event wiring (language selector)
│   ├── notifications.js                   # Toast + success popup logic
│   └── index.js                           # App bootstrap entrypoint (initialization)
│
├── scss/                                  # Source SCSS (developer editing only)
│   ├── abstracts/                         # Design tokens (colors, variables & mixins)
│   │   ├── _colors.scss
│   │   └── _variables.scss
│   ├── base/                              # Global resets + root layout
│   │   ├── _base.scss
│   │   └── _layout.scss
│   ├── components/                        # Reusable UI components (Buttons, form fields, popups, etc.)
│   │   ├── _buttons.scss
│   │   ├── _clipboard.scss
│   │   ├── _forms.scss
│   │   ├── _header.scss
│   │   ├── _loader.scss
│   │   ├── _preview.scss
│   │   ├── _thankyou-popup.scss
│   │   └── _toast.scss
│   ├── helpers/                       # Keyframes + utilities
│   │   └── animations.scss            # Keyframes & transitions
│   └── pages/                         # Step-specific UI structure
│   │   ├── _step3-layout-platform.scss
│   │   └── _step4-layout.scss
│   └── index.scss                     # Entry point importing all partials
│
├── index.html                         # Application UI shell
├── README.md                          # Public documentation
├── LICENSE                            # MIT License
```

---

### 🧩 Design Principles Reflected in Structure

| Principle                                | Impact in Codebase                                  |
| ---------------------------------------- | --------------------------------------------------- |
| **No backend / zero server requirement** | Everything runs in browser; deploy via GitHub Pages |
| **Encapsulation by feature**             | Wizard, translations, notifications each isolated   |
| **Minimal global state**                 | Only stored in `wizard.runtime.js` + `localStorage` |
| **One-way data flow**                    | Form ➜ preview ➜ platform ➜ installation            |
| **Cross-platform signature templates**   | Outlook/Web V3 vs Standard HTML separated cleanly   |
| **SCSS modularity**                      | Theming is maintainable and extendable              |

---

**Section 4 — Wizard Engine Deep Dive**

The wizard is a **4-step UI flow** that guides the user from input ➜ preview ➜ platform ➜ installation.

The engine is built around 3 core pillars:

| Component           | Responsibility                                                |
| ------------------- | ------------------------------------------------------------- |
| `wizard.core.js`    | Business rules & actions (validation, preview, data building) |
| `wizard.steps.js`   | Navigation logic & event handlers                             |
| `wizard.state.js`   | State restoration after refresh                               |
| `wizard.runtime.js` | Minimal session state storage during the flow                 |

---

## 4.1 Wizard Step Lifecycle

Steps are identified by static DOM sections:

| Step  | UI Section | Purpose                              |
| ----- | ---------- | ------------------------------------ |
| **1** | `#step1`   | User personal + work details         |
| **2** | `#step2`   | Signature Preview                    |
| **3** | `#step3`   | Platform Selection                   |
| **4** | `#step4`   | Installation guide based on platform |

### State transitions overview

```
Step1 → Step2 → Step3 → Step4 → Finish (→ Reset → Step1)
      ↘ back  ↖ back  ↖ back
```

All UI moves through a single function:

```js
showStep(dom.step2);
```

It hides all steps and scrolls the new one into view.

---

## 4.2 Validation Rules

Basic form validation handled via:

```js
function step1IsValid() {
  return name && title; // non-empty
}
```

Additional usability rule:

- **Clear** button stays disabled until user changes defaults
- Default values are defined in `wizard.core.js → nothingChangedFromDefaults()`

---

## 4.3 Signature Data Flow

User input → normalized → rendered into HTML → preview

```js
function buildData() {
  return {
    name,
    title,
    address,
    phone: formatPhoneNumber(rawPhone),
    mobile: formatPhoneNumber(rawMobile),
    logoBase64,
  };
}
```

Preview generation:

```js
wizardRuntime.signatureHtml = buildSignatureHtml();
dom.previewBox.innerHTML = `<div class="signature-wrapper">${...}</div>`;
```

📌 Notes

- Phone number formatting → opinionated for **Greek users first**
- Logo injected as **Base64** for offline consistency

---

## 4.4 Real-time Persistence

✔ All changes are saved to `localStorage`
✔ After refresh, app returns to last valid UI state

Storage service:

```js
saveState({ signatureHtml, currentStep });
```

Restore:

```js
restoreWizardState(loadState());
```

Restoration includes:

| Item               | Behavior            |
| ------------------ | ------------------- |
| Form fields        | Reinjected          |
| Preview            | Fully restored      |
| Selected platform  | Highlighted again   |
| Active step        | Re-opened correctly |
| Language           | Preserved           |
| Clear button state | Correctly updated   |

💡 UX goal: Seamless resume — the wizard **never resets unexpectedly**

---

## 4.5 Platform Selection & Step 4 Rendering

Step 4 UI is fully dynamic:

```js
switch (platform) {
  case "outlook":
    renderOutlookStep4_WebCopyPaste();
  case "thunderbird":
    renderThunderbirdStep4();
  case "monday":
    renderMondayStep4();
}
```

Rendered UI includes:

- Click-to-copy HTML clipboard support
- Download file (Thunderbird)
- Modal handling (Monday)
- Success toast messages

On language change:
→ Automatically rebuilds step 4 content

---

## 4.6 Debugging Hooks

```js
import { debug } from "../utils/debug.js";
```

Enable DEBUG in `/js/config/app.config.js`:

```js
export const DEBUG = true;
```

Output includes:

- Template engine used
- Lifecycle state logs
- Storage read/write messages

---

## 4.7 Future Extension Points

| Feature                                                 | Ready for extension                     |
| ------------------------------------------------------- | --------------------------------------- |
| More signature templates                                | ✔ just add new builder + switch case    |
| Add more platforms (Gmail, Apple Mail, Outlook Desktop) | ✔ via Step 3 cards + renderer           |
| Branding theme selector                                 | ✔ inject new SCSS variables             |
| Multi-user presets / backend sync                       | ✔ state system can be replaced with API |

---

## 🧩 Quick Architecture Diagram

```
UI ↔ Wizard DOM Cache
 ↕
Wizard Core — form → preview builder → step updates
 ↕
Wizard Runtime (temporary memory)
 ↕
LocalStorage (persistent state)
```

---

**Section 5 — Signature Rendering Engine**

The signature generator supports **multiple output styles**, optimized per **email platform**.

---

## 5.1 Architecture Overview

| Layer     | Module                                 | Purpose                                                    |
| --------- | -------------------------------------- | ---------------------------------------------------------- |
| Engine    | `signature-builder.service.js`         | Normalizes input & chooses correct template                |
| Templates | `signature-html-standard.template.js`  | Generic HTML with remote icons (fallback for most clients) |
| Templates | `signature-outlook-web-v3.template.js` | Optimized for Outlook Web copy-paste                       |
| Assets    | `/assets/base64/icons/*.js`            | Icon images inlined as Base64 strings                      |
| Assets    | `/assets/base64/logo-base64.js`        | High-resolution logo, compliant with Outlook restrictions  |

---

## 5.2 Platform Detection and Rendering

Entry point:

```js
export function buildSignature({ platform, data }) {
  const normalizedData = {
    ...data,
    phone: formatPhoneNumber(data.phone),
    mobile: formatPhoneNumber(data.mobile),
  };

  switch (platform) {
    case SignaturePlatform.OUTLOOK:
      return buildOutlookSignatureWebV3(normalizedData);

    case SignaturePlatform.HTML_STANDARD:
    case SignaturePlatform.THUNDERBIRD:
    case SignaturePlatform.MONDAY:
      return buildHtmlStandardSignature(normalizedData);

    default:
      return buildOutlookSignatureWebV3(normalizedData);
  }
}
```

---

## 5.3 Why Two Templates?

| Template           | Used For                      | Pros                                                                       | Cons                                                     |
| ------------------ | ----------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Outlook Web V3** | Outlook Web (recommended)     | ✔ Perfect fidelity in Outlook <br>✔ Inline Base64 icons survive sanitizers | ❌ Heavier HTML <br>❌ Slightly bigger clipboard payload |
| **Standard HTML**  | Thunderbird, Monday, fallback | ✔ Lightweight, simpler                                                     | ❌ Icons pulled from remote URL — may be blocked         |

💬 Outlook Web is **the most restrictive email client** → It strips CSS, external images, and custom tags
👉 That's why Base64 is required here

---

## 5.4 Outlook Web Template Details

Key design rules implemented:

✔ Only `<table>` layout (no flex/grid)
✔ Inline CSS only
✔ Images inline (Base64)
✔ RGB colors only (no variables)
✔ No web fonts (though Montserrat sometimes works)

Example snippet:

```html
<img
  src="${callIcon}"
  width="14"
  height="15"
  style="vertical-align:middle; margin-right:6px; border:0;"
/>
```

---

## 5.5 Standard HTML Template Details

Used where email clients are more permissive.

Remote icon delivery:

```html
<img src="https://www.prognosis-biotech.com/apps/icons/20251008/call.png" />
```

Auto-extensible via:

```js
const socialIcons = [
  ["linkedIn", "https://www.linkedin.com/company/prognosisbiotech"],
  ...
]
```

📌 Remote paths designed to support a future CDN-hosted image pack

---

## 5.6 Base64 Asset Strategy

All icons are stored in small `.js` files:

Example: `/assets/base64/icons/call.js`

```js
export const callIcon = "data:image/png;base64,...";
```

Requirements:

- Minimize payload size
- Remove metadata during export
- Prefer PNG for hard edges, SVG not supported everywhere in email

---

## 5.7 Signature Structure

Common layout:

```
╔═════════════════════════════════╗
║ Header → Name | Title           ║
╠═════════════════════════════════╣
║ Logo + Tagline                  ║
╠═════════════════════════════════╣
║ Phone | Mobile | Website        ║
╠═════════════════════════════════╣
║ Address + Social Icons          ║
╠═════════════════════════════════╣
║ Disclaimer                      ║
╚═════════════════════════════════╝
```

Fully responsive within Outlook’s **fixed signature frame**

---

## 5.8 Security & Anti-Tampering

- No script tags inside signature HTML
- No external tracking pixels
- External links: `rel="noopener noreferrer"`
- All phone/URL links sanitized
- Signature HTML **never executed**, only inserted as plain content

---

## 5.9 Future Template Extensions

| Feature                   | Status          | Notes                              |
| ------------------------- | --------------- | ---------------------------------- |
| Dark Theme version        | 🟡 Planned      | Could invert icon colors           |
| Multiple brand variations | 🟡 Planned      | For different Divisions of company |
| QR Code support           | 🔄 Possible     | Would need a Base64 generator      |
| CID embedded images       | 🔄 Nice-to-have | Requires IMAP/desktop integration  |

---

## 5.10 Summary Checklist

| Feature                               | Implemented | Notes                        |
| ------------------------------------- | :---------: | ---------------------------- |
| Base64 icons                          |      ✔      | Email-safe everywhere        |
| HTML fallback version                 |      ✔      | Remote icons only            |
| Copy-to-clipboard signature injection |      ✔      | Outlook Web works flawlessly |
| Downloadable HTML                     |      ✔      | Thunderbird                  |
| Clipboard modal                       |      ✔      | Monday                       |
| LocalStorage persistence              |      ✔      | Seamless UX                  |
| Language switching support            |      ✔      | Smart Step 4 refresh         |

---

**Section 6 — State Management & Persistence**

---

## 6.1 Goal

Persist user progress so they can:
✔ Refresh the page without losing data
✔ Navigate backward/forward between steps
✔ Close the tab & continue later
✔ Change language without restarting flow

---

## 6.2 Where State Lives

| Layer              | Responsibility                                | Module                         |
| ------------------ | --------------------------------------------- | ------------------------------ |
| Persistent storage | Save/Load/Clear stored data                   | `state-storage.service.js`     |
| UI restore logic   | Sync input fields + preview + step + platform | `wizard.state.js`              |
| In-memory runtime  | Current signature + platform                  | `wizard.runtime.js`            |
| State write rules  | Save state when certain events fire           | `wizard.steps.js` / `index.js` |

---

## 6.3 Persistent State Format (localStorage)

Storage namespace:

```js
const STORAGE_KEY = "signatureWizardState";
```

Possible fields stored:

```js
{
  lang: "gr" | "en",
  name: "George Papalazaridis",
  title: "Front End Developer",
  address: "Farsalon 153, Larissa, 41335 - Greece",
  phone: "+30 2410 623 922",
  mobile: "+30 6987 331 449",
  signatureHtml: "<table>...</table>",
  selectedPlatform: "outlook" | "thunderbird" | "monday",
  currentStep: 1 | 2 | 3 | 4
}
```

Storage service:

```js
export function saveState(partial = {}) {
  const existing = loadState() || {};
  const updated = { ...existing, ...partial };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
```

🔐 Safe merging ensures no partial wipes.

---

## 6.4 UI Restoration Workflow

Called twice during init:

```js
restoreWizardState(saved);
```

Restores:

| Restored Item      | Source                 | Target                          |
| ------------------ | ---------------------- | ------------------------------- |
| Form fields        | saved                  | DOM inputs                      |
| Signature preview  | saved.signatureHtml    | `#preview-box`                  |
| Platform selection | saved.selectedPlatform | highlight UI card               |
| Navigation step    | saved.currentStep      | show correct `<section>`        |
| Language           | saved.lang             | `setLanguage()` (separate flow) |

Also prevents invalid scenarios →
e.g. Step 4 without selected platform → fallback to Step 3.

---

## 6.5 In-Memory Runtime (`wizard.runtime.js`)

Two volatile values that should **not** persist:

```js
export const wizardRuntime = {
  signatureHtml: "",
  selectedPlatform: null,
};
```

Used during:

- Translations
- Preview rendering
- Clipboard copy actions

Then replicated into localStorage only when stable:

```js
saveState({ signatureHtml, selectedPlatform });
```

---

## 6.6 Automatic Autosaving

Trigger points:

| Event                   | File                      | Behavior                   |
| ----------------------- | ------------------------- | -------------------------- |
| Typing in Step 1 fields | `wizard.steps.js`         | Save form data             |
| Preview generated       | Step 2                    | Save `signatureHtml`       |
| Selecting platform      | Step 3                    | Save platform + navigation |
| Language change         | `bindDom` + `setLanguage` | Save new lang              |
| Any step navigation     | `wizard.steps.js`         | Save `currentStep`         |

🧠 UX principle:

> The user should _never_ feel punished for refreshing the page.

---

## 6.7 State Reset Logic

Used when:

- User presses **Clear Form**
- User presses **Finish** in Step 4

Effects:
✔ localStorage is cleared
✔ runtime cleared
✔ UI resets to Step 1 defaults
✔ toast + confetti popup confirm completion

---

## 6.8 Error Handling & Debug Logging

If `localStorage` is blocked (Safari private mode, cookies disabled):

```js
debug.warn("⚠️ Failed to save state:", e);
```

Still functional, simply without persistence.

---

## 6.9 Future State Model Enhancements (optional)

| Feature                    | Benefit                               |
| -------------------------- | ------------------------------------- |
| Version stamp              | Smooth migration if schema changes    |
| Checksum for signatureHtml | Prevent stale preview display         |
| Expiration logic (TTL)     | Auto-reset to avoid outdated contacts |
| Cloud sync backup          | Enterprise rollout support            |

Example schema versioning:

```js
if (saved.version !== APP_VERSION) clearState();
```

---

**Section 7 — Language System (I18N)**

---

## 7.1 Goal

Provide **full bilingual UI** (Greek + English), including:

| Area                             | Translated? |
| -------------------------------- | ----------- |
| Form labels                      | ✔           |
| Button texts                     | ✔           |
| Step titles & subtitles          | ✔           |
| Platform card content            | ✔           |
| Step 4 installation instructions | ✔           |
| Toast messages & success popup   | ✔           |

---

## 7.2 Translation Storage

All language content in one file:

📄 `translations.data.js`

```js
export const translations = {
  gr: {
    /*...*/
  },
  en: {
    /*...*/
  },
};
```

Why good?

- One source of truth
- Easy to add future languages

---

## 7.3 Translation Application Layer

📄 `translations.apply.js`

Main API:

```js
export function setLanguage(lang) {
  const t = translations[lang] || translations["en"];
  saveState({ lang });
  window.currentLang = lang;

  applyUIStrings(t);
  document.dispatchEvent(new CustomEvent("language-changed"));
}
```

What it updates:

- Headings
- Subtitles
- Form labels + placeholders
- Buttons
- Platform cards

📌 Runs automatically on:

- App initialization
- Language `<select>` change
- Page refresh / state restore

---

## 7.4 DOM Updates

Internally uses helpers:

📄 `utils/dom-utils.js`

```js
setText("labelName", t.form.name);
setPlaceholder("title", t.form.titlePlaceholder);
```

✨ Benefits:

- Zero manual DOM access in the wizard logic
- Translations **declarative**, not scattered

---

## 7.5 Automatic Runtime Refresh

Important feature:

```js
document.dispatchEvent(new CustomEvent("language-changed"));
```

Why?

Because Step 4 has _dynamic_ content that must be rebuilt:

| Feature          | Impact                            |
| ---------------- | --------------------------------- |
| Outlook flow     | Title text, buttons, instructions |
| Thunderbird flow | All steps text                    |
| Monday modal     | Titles, button labels             |

Handled in:

📄 `wizard.steps.js`

```js
document.addEventListener("language-changed", () => {
  if (step4Visible) {
    updateStep4Title(...);
    reRenderStep4Content();
  }
});
```

📌 Correctly avoids rerendering if not in Step 4.

---

## 7.6 Language Persistence

✍ Saved in localStorage:

```js
saveState({ lang });
```

Restored on next load:

```js
window.currentLang = saved?.lang || "gr";
```

✔ Keeps UI consistent
✔ No flicker
✔ Locale-respecting inputs stay untouched

---

## 7.7 Future Language Support

To add a new language:
1️⃣ Duplicate structure inside `translations.data.js`
2️⃣ Add `<option>` to the `<select>`
3️⃣ Done 👍

No code changes anywhere else.

---

## 7.8 UX Considerations

| Behavior                                        | Status |
| ----------------------------------------------- | ------ |
| Immediate update of visible text                | ✔      |
| Keep current step visible after language change | ✔      |
| Replace Step 4 instructions live                | ✔      |
| Auto-sync dropdown value on refresh             | ✔      |

---

## 7.9 Example: Consistency on refresh

Before language change:

| UI Element   | State       |
| ------------ | ----------- |
| Current step | Step 4      |
| Platform     | Thunderbird |
| Lang         | EN          |

After refresh → **exactly same environment restored** ✨

---

## 7.10 Section Summary

✔ Fully modular I18N implementation
✔ Zero duplicated logic
✔ Translations dispatch dynamic updates
✔ Language persists across sessions
✔ No UI flicker

> Small engine → high scalability

---

**Section 8 — Styles, SCSS Architecture & Theming**

---

## 8.1 Styling Goals

| Goal                               | Status |
| ---------------------------------- | ------ |
| Mobile-ready but desktop-optimized | ✔      |
| Brand-consistent                   | ✔      |
| Dark/Light theme support           | ✔      |
| Modular & scalable                 | ✔      |
| Smooth transitions                 | ✔      |

---

## 8.2 Build Model

| Folder                  | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `/scss/**`              | Source SCSS (human-edited)                   |
| `/assets/css/index.css` | 🍱 Compiled output — **never edit manually** |

> SCSS → compiled once → static CSS shipped to web.

---

## 8.3 SCSS Folder Structure

```
scss/
│
├── abstracts/        # Design tokens & mixins
│   ├── _colors.scss
│   └── _variables.scss
│
├── base/             # Foundation styling applied globally
│   ├── _base.scss
│   └── _layout.scss
│
├── components/       # Reusable visual elements
│   ├── _buttons.scss
│   ├── _clipboard.scss
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _loader.scss
│   ├── _preview.scss
│   ├── _thankyou-popup.scss
│   └── _toast.scss
│
├── helpers/
│   └── animations.scss # Keyframes & transitions
│
└── pages/            # Page-specific UI blocks
    ├── _step3-layout-platform.scss
    └── _step4-layout.scss
```

📌 Everything is imported into `scss/index.scss` → compiled → `assets/css/index.css`

---

## 8.4 Design Tokens & Mixins

Stored in:

📄 `scss/abstracts/_colors.scss`
📄 `scss/abstracts/_variables.scss`

Contains:

- Colors + theme tokens
- Spacing scale
- Radius & shadows
- Typography defaults

✔ Central place for design changes
✖ No inline hard-coded CSS

---

## 8.5 Light / Dark Theme Support

Theme toggler:

📄 `wizard.language-theme.js`

```js
root.setAttribute("data-theme", next);
localStorage.setItem("theme", next);
```

CSS implementation example:

```scss
:root[data-theme="light"] {
  --bg: #ffffff;
  --text: #000000;
}

:root[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: #eeeeee;
}
```

🎯 Result → Instant theme switch without rerendering.

---

## 8.6 Base Styling

📄 `base/_base.scss`

- Reset rules
- Body + layout spacing
- Default text styles

📄 `base/_layout.scss`

- Wizard structure
- Grid templates
- Header & footer bars

---

## 8.7 Reusable UI Components

Each component isolated, reusable:

| Component           | SCSS file              | JS relation                |
| ------------------- | ---------------------- | -------------------------- |
| Buttons             | `_buttons.scss`        | Used globally              |
| Loader              | `_loader.scss`         | Controlled via `loader.js` |
| Toast notifications | `_toast.scss`          | Used in `notifications.js` |
| Clipboard modal     | `_clipboard.scss`      | Used in Monday flow        |
| Step preview UI     | `_preview.scss`        | Step 2                     |
| Thank-you popup     | `_thankyou-popup.scss` | After Finish button        |

📌 CSS classes never collide with project-wide names

---

## 8.8 Page-Level Styling

📄 `pages/_step3-layout-platform.scss`

- Selectable platform cards
- Click/tap affordances

📄 `pages/_step4-layout.scss`

- Installation instructions layout
- Accordion / spacing for different platforms

🧠 Separation ensures:

- Page UIs evolve independently
- No huge stylesheet

---

## 8.9 Animation System

📄 `helpers/animations.scss`

Includes:

- Loader rotations
- Toast slide in/out
- Confetti drops 🥳
- Smooth step transitions

🚫 No JS-heavy animation → keeps app lightweight

---

## 8.10 Best-Practices Snapshot

| Principle                                       | Status |
| ----------------------------------------------- | ------ |
| BEM-ish class naming                            | ✔      |
| Components isolated                             | ✔      |
| Scoped per step/page                            | ✔      |
| No inline mutable styles                        | ✔      |
| Theming via `data-theme`                        | ✔      |
| Zero CSS Frameworks (no Bootstrap dependencies) | ✔      |

---

## 8.11 Building CSS

Currently done manually during development:

```
scss/index.scss → assets/css/index.css
```

**Section 9 — State Persistence & Page Refresh Handling**

---

## 9.1 Purpose

The app behaves like a native wizard:

✔ Form stays filled after refresh
✔ Selected platform is remembered
✔ Preview is restored
✔ Wizard step stays where user left off

❌ You never lose progress accidentally

This reliability is powered by local state syncing.

---

## 9.2 State Storage Mechanism

All session data is stored using **localStorage**:

📄 `js/services/state-storage.service.js`

```js
const STORAGE_KEY = "signatureWizardState";
```

---

## 9.3 Persisted Data Structure

The saved state object may include:

| Key                        | Example            | Description               |
| -------------------------- | ------------------ | ------------------------- |
| `name`, `title`, `address` | `"John Doe"`       | User input fields         |
| `phone`, `mobile`          | `+30 2410 623 922` | Auto-formatted            |
| `signatureHtml`            | `<table>...`       | Latest built HTML preview |
| `selectedPlatform`         | `"outlook"`        | Chosen install platform   |
| `currentStep`              | `2`                | UI navigation state       |
| `lang`                     | `"gr"`             | Persist chosen language   |

📌 The app **automatically** composes and merges partial updates.

---

## 9.4 State Lifecycle

🧠 State is saved in multiple places:

- When the user types → save form data automatically
- Step navigation → update `currentStep`
- Language switch → update `lang`
- Platform select → update `selectedPlatform`
- Preview generated → save `signatureHtml`

---

## 9.5 Restore Flow

On app startup (`index.js`):

```
restoreWizardState(saved);
```

📄 `wizard.state.js` handles:

### ✔ Restore UI form fields

### ✔ Restore preview HTML

### ✔ Restore selected platform & highlight card

### ✔ Jump directly to previous step

### ✔ Safe fallback if invalid state is detected

Example logic:

```js
let step = saved.currentStep || 1;
if (step === 4 && !saved.selectedPlatform) step = 3;
showStep(steps[step - 1]);
```

---

## 9.6 Clear Flow

Triggered by **Clear** button or **Finish** action:

📄 `clearState()`
📄 `clearWizardState()`
→ remove data from storage
→ reset form & UI to defaults
→ go back to Step 1

---

## 9.7 Why Local Persistence Matters

| UX Benefit                         | Outcome                        |
| ---------------------------------- | ------------------------------ |
| Refresh-safe wizard                | Zero frustration               |
| Users can correct typos later      | No retyping everything         |
| Language switch doesn’t break flow | No dialog resets               |
| Mobile friendly                    | Handles accidental tab reloads |

➡️ App “feels” like a modern installable tool, not a fragile form.

---

## 9.8 State Reliability Challenges Covered

| Problem                              | Solution                                 |
| ------------------------------------ | ---------------------------------------- |
| Back-forth navigation breaks preview | Always rebuild & save fresh preview HTML |
| Step4 changes after language switch  | Re-render dynamic instruction UI         |
| Corrupt saved state                  | Safe fallbacks ensure Step1 reset        |
| Missing platform but Step4 active    | Force user back to Step3                 |

---

## 9.9 Future Upgrade Options

| Improvement                     | Benefit                                      |
| ------------------------------- | -------------------------------------------- |
| Include version in state schema | Auto-migrate or clear on breaking changes    |
| Support template variations     | Preview re-render using selected theme/model |
| Cross-tab sync                  | Multi-device wizard resume                   |

We can expand localStorage usage when the app grows (multi-template, user accounts, etc).

---

**Section 10 — Deployment & Hosting (GitHub Pages)**

---

## 10.1 Deployment Method

The project is fully static (HTML/CSS/JS) → deployed using:

**GitHub Pages (static hosting)**

Each repo naturally generates its own public URL:

| Repo Owner     | Deployment URL                                                            |
| -------------- | ------------------------------------------------------------------------- |
| Personal       | `https://georgepapalazaridis.github.io/email-signature-generator/`        |
| Corporate Fork | `https://prognosisbiotech.github.io/prognosis-email-signature-generator/` |

---

## 10.2 Subpath Hosting Challenges

GitHub Pages does **not** host at `/` root ⛔
but under a subfolder:

Example:

```
/email-signature-generator/
```

This affects:

✔ Relative JS imports
✔ CSS paths
✔ Browser routing
✔ Clipboard modal links
✔ Base `<img>` references

Without proper handling → **404 errors everywhere**.

---

## 10.3 Solution: Dynamic `<base>` Path Injection

📄 Defined in `index.html`:

```js
<script type="module">
  const hostname = window.location.hostname; const isGeorge = hostname ===
  "georgepapalazaridis.github.io"; const isPrognosis = hostname ===
  "prognosisbiotech.github.io"; const personalRepo =
  "/email-signature-generator/"; const prognosisRepo =
  "/prognosis-email-signature-generator/"; let baseUrl = "/"; if (isGeorge)
  baseUrl = personalRepo; else if (isPrognosis) baseUrl = prognosisRepo; const
  baseTag = document.createElement("base"); baseTag.setAttribute("href",
  baseUrl); document.head.prepend(baseTag);
</script>
```

✔ Ensures all links resolve correctly on both deployments
✔ Zero environment change needed
✔ Tested on Mac, Windows & mobile iOS/Android

---

## 10.4 Fallback Loader Script

Extra safety layer: if app loads but paths still resolve incorrectly → reinject correct JS source.

```js
if (window.location.hostname === "georgepapalazaridis.github.io") {
  const script = document.createElement("script");
  script.type = "module";
  script.src = "/email-signature-generator/js/index.js";
  document.body.appendChild(script);
}
```

📌 Avoids blank screen issues when GitHub invalidates paths during updates.

---

## 10.5 Caching Strategy

Browsers heavily cache signature preview images & assets.

✔ Loader hides UI until CSS + translations are ready
✔ Prevents flashing unstyled UI
✔ Ensures a stable first impression on every refresh

---

## 10.6 Security Considerations

| Concern                        | Mitigation                                                  |
| ------------------------------ | ----------------------------------------------------------- |
| Public exposure of internal UI | Corporate fork branding and access control if needed later  |
| Clipboard permission           | User action required (compliant with browser security APIs) |
| HTML injection                 | All user fields are text only — no HTML allowed             |
| Analytics disabled by default  | GDPR-friendly                                               |

---

## 10.7 CI/CD (Optional)

Right now:
🚀 Deployment is fully automated via GitHub Pages build

Future upgrade options:

- Add **GitHub Actions** for automated CSS minification
- Auto-update `APP_VERSION` on release tags
- Production build with `vite` or `parcel` tooling

---

## 10.8 Maintaining Multiple Deployments

| Objective                   | Mechanism                |
| --------------------------- | ------------------------ |
| Personal portfolio use      | Personal repo deployment |
| Company-approved UI         | Prognosis-branded fork   |
| Sync improvements both ways | Manual PR merges         |

📌 No private backend → collaboration is frictionless.

---

## 10.9 Section Summary

✔ Hosting is static → zero server dependencies
✔ Dynamic `<base>` tag enables multi-domain support
✔ Fallback loader prevents deployment race conditions
✔ Corporate fork allows branded versioning
✔ Scaling for enterprise possible when needed

---

## 🎯 Future Roadmap

- Image-based installation for Outlook Desktop (CID support)
- Alternative layouts (2–3 corporate themes)
- QR code / vCard auto-generation
- Multi-user presets (API-backed)
- Corporate admin mode (restrict branding edits)

---

© 2025 George Papalazaridis — Released under MIT  
This project is maintained actively at:  
https://github.com/GeorgePapalazaridis/email-signature-generator
