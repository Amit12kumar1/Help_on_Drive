# 🚗 HELP ON DRIVE
### Roadside Assistance & On-Demand Driver Booking Platform

A unified, real-time web platform built on the **MERN Stack** (MongoDB, Express.js, React 18, Node.js) with **Socket.IO** bidirectional tracking, **Leaflet Maps**, **Web Audio SOS Panic System**, and **GST Tax Invoicing**.

---

## 🌟 Dual Core Objectives

### 1. 🔧 Roadside Assistance (RSA)
For immobilized vehicles stranded due to unexpected breakdowns:
- **Vehicle Breakdown**: Engine stalling, clutch/gearbox diagnosis.
- **Tyre & Flat Puncture**: Tubeless puncture repair, wheel replacement.
- **Battery Jump Start**: 12V/24V heavy-duty booster cables and alternator health check.
- **Emergency Fuel Delivery**: 5 Litres pure petrol/diesel delivered directly to the car.
- **Flatbed Towing**: Hydraulic under-lift & flatbed carriers.
- **Key Lockout**: Safe non-damaging entry tools.
- **Minor Mechanical Repair**: Radiator fluid, fan belt, brake release.
- **Highway SOS Emergency Assistance**: High-priority alert grid.

### 2. 👨‍✈️ Hire a Driver (Chauffeur for Your Own Car)
When the vehicle is healthy, but the owner needs someone to drive it:
- **Quick Hourly Chauffeur**: 2 Hours, 4 Hours, 6 Hours, 8 Hours (Shopping, late-night dinners, hospital commutes).
- **Full Day & Multi-Day**: Full Day (10-12 hrs), 2 Days, 3 Days, 7 Days outstation holiday tours.
- **Custom Scheduling**: Flexible start time, pickup, and multi-stop trips.

---

## 👥 4 Role-Based Portals

| Role | Portal Capabilities |
| :--- | :--- |
| **👤 Vehicle Owner (Customer)** | Manage personal garage vehicles, 1-click RSA dispatch, Hire verified drivers, Live GPS map tracking, Emergency SOS button, In-app chat/call, Invoices & 5-star reviews. |
| **👨‍✈️ Temporary Driver** | Online/Offline availability toggle, Trip requests queue, Active turn-by-turn navigation terminal, Earnings log, RTO verified license credentials. |
| **👨‍🔧 Service Provider (Mechanic/Towing)** | Online dispatch toggle, Nearby breakdown calls, 5-stage repair milestone progression, Workshop tariffs and earnings. |
| **👑 Super Admin** | Master operations control desk, Live analytics KPIs, Partner document verifications (Approve/Reject), Dynamic pricing tariff configurator, Real-time SOS panic monitor. |

---

## 🔑 Demo Login Accounts

The system comes pre-populated with realistic demo accounts, vehicles, and historical records:

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **👑 Super Admin** | `admin@helpondrive.com` | `admin123` | Full access to KPI stats, partner approvals & tariffs |
| **👤 Customer** | `rahul@gmail.com` | `user123` | Rahul Sharma (3 cars: Hyundai i20, Tata Nexon, Mahindra Thar) |
| **👨‍✈️ Chauffeur** | `driver@helpondrive.com` | `driver123` | Amit Kumar (Rated 4.9★, ₹120/hr, Verified license) |
| **👨‍🔧 Service Provider** | `provider@helpondrive.com` | `provider123` | SpeedFix Auto Garage & Mobile Recovery Unit |

*(Tip: The login page includes quick 1-click demo buttons for instant access!)*

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Leaflet & React-Leaflet, Socket.IO Client, Canvas Confetti.
- **Backend**: Node.js, Express.js, Socket.IO, JWT, bcryptjs, Mongoose, Multer, Morgan.
- **Database**: MongoDB (Local `mongodb://127.0.0.1:27017/help_on_drive` or Atlas Cloud).
- **Mapping**: OpenStreetMap with Leaflet.js (100% free, zero external API key quotas).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Server running locally on default port `27017`

### 1. Clone or Open Project Directory
```bash
cd "C:\Users\akuma\OneDrive\Desktop\Help_on_Drive"
```

### 2. Seed the Database
```bash
npm run seed
```

### 3. Run Both Client & Server Concurrently
```bash
npm run dev
```
- **Client App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 📚 College Project Documentation Directory (`docs/`)

The `docs/` folder contains comprehensive academic documentation formatted according to university standards:
1. `docs/01_PROJECT_SYNOPSIS.md`: Executive summary, problem statement, objectives, scope.
2. `docs/02_SOFTWARE_REQUIREMENTS_SPECIFICATION_SRS.md`: IEEE 830-1998 compliant SRS.
3. `docs/03_SYSTEM_ARCHITECTURE_AND_DIAGRAMS.md`: Mermaid DFD Level 0, 1 & 2, ER Diagram, Sequence Diagram, Use Case & Class Diagrams.
4. `docs/04_DATABASE_SCHEMA_DICTIONARY.md`: Complete data dictionary and collections schema.
5. `docs/05_REST_API_DOCUMENTATION.md`: Full REST API reference with endpoints and payloads.
6. `docs/06_TEST_CASES_AND_VALIDATION.md`: Functional, security, and edge-case test suites.
7. `docs/07_VIVA_AND_PROJECT_REPORT_GUIDE.md`: Viva voce Q&A and project demonstration script.

---

## 🛡️ License
Built for Academic Evaluation and Production Demonstration.
