# 🚗 Help on Drive - Standalone Portable Edition (Pure HTML, CSS & Vanilla JS)

Welcome to the **Standalone Portable Edition** of **Help on Drive**.

This version is built using **100% Pure HTML, CSS, and Vanilla JavaScript** with **zero dependencies**. It does **NOT** require Node.js, MongoDB, or `npm install`.

---

## ⚡ How to Run
1. Double-click **`index.html`** in any web browser (Chrome, Edge, Firefox, Safari).
2. That's it! The platform runs instantly without starting any server.

---

## 📂 File Structure
```
standalone/
├── index.html          # Public Landing Page & Services
├── assistance.html     # Roadside Assistance Request & Quick Test Car
├── driver.html         # Hire Chauffeur (Hourly & Outstation)
├── tracking.html       # Live Leaflet GPS Tracking & Dispatch Simulator
├── garage.html         # Vehicle Garage Management
├── admin.html          # SuperAdmin Governance & SOS Alerts Monitor
├── css/
│   └── style.css       # Clean, modern, responsive styling
└── js/
    ├── data.js         # LocalStorage persistence & realistic seed data
    └── app.js          # Topbar role switcher & Emergency SOS logic
```

---

## 🌟 Key Features Included
1. **1-Click Role Switcher**:
   - Customer (`user@helpondrive.com`)
   - Mechanic/Provider (`provider@helpondrive.com`)
   - Driver (`driver@helpondrive.com`)
   - Admin (`admin@helpondrive.com`)
2. **Interactive Live Dispatch Lifecycle Simulator (`tracking.html`)**:
   - Step through: `Pending` ➔ `Accepted` ➔ `On the Way` ➔ `Arrived` ➔ `Completed`.
   - On completion, automatically triggers:
     - 🖨️ **Printable GST Tax Invoice Modal**
     - 💳 **Payment Settlement Modal** (UPI, Card, Cash)
     - ⭐ **Post-Service 5-Star Customer Feedback Modal**
3. **Emergency Highway SOS Modal**:
   - Direct-dial buttons for Police (112), Ambulance (108), NHAI Expressway (1033), and Help on Drive (1800-435-737).
   - "📋 Copy GPS Coordinates" 1-click clipboard action.
4. **Interactive Leaflet GPS Map**:
   - Live OpenStreetMap routing between user breakdown and moving partner.
5. **Frictionless Car Setup**:
   - 1-click "⚡ Quick Add Test Car" on assistance and driver booking pages.
