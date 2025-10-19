# ✉️ Email Signature Generator

A lightweight browser-based tool that creates personalized **Outlook Web** email signatures and injects them automatically using a **bookmarklet**.  
Designed to eliminate the copy-paste formatting issues of Outlook’s signature editor and restore full HTML control.

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

This project provides a **stand-alone, fully local HTML generator** that:

- Opens directly in any browser (no install, no server).
- Lets users fill in their personal info (name, title, phone, etc.).
- Generates a **bookmarklet** that injects the HTML signature directly into Outlook Web’s editor.
- Uses **fully inline-styled HTML** for compatibility with Outlook and all major email clients.
- Supports **multiple languages** (currently English & Greek).
- Includes a **step-by-step PDF installation guide** for non-technical staff.

---

## 🛠️ Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript (ES Modules)**
- Inline CSS for 100 % Outlook-safe rendering
- No external dependencies — works completely offline
- Modularized for maintainability (imports per module)

---

## ✨ Features

- Dynamic input fields (name, title, phone, optional mobile)
- Auto-hide logic for unused fields (e.g., mobile)
- Modern, branded layout with social links and icons
- Clean, table-based HTML structure for Outlook compatibility
- Auto-generated **bookmarklet** for one-click insertion
- Built-in **EN / GR translations**
- **PDF guide** for company rollout

---

## 🚀 Usage

1. **Clone or download** the full project folder.
2. Open `index.html` in your browser (Chrome or Edge).
3. Fill in your personal details:
   - Full Name
   - Job Title
   - Phone / Mobile (optional)
4. Click **“Generate Bookmarklet.”**
5. Drag the blue **“Signature”** button to your bookmarks bar.
6. Open **Outlook Web → Settings → Signatures.**
7. Inside the signature editor, **click the bookmarklet.**  
   Your branded HTML signature is inserted automatically ✅

📄 Full illustrated instructions are available in  
[`docs/Οδηγίες Εγκατάστασης Υπογραφής Email.pdf`](docs/Οδηγίες%20Εγκατάστασης%20Υπογραφής%20Email.pdf)

---

## 📁 Project Structure

```md
email-signature-generator/
│
├── assets/
│ ├── base64/
│ │ └── logo-base64.js # Encoded logo (Base64 string)
│ └── icons/ # Contact / social icons
│ ├── call.png
│ ├── factory.png
│ ├── facebook.png
│ ├── instagram.png
│ ├── language.png
│ ├── linkedIn.png
│ ├── M.png
│ └── youtube.png
│
├── css/
│ └── index.css # Styling (form + layout)
│
├── docs/
│ ├── Οδηγίες Εγκατάστασης Υπογραφής Email.pdf
│ └── Οδηγίες Εγκατάστασης Υπογραφής Email.txt
│
├── js/
│ ├── index.js # App entry point (main logic)
│ ├── dom-bindings.js # Event bindings for UI
│ ├── utils.js # Input sanitization helpers
│ ├── translations.js # EN/GR translations & setter
│ ├── signature-template.js # Dynamic HTML builder
│ └── assets/base64/logo-base64.js # Logo asset (Base64)
│
├── dist/ # (optional) minified build output
│
├── index.html # Main UI
├── LICENSE # MIT License
├── README.md # This documentation
└── .gitignore
```

---

## 🧭 Design Decisions

- **Offline-first approach:** works without a network connection.
- **Base64-encoded logo:** prevents broken image links in Outlook.
- **Dynamic mobile block:** hidden automatically when empty.
- **Clean modular structure:** easier future scaling (multi-org).
- **Step-by-step PDF guide:** simplifies company-wide rollout.

---

## 🔮 Next Steps

- [ ] Add **dark-mode logo variant**
- [ ] Add **multi-organization template support**
- [ ] Add **visual preview before generation**
- [ ] Add **export-to-HTML** option for manual insertion

---

## 🧾 License

MIT License © 2025

---

💬 _Developed to simplify branded email signature deployment in modern Outlook environments._
