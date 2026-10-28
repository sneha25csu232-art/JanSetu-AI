# 🏛️ JanSetu AI 
**Next-Generation Civic Intelligence Platform**

> **Better Communities, Better Governance Hackathon 2026**
> 
> *Empowering Citizens. Simplifying Governance.*

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 📌 The Problem
Navigating government systems is often overwhelming for the average citizen. Complex bureaucratic jargon, fragmented scheme information, language barriers, and a lack of transparency in grievance redressal create a massive disconnect between local authorities and the communities they serve.

## 💡 Our Solution: JanSetu AI
**JanSetu AI** (People's Bridge) is a premium, client-side civic-tech platform designed to bridge the gap between citizens and local governance. Built entirely without complex backends or paid APIs, this platform uses a simulated intelligence architecture to make public services accessible, transparent, and user-friendly.

---

## ✨ Key Features

### 🔍 1. Smart Scheme Finder
A data-driven matching engine that filters through central and state welfare policies. Users input their demographic profile (Age, Income, Occupation, Category), and the system instantly curates a personalized portfolio of eligible schemes (e.g., PM Kisan, Ayushman Bharat) with clear benefit highlights.

### 📄 2. Intelligent Document Simplifier
Bypasses bureaucratic jargon. Users can paste dense official notices or legal guidelines, and the simulated NLP engine translates them into plain-English, actionable step-by-step checklists with highlighted deadlines.

### 🛡️ 3. Civic Accountability Portal & Tracker
A transparent grievance redressal network. Citizens can report local infrastructural issues (potholes, streetlights, water supply) and receive an immutable Reference ID. 
* Includes a **Municipal Admin Simulator** where judges can update the ticket status (Pending ➔ In Progress ➔ Resolved), which updates the Citizen's visual tracking timeline in real-time.

### 💬 4. Multilingual Copilot (Chatbot)
An interactive, floating AI assistant interface that guides users through the platform in both English and Hindi.

### 🎨 5. Premium SaaS Design System
Designed with a world-class UI/UX featuring:
* **Glassmorphism & Soft Shadows:** Apple/Stripe-inspired aesthetics.
* **Dark Mode:** Seamless toggle for visual accessibility.
* **Bilingual Support:** 100% English/Hindi UI translation toggle.
* **Fully Responsive:** Flawless experience across Mobile, Tablet, and Desktop.

---

## 🛠️ Technical Architecture & Stack
This prototype was engineered under strict hackathon constraints to be lightweight, lightning-fast, and entirely self-contained.

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+).
* **Database:** Browser `localStorage` (Persists complaints and theme settings).
* **Icons:** FontAwesome 6.
* **Typography:** Plus Jakarta Sans (Google Fonts).
* **Zero Dependencies:** No React, No Node.js, No npm, No external API keys.

---

## 🚀 How to Run Locally

Because JanSetu AI is built with pure Vanilla web technologies, running it is incredibly simple.

1. **Clone or Download** the repository to your local machine.
2. Ensure all three files are in the same directory:
   * `index.html`
   * `style.css`
   * `script.js`
3. Open the folder in **Visual Studio Code**.
4. Right-click on `index.html` and select **"Open with Live Server"** (Requires the Live Server VS Code extension).
5. The application will instantly launch in your default web browser at `http://127.0.0.1:5500/index.html`.

---

## 🧪 Testing the Prototype (For Judges)
To experience the full capability of the platform:
1. **Try the Language Toggle:** Click the 🌐 icon in the top right to switch between English and Hindi instantly.
2. **Find a Scheme:** Go to the Scheme Finder, enter an income of `200000`, age `22`, and occupation `Student` to see the matching engine work.
3. **File a Complaint:** Submit a ticket in the Grievance section. Note the Reference ID generated.
4. **Be the Admin:** Scroll down to the *Authority Dashboard Simulator*, find your newly submitted ticket, and change its status to "Resolved".
5. **Track it:** Scroll back up to the citizen tracker, enter your ID, and watch the timeline update!

---

## 🔮 Future Roadmap (Post-Hackathon)
* Backend integration via Node.js/Express and PostgreSQL.
* Real LLM integration (OpenAI/Gemini API) for dynamic document parsing.
* Official API hooks into state municipal grievance databases.
* SMS/WhatsApp API integration for real-time ticket updates.

---
*Disclaimer: This is a hackathon prototype. All AI functionalities, scheme data, and admin portals are simulated locally in the browser for demonstration purposes.*