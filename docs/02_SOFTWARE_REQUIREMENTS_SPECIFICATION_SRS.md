# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## HELP ON DRIVE - Roadside Assistance & On-Demand Driver Booking Platform
**Document Version**: 1.0  
**Standard**: IEEE 830-1998  

---

### 1. Introduction

#### 1.1 Purpose
This document specifies the software requirements for the "Help On Drive" platform. It describes the external interfaces, system capabilities, design constraints, and quality attributes expected in the final production release.

#### 1.2 Document Conventions
- **UI**: User Interface
- **RSA**: Roadside Assistance
- **JWT**: JSON Web Token
- **REST**: Representational State Transfer
- **GPS**: Global Positioning System

#### 1.3 Intended Audience
Developers, system testers, project evaluators, external viva examiners, and platform administrators.

---

### 2. Overall Description

#### 2.1 Product Perspective
Help On Drive is a self-contained, responsive web-based digital marketplace bridging vehicle owners with registered roadside mechanics, flatbed towing operators, fuel/battery recovery agents, and temporary drivers.

#### 2.2 User Classes and Characteristics
1. **Customer (Vehicle Owner)**: Needs emergency assistance or a driver for their personal car. May operate under distress during road breakdowns; demands one-click simplicity and live visual reassurance.
2. **Driver**: Commercial/light motor vehicle license holder providing temporary chauffeur services on hourly/daily contracts. Demands clean trip dispatch, turn-by-turn routing, and earnings transparency.
3. **Service Provider (Mechanic / Towing)**: Workshop owner or mobile mechanic resolving breakdowns. Requires proximity job requests, problem photos, and stage progression.
4. **Admin**: System manager overseeing user verifications, complaints, fare tables, and security alerts.

#### 2.3 Operating Environment
- Modern Chromium/WebKit browsers (Google Chrome, Microsoft Edge, Safari, Firefox).
- Node.js runtime environment v18.x or above.
- MongoDB Server v6.x or Atlas Cloud.

---

### 3. Functional Requirements

#### 3.1 Module 1: Authentication & Role Management
- **FR-AUTH-1**: The system shall allow users to register with full name, email, phone, city, and role (`user`, `driver`, `provider`).
- **FR-AUTH-2**: Drivers must supply license number, driving experience years, and supported vehicle categories.
- **FR-AUTH-3**: Service Providers must provide registered business/garage name, primary service category, and base tariffs.
- **FR-AUTH-4**: The system shall securely hash passwords via bcrypt before persistent database write.
- **FR-AUTH-5**: The system shall issue signed JWT tokens verifying identity on protected routes.

#### 3.2 Module 2: User Vehicle Management
- **FR-VEH-1**: Users shall save multiple vehicles with registration number, brand, model, fuel type, and color.
- **FR-VEH-2**: Users may designate one vehicle as default.
- **FR-VEH-3**: Registered vehicles shall be selectable in one click during emergency roadside requests or driver bookings.

#### 3.3 Module 3: Roadside Assistance (RSA)
- **FR-RSA-1**: The system shall support 8 core breakdown categories: Mechanical Breakdown, Tyre/Puncture, Battery Jumpstart, Fuel Delivery, Towing, Key Lockout, Minor Repair, and Highway Emergency.
- **FR-RSA-2**: The user shall specify current location via browser GPS or interactive map pin.
- **FR-RSA-3**: The system shall calculate transparent price breakdown: `Base Charge + (Distance × Rate/km) + Service Surcharge + GST`.
- **FR-RSA-4**: Requests shall be broadcast to eligible service providers within geographical radius.
- **FR-RSA-5**: The provider shall advance status through structured milestones: `Accepted` -> `On The Way` -> `Arrived` -> `In Progress` -> `Completed`.

#### 3.4 Module 4: On-Demand Driver Booking
- **FR-DRV-1**: Users shall select booking duration: Quick Hours (2, 4, 6, 8 hours), Multi-day (Full day, 2, 3, 7 days), or Custom schedule.
- **FR-DRV-2**: Users can filter verified drivers by rating, hourly rate, and car transmission capability (Manual/Automatic).
- **FR-DRV-3**: Driver profile displays real-time availability badge, verified license indicator, user reviews, and pricing.
- **FR-DRV-4**: Driver booking lifecycle tracks: `Accepted` -> `Driver Arrived` -> `Trip Started` -> `Completed`.

#### 3.5 Module 5: Real-Time Live Tracking & In-App Chat
- **FR-RT-1**: The platform shall display live interactive Leaflet maps showing vehicle and user markers.
- **FR-RT-2**: Providers and drivers shall stream live GPS coordinates via Socket.IO.
- **FR-RT-3**: The system shall calculate real-time distance in kilometers and estimated time of arrival (ETA).
- **FR-RT-4**: Users and assigned partners can exchange instant messages within an active booking drawer.

#### 3.6 Module 6: SOS Emergency Response System
- **FR-SOS-1**: A prominent emergency button shall be accessible from all user screens.
- **FR-SOS-2**: Clicking SOS captures immediate GPS coordinates and broadcasts priority alert to admin center.
- **FR-SOS-3**: Registered emergency contacts (Father, Mother, Brother, etc.) shall be alerted with timestamp and coordinate payload.
- **FR-SOS-4**: Audio-visual siren cues activate during emergency confirmation.

#### 3.7 Module 7: Invoicing & Mock Payment Gateway
- **FR-PAY-1**: The system shall support mock UPI, Credit/Debit Card, Netbanking, and Cash on Delivery.
- **FR-PAY-2**: Upon transaction success, a structured GST tax invoice with unique invoice number, tax breakdown, and service metadata shall be generated and printable.

#### 3.8 Module 8: Admin Management & Verification Engine
- **FR-ADM-1**: Dashboard displays real-time KPIs: registered users, active trips, active roadside requests, platform revenue, and unresolved SOS alerts.
- **FR-ADM-2**: Admin can inspect driver licenses and provider trade certificates to approve or reject pending partner applications.
- **FR-ADM-3**: Admin can adjust base fares, per-kilometer charges, and platform commission rates in real-time.

---

### 4. Non-Functional Requirements
- **Performance**: API responses shall return in <300ms under standard loads; Socket.IO message latency <100ms.
- **Security**: Strict CORS policy, HTTP request sanitization, JWT token verification, and hashed passwords.
- **Availability & Fault Tolerance**: Microservice-ready architecture; fallback simulated GPS routing when browser location API is restricted.
- **Usability**: High-contrast UI with dark mode support, accessible fonts, mobile responsive touch targets.
