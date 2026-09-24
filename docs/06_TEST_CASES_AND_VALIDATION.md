# TEST CASES & SYSTEM VALIDATION
## HELP ON DRIVE System Test Suite

---

### 1. Authentication & Security Test Cases

| Test Case ID | Test Scenario | Input Data | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-AUTH-01** | User Registration with valid credentials | Name: Rahul, Email: rahul@gmail.com, Pass: user123 | Account created, 201 Created status, JWT returned | PASS |
| **TC-AUTH-02** | Duplicate email registration attempt | Existing email `rahul@gmail.com` | 400 Bad Request: "User already exists with this email" | PASS |
| **TC-AUTH-03** | Login with incorrect password | Email: rahul@gmail.com, Pass: wrongpass | 401 Unauthorized: "Invalid email or password" | PASS |
| **TC-AUTH-04** | Role-protected route access without JWT | Request `/api/vehicles` without Bearer token | 401 Unauthorized: "Not authorized, no token provided" | PASS |
| **TC-AUTH-05** | Regular user accessing `/api/admin/stats` | User JWT token with role="user" | 403 Forbidden: "Role (user) is not authorized" | PASS |

---

### 2. Vehicle Management Test Cases

| Test Case ID | Test Scenario | Input Data | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-VEH-01** | Add new vehicle | `UP-16-AB-1234`, Hyundai, i20, Petrol | Vehicle stored, linked to user `_id`, returned with 201 | PASS |
| **TC-VEH-02** | Set default vehicle | `isDefault: true` on Hyundai i20 | Hyundai marked default; previous default unset | PASS |
| **TC-VEH-03** | Delete vehicle | Vehicle `_id` | Vehicle record removed from database | PASS |

---

### 3. Roadside Assistance Test Cases

| Test Case ID | Test Scenario | Input Data | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-RSA-01** | Initiate RSA request | Service: "battery", Location: Delhi, Problem text | Request created with `pending` status and pricing | PASS |
| **TC-RSA-02** | Provider accepts RSA job | Provider ID, Job ID | Status changes to `accepted`, timeline event appended | PASS |
| **TC-RSA-03** | Provider status progression | Status: `on_the_way` -> `arrived` -> `completed` | Status updates in DB, socket event broadcasted | PASS |
| **TC-RSA-04** | Auto-update provider earnings on job completion | Job total ₹648 completed | Provider profile earnings incremented by ₹648 | PASS |

---

### 4. Chauffeur Booking Test Cases

| Test Case ID | Test Scenario | Input Data | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-DRV-01** | Filter available drivers | `vehicleType: "SUV"` | Returns only approved drivers supporting SUV category | PASS |
| **TC-DRV-02** | 4-Hour quick booking fare calculation | Rate: ₹120/hr, Duration: 4 hrs, Platform fee: ₹50 | Driver Fee: ₹480, Platform: ₹50, Tax: ₹26.50, Total computed | PASS |
| **TC-DRV-03** | Complete driver trip | Booking `_id`, status: `completed` | Booking marked complete; totalTrips incremented | PASS |

---

### 5. Emergency SOS Test Cases

| Test Case ID | Test Scenario | Input Data | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-SOS-01** | User triggers SOS panic button | Lat: 28.5494, Lng: 77.2001 | SOS alert created with active status; contacts retrieved | PASS |
| **TC-SOS-02** | Real-time SOS socket broadcast | SOS trigger event | Emergency broadcast emitted to admin monitor room | PASS |
| **TC-SOS-03** | Admin resolves SOS alert | SOS `_id`, status: `resolved` | Status marked resolved with resolution audit note | PASS |

---

### 6. Billing & Invoicing Test Cases

| Test Case ID | Test Scenario | Input Data | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-PAY-01** | Mock UPI payment processing | Booking ID, Method: UPI, Amount: ₹570 | Payment saved, Unique invoice `HOD-...` generated | PASS |
| **TC-PAY-02** | Generate printable invoice | Booking ID query | Full invoice metadata returned with customer and provider info | PASS |
