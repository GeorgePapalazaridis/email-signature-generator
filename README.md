[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-online-blue.svg)](https://georgepapalazaridis.github.io/email-signature-generator/)

# ✉️ Corporate Email Signature Generator

A lightweight **browser-based tool** that creates personalized **Outlook Web** email signatures and injects them automatically using a **bookmarklet**.  
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

## 🧩 The Problem

When Microsoft introduced the **new Outlook for Web (2024+)**, it disrupted traditional HTML signature workflows:

- Outlook strips rich HTML formatting when you paste.
- Inline styles and `<table>` layouts get removed or broken.
- There’s no direct way to inject clean HTML into the editor.
- Most employees or partners need a simple, foolproof setup.

Companies lost brand consistency and were forced to rebuild signatures manually — often with broken icons, fonts, and spacing.

---

## 💡 The Solution

This tool provides a **stand-alone, browser-based HTML generator** that:

- Runs directly online from any web server (e.g., GitHub Pages, Vercel, Netlify).
- Lets users fill in personal details (name, title, phone, etc.).
- Generates a **bookmarklet** that injects a full HTML signature directly into Outlook Web’s editor.
- Uses **fully inline-styled HTML** for 100 % Outlook compatibility.
- Supports **multiple languages** (currently English & Greek).
- Includes a **PDF installation guide** for company-wide rollout.

---

## 🛠️ Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript (ES Modules)**
- Inline CSS for Outlook-safe rendering
- No dependencies — 100 % offline
- Modular architecture for easy maintenance

---

## ✨ Features

✅ Dynamic form fields (Name, Title, Phone, optional Mobile)  
✅ Auto-hide logic for empty fields (e.g., hides “Mobile” row)  
✅ Modern, branded HTML layout with icons & contact links  
✅ Auto-generated **bookmarklet** for one-click insertion  
✅ Built-in **EN / GR translations**  
✅ Animated **toast notifications** for UX feedback  
✅ Complete **PDF guide** for onboarding non-technical users

---

## 🚀 Usage

1. Visit the hosted version of the generator:  
   👉 [**Open Corporate Signature Generator**](https://georgepapalazaridis.github.io/email-signature-generator/)

2. Fill in your personal details:

   - Full Name
   - Job Title
   - Phone / Mobile (optional)

3. Click **“Generate Bookmarklet.”**

4. Drag the blue **“Signature”** button to your browser’s bookmarks bar.

5. Open **Outlook Web → Settings → Signatures.**

6. Inside the signature editor, **click the bookmarklet** —  
   your branded HTML signature will be automatically inserted ✅

📄 A full illustrated installation guide is available here:  
[`docs/Οδηγίες Εγκατάστασης Υπογραφής Email.pdf`](docs/Οδηγίες%20Εγκατάστασης%20Υπογραφής%20Email.pdf)

---

## 📁 Project Structure

```text
email-signature-generator/
│
├── assets/
│   ├── base64/
│   │   └── logo-base64.js           # Encoded logo (Base64 string)
│   └── icons/                       # Contact & social icons
│       ├── call.png
│       ├── factory.png
│       ├── facebook.png
│       ├── instagram.png
│       ├── language.png
│       ├── linkedin.png
│       ├── M.png
│       └── youtube.png
│
├── css/
│   ├── _variables.css               # Design tokens (spacing, colors, typography)
│   ├── _layout.css                  # Layout & global structure
│   ├── _form.css                    # Form elements & buttons
│   ├── _preview.css                 # Preview & bookmarklet section
│   ├── _toast.css                   # Toast notification styles
│   ├── _animations.css              # Keyframes & transitions
│   └── index.css                    # Entry point importing all partials
│
├── docs/
│   ├── Οδηγίες Εγκατάστασης Υπογραφής Email.pdf
│   └── Οδηγίες Εγκατάστασης Υπογραφής Email.txt
│
├── js/
│   ├── index.js                     # Main app entry point
│   ├── dom-bindings.js              # Event handlers & bindings
│   ├── utils.js                     # Input sanitization helpers
│   ├── translations.js              # EN/GR translations
│   ├── signature-template.js        # Dynamic HTML builder
│   └── assets/base64/logo-base64.js # Base64 logo
│
├── dist/                            # (Optional) minified build
│
├── index.html                       # Main UI
├── LICENSE                          # MIT License
└── README.md                        # This documentation
```

---

## 🧭 Design Principles

- **Offline-first:** Works without internet access.
- **Base64-encoded logo:** Prevents image breaks in Outlook.
- **Dynamic visibility:** Hides unused contact rows.
- **Design token system:** Centralized control of colors, spacing, typography.
- **Scalable structure:** Modular, ready for multi-template expansion.
- **User-friendly:** PDF walkthrough included for deployment.

---

## 🧱 Future Implementations

### 1️⃣ Multi-Template Architecture

Evolve the project into a **generic “Corporate Signature Generator.”**
Each user or organization will be able to:

- Choose from **5–6 pre-designed templates** (Minimal, Modern, Classic, Compact, Creative, etc.)
- See a **live preview** before generating.
- Switch templates dynamically without losing form data.

### 2️⃣ Company Branding Support

Allow organizations to define their own:

- **Logo** (upload or Base64)
- **Brand colors** (primary, accent, link color)
- **Default contact info** (address, email, support line)

This will turn the app into a **white-label tool** for any business.

### 3️⃣ Template Configuration System

Add a `/templates` directory with modular HTML & CSS:

```
templates/
 ├── classic.html
 ├── modern.html
 ├── minimalist.html
 ├── compact.html
 └── creative.html
```

Each template will include dynamic placeholders:

```
{{name}}  {{title}}  {{phone}}  {{email}}  {{logo}}
```

allowing automatic HTML rendering from JSON-based user data.

### 4️⃣ Template Preview Gallery

A gallery component displaying all templates with thumbnails & style tags,
plus real-time switching via a **TemplateSelectorComponent**.

### 5️⃣ Export & Integration Options

- Export to `.html`, `.zip`, or `.json config`
- Add “Copy to Clipboard” for legacy clients
- (Future) REST API endpoint for integration with company portals

---

## 💎 Long-Term Vision

> To provide a **universal, self-hosted, offline email signature builder**
> that any organization can rebrand and deploy internally —
> empowering employees to create consistent, compliant HTML signatures without IT involvement.

---

## 🔮 Roadmap

- [ ] Add **dark-mode logo variant**
- [ ] Add **multi-organization template support**
- [ ] Add **visual HTML preview before generation**

---

## 🧾 License

**MIT License © 2025 George Papalazaridis**

---

💬 _Built to simplify branded email signature deployment in modern Outlook environments._
