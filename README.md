# ✉️ Email Signature Generator

A lightweight HTML tool that creates personalized **Outlook Web** email signatures and injects them automatically using a bookmarklet.  
Designed to eliminate the copy-paste formatting issues of Outlook’s signature editor.

---

## 🧩 Problem

Creating branded HTML signatures in **Outlook Web** is frustrating:

- Outlook strips rich HTML formatting when you paste.
- There’s no direct way to inject clean HTML into the editor.
- Most employees or partners need a simple, foolproof process.

---

## 💡 Solution

This project provides a **stand-alone HTML tool** that:

- Opens locally in any browser (no installation needed)
- Lets the user fill in personal details (name, title, phone, etc.)
- Generates a **bookmarklet** that automatically inserts the pre-built signature HTML into the Outlook Web editor
- Supports multiple languages (currently English & Greek)
- Includes a responsive, inline-styled email signature compatible with Outlook Web

---

## 🛠️ Tech Stack

- **HTML / CSS / Vanilla JS** – no external dependencies
- Inline CSS for maximum email-client compatibility
- Embedded translations for multilingual support
- Works fully offline — download → open → run

---

## ✨ Features

- Dynamic input fields (name, title, phone, optional mobile)
- Smart logic — hides the mobile field if left empty
- Clean Outlook-safe table structure with inline icons
- Brand-consistent, modern layout with social links
- Auto-generated bookmarklet for instant insertion
- Step-by-step installation guide (PDF included)

---

## 🚀 Usage

1. **Download** the file `Prognosis_Signature_Generator.html` (or the latest `index.html` build).
2. **Open it locally** in your browser (Chrome / Edge).
3. **Fill in** your details (name, title, phone, etc.).
4. Click **“Generate Bookmarklet”** — a button named “Prognosis Signature” will appear.
5. **Drag it** to your browser’s bookmarks bar.
6. Open **Outlook Web → Settings → Signatures**.
7. In the signature editor, **click the bookmarklet** — your signature will be inserted automatically.

Full illustrated instructions are available in  
📄 [`docs/Email_Signature_Instructions.pdf`](docs/Email_Signature_Instructions.pdf)

---

## 📁 Project Structure

```
email-signature-generator/
│
├── src/
│   ├── index.html                   # Main entry (UI + script imports)
│   ├── js/
│   │   ├── translations.js          # EN/GR translations
│   │   ├── generator.js             # Main logic & bookmarklet creation
│   │   └── signature-template.js    # HTML structure of the signature
│   ├── css/
│   │   └── main.css                 # Styling (form + layout)
│   └── assets/
│       └── icons/                   # Social/contact icons
│
├── dist/                            # (optional) minified / production build
├── docs/
│   └── Email_Signature_Instructions.pdf
├── README.md
└── .gitignore

```

---

## 🧭 Next Steps

- [ ] Add **dark-mode** friendly variant
- [ ] Implement **preview before injection**
- [ ] Allow **export / copy as raw HTML** for manual paste
- [ ] Extend **translation support** (e.g. FR, PT, DE)

---

## 🧾 License

This project is released under the **MIT License** — free to use, modify, and distribute with attribution.

---
