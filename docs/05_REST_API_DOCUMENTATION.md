# REST API DOCUMENTATION
## HELP ON DRIVE API Reference (Base URL: `http://localhost:5000/api`)

---

### Authentication Headers
For protected endpoints, supply the bearer token in the Authorization header:
```http
Authorization: Bearer <jwt_token>
```

---

### 1. Authentication Endpoints (`/api/auth`)

| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Create user, driver, or service provider account |
| `POST` | `/api/auth/login` | Public | Authenticate credentials and return JWT token |
| `GET` | `/api/auth/me` | Private | Retrieve logged-in user profile with role attributes |
| `PUT` | `/api/auth/profile` | Private | Update user personal details (name, phone, city) |

#### Register Payload Example
```json
{
  "name": "Karan Malhotra",
  "email": "karan@gmail.com",
  "password": "password123",
  "phone": "+91 9988776655",
  "role": "user",
  "city": "New Delhi"
}
```

---

### 2. Vehicles Endpoints (`/api/vehicles`)

| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/vehicles` | Private (User) | Get all vehicles registered under user account |
| `POST` | `/api/vehicles` | Private (User) | Add a new vehicle |
| `PUT` | `/api/vehicles/:id` | Private (User) | Edit vehicle specifications or set default |
| `DELETE` | `/api/vehicles/:id` | Private (User) | Remove vehicle from registry |

---

### 3. Roadside Assistance Endpoints (`/api/assistance`)

| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/assistance` | Private (User) | Initiate roadside assistance emergency incident |
| `GET` | `/api/assistance/my` | Private (User) | List user's roadside incident history |
| `GET` | `/api/assistance/:id` | Private | Retrieve single incident details |
| `GET` | `/api/assistance/provider/jobs` | Private (Provider) | Fetch available pending or assigned jobs |
| `PUT` | `/api/assistance/:id/accept` | Private (Provider) | Accept roadside job |
| `PUT` | `/api/assistance/:id/status` | Private (Provider) | Advance status (`on_the_way`, `arrived`, `completed`) |

---

### 4. Driver Booking Endpoints (`/api/driver-bookings`)

| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/driver-bookings` | Private (User) | Book a temporary chauffeur |
| `GET` | `/api/driver-bookings/my` | Private (User) | Get user's chauffeur trip history |
| `GET` | `/api/driver-bookings/driver` | Private (Driver) | Get bookings assigned to logged-in driver |
| `GET` | `/api/driver-bookings/:id` | Private | Get detailed trip card |
| `PUT` | `/api/driver-bookings/:id/status` | Private (Driver) | Update status (`accepted`, `driver_arrived`, `trip_started`, `completed`) |

---

### 5. Emergency SOS Endpoints (`/api/sos`)

| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/sos/trigger` | Private (User) | Trigger panic alert with GPS coordinates |
| `GET` | `/api/sos/active` | Private (Admin/User) | View live emergency alerts |
| `PUT` | `/api/sos/:id/resolve` | Private (Admin/User) | Mark emergency alert as resolved |

---

### 6. Billing & Invoicing Endpoints (`/api/payments`)

| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments/process` | Private (User) | Process mock payment (UPI/Card) & create invoice |
| `GET` | `/api/payments/invoice/:bookingId` | Private | Retrieve full printable invoice data |
| `GET` | `/api/payments/my` | Private (User) | User transaction history |

---

### 7. Admin & Control Endpoints (`/api/admin`)

| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | Admin Only | System KPIs (Users, Revenue, Active Trips, SOS) |
| `GET` | `/api/admin/verifications` | Admin Only | Pending driver and provider applications |
| `PUT` | `/api/admin/verify/:role/:id` | Admin Only | Approve or reject partner application |
| `GET` | `/api/admin/pricing` | Admin Only | Get current system tariffs and fee parameters |
| `PUT` | `/api/admin/pricing` | Admin Only | Live update pricing tables |
