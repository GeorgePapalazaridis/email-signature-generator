[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-online-blue.svg)](https://georgepapalazaridis.github.io/email-signature-generator/)
[![Docs](https://img.shields.io/badge/Developer-Handbook-blueviolet.svg)](./Developer-Handbook.md)

# ✉️ Corporate Email Signature Generator

## 📑 Table of Contents

- [Corporate Email Signature Generator](#️-corporate-email-signature-generator)
- [📚 Developer Handbook](#-developer-handbook)
- [🧩 The Problem](#-the-problem)
- [💡 The Solution](#-the-solution)
- [🛠️ Tech Overview](#️-tech-overview)
- [✨ Key Features](#-key-features)
- [🚀 How to Use](#-how-to-use)
- [📁 Project Structure](#-project-structure)
- [🔧 Development Notes (for contributors)](#-development-notes-for-contributors)
- [🧭 Design Principles](#-design-principles)
- [🔮 Roadmap](#-roadmap)
- [🌍 Future Evolution — The Vision](#-future-evolution--the-vision)
- [🧾 License](#-license)

A lightweight **browser-based tool** that generates **Outlook-safe HTML signatures**
for **copy-paste installation**, ensuring consistent corporate branding across all email clients.

Originally developed as a personal initiative to support Prognosis Biotech,
this project is evolving into a **generic, multi-template corporate email signature generator**.

This project started as a **personal initiative** by **George Papalazaridis**
to solve an internal need for generating consistent email signatures at
**Prognosis Biotech**.

The codebase is open source under the MIT License and is designed to evolve
into a **generic, multi-tenant signature generator** that can be used by other
companies and individuals.

> **Note:** Prognosis Biotech uses a branded configuration of this tool via a
> dedicated fork under the `prognosisbiotech` GitHub organization.

---

## Ownership & Licensing

This software was fully designed and developed by **George Papalazaridis**.

Prognosis Biotech is using this tool under the terms of the MIT License via a
fork of this repository for internal branding purposes.

The **original project** and its **generic roadmap** remain owned and maintained
by the original author.

---

## 📚 Developer Handbook

For full technical documentation, architecture breakdown, and
implementation details, visit:

➡️ [Developer Handbook](./Developer-Handbook.md)

This document includes:

- Detailed wizard engine & state persistence explanation
- Folder structure and code responsibilities
- Signature template architecture
- Theme + i18n system
- Deployment notes
- Future extensibility roadmap

---

## 🧩 The Problem

Outlook Web (2024+) **blocks custom HTML imports**, causing:

- Broken styles when pasting signatures
- Missing logos, icons, and layout structure
- Different results in **light/dark mode**
- No direct HTML upload option

This led to inconsistent and unprofessional branding across employees.

---

## 💡 The Solution

A standalone, offline-ready **HTML signature generator** that:

| Feature                                                          | Status |
| ---------------------------------------------------------------- | :----: |
| Outlook **copy-and-paste compatible HTML**                       |   🟢   |
| Safe formatting (inline styles, compatibility-first layout)      |   🟢   |
| Multi-platform installation steps (Outlook, Thunderbird, Monday) |   🟢   |
| **EN/GR** translations                                           |   🟢   |
| Light & dark mode UI                                             |   🟢   |
| Automatic UI responsiveness (mobile-friendly)                    |   🟢   |
| Local storage wizard state persistence (refresh-safe)            |   🟢   |

No bookmarklets needed.
No browser extensions required.
**Pure HTML, copy → paste and done.**

---

## 🛠️ Tech Overview

- **Vanilla JavaScript (ES Modules)**
- Fully modular wizard architecture:

  ```
  DOM → Core Logic → Step Flow → State → Localization → Renderers
  ```

- **Base64-encoded assets** for guaranteed Outlook logo rendering
- Minimal, dependency-free, fully portable codebase

---

## ✨ Key Features

✔ Step-by-step Wizard (4 steps)
✔ Automatic preview rendering
✔ Persistent form data after refresh
✔ Dynamic field visibility (smart cleanup for empty rows)
✔ Platform-specific installation guides:

| Platform    | Output               | Method                        |
| ----------- | -------------------- | ----------------------------- |
| Outlook Web | Clean HTML           | Copy → Paste into Settings    |
| Thunderbird | Downloadable `.html` | Import via signature settings |
| Monday.com  | HTML to clipboard    | Paste into signature field    |

✔ Debug mode toggling for development
✔ Smooth UI animations + accessibility focus
✔ Dark mode support (UI)

---

## 🚀 How to Use

1️⃣ Visit the live generator
👉 [https://georgepapalazaridis.github.io/email-signature-generator/](https://georgepapalazaridis.github.io/email-signature-generator/)

2️⃣ Fill in your personal details
3️⃣ Preview your branded signature
4️⃣ Choose your email platform
5️⃣ Follow the on-screen guide to install the signature

🧭 Each platform offers its own recommended process.

---

## 📁 Project Structure

```text
email-signature-generator/
│
├── assets/
│   ├── base64/                        # Safe-to-embed Base64 logos & icons
│   │   ├── logo-base64.js
│   │   ├── icons/
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
│       ├── index.css                      # Compiled & bundled CSS output
│       └── *.map                          # Source maps (dev only)
│
├── js/
│   ├── config/
│   │   └── app.config.js              # Global toggles (DEBUG, env mode, etc.)
│   ├── services/
│   │   └── state-storage.service.js   # Local storage save/restore/clear
│   ├── translations/
│   │   ├── translations.apply.js      # Apply language to UI labels
│   │   └── translations.data.js       # GR/EN dictionary
│   ├── utils/
│   │   ├── debug.js                   # Debug toggle + safe console logger
│   │   ├── dom-utils.js               # Helpers for safe DOM access
│   │   ├── loader.js                  # Loader show/hide logic
│   │   └── phone-formatter.js         # Phone sanitization & formatting
│   ├── wizard/                        # Modular wizard architecture
│   │   ├── wizard.core.js
│   │   ├── wizard.dom.js
│   │   ├── wizard.language-theme.js
│   │   ├── wizard.runtime.js          # UI runtime session state
│   │   ├── wizard.state.js            # Restore wizard after refresh
│   │   └── wizard.steps.js            # Navigation (Step 1 → 4)
│   ├── step4-renderers.js             # Different installation guides per platform
│   ├── dom-bindings.js                # Inputs, events & user interactions
│   ├── notifications.js               # Toast + success popup logic
│   └── index.js                       # App entrypoint (initialization)
│
├── scss/                              # Source SCSS (developer editing only)
│   ├── abstracts/                     # Design tokens & mixins
│   │   ├── _colors.scss
│   │   └── _variables.scss
│   ├── base/                          # Base document styling
│   │   ├── _base.scss
│   │   └── _layout.scss
│   ├── components/                    # Reusable UI components
│   │   ├── _buttons.scss
│   │   ├── _clipboard.scss
│   │   ├── _forms.scss
│   │   ├── _header.scss
│   │   ├── _loader.scss
│   │   ├── _preview.scss
│   │   ├── _thankyou-popup.scss
│   │   └── _toast.scss
│   ├── helpers/
│   │   └── animations.scss            # Keyframes & transitions
│   └── pages/                         # Page-specific UI layouts
│   │   ├── _step3-layout-platform.scss
│   │   └── _step4-layout.scss
│   │   └── animations.scss            # Keyframes & transitions
│   └── index.css                      # Entry point importing all partials
│
├── index.html                         # Application shell
├── README.md                          # Documentation
├── LICENSE                            # MIT License
├── package.json                       # npm config (dev tooling / bundling later)
└── .gitignore
```

---

## 🔧 Development Notes (for contributors)

This project now includes:

| Module                          | Purpose                                     |
| ------------------------------- | ------------------------------------------- |
| `wizard.core.js`                | Business logic (validation, UI transitions) |
| `wizard.state.js`               | Load/restore/persist state in localStorage  |
| `wizard.steps.js`               | Event handlers for step-by-step flow        |
| `wizard.language-theme.js`      | i18n + theme switching                      |
| `wizard.runtime.js` _(planned)_ | Volatile UI session state                   |
| `step4-renderers.js`            | Platform-specific HTML instructions         |

> Clean separation = full extensibility for future templates + branding presets.

---

## 🧭 Design Principles

- 🧱 **Outlook-safe** inline styles
- 📦 **Offline-first**
- 🖼 **Logo always visible** via Base64 encoding
- 🔄 Progressive enhancement (graceful fallback logic)
- 👨‍💻 No external dependencies
- ✨ Fully self-hostable (GitHub Pages ready)

---

## 🔮 Roadmap

- 🔹 Add **multiple signature templates** selectable by user
- 🔹 Organization branding presets (colors, logos)
- 🔹 Real-time template switching
- 🔹 Export options: `.html`, `.zip`, `.json template config`
- 🔹 CI/CD pipeline and Vite bundling (build optimization)
- 🔹 Accessibility optimization (WCAG compliance)

---

## 🌍 Future Evolution — The Vision

This project is built to become a **universal corporate signature solution**:

🔐 **Secure & Offline** — companies can self-host internally  
🎨 **Fully brandable** — colors, logos, typography from a central config  
📦 **Multi-template catalog** — Minimal / Modern / Classic / Compact  
🧬 **User profile import/export** for large organizations  
🔌 Optional API integration for HR systems (auto-fill signatures)

> Goal: a **plug & play signature generator** that any organization can deploy,
> without exposing employee data to external tools.

---

## 🧾 License

MIT License © 2025
Developed with ❤️ by **George Papalazaridis**

---

💬 _Empowering teams to deploy consistent corporate identity in modern Outlook environments._

---
