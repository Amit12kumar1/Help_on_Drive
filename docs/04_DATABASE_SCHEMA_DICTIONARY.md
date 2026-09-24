# DATABASE SCHEMA & DATA DICTIONARY
## HELP ON DRIVE Platform

---

### Collection 1: `users`
Stores all platform actors: Customers, Drivers, Service Providers, and Administrators.

| Field Name | Data Type | Key / Index | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique document identifier | `664b...` |
| `name` | String | None | Full legal name | "Rahul Sharma" |
| `email` | String | Unique Index | Valid email address | "rahul@gmail.com" |
| `password` | String | None | Bcrypt-hashed password | `"$2a$10$..."` |
| `phone` | String | None | Mobile phone number | "+91 9876543210" |
| `role` | String | None | enum: `user`, `driver`, `provider`, `admin` | "user" |
| `avatar` | String | None | Profile picture URL | "https://..." |
| `city` | String | None | Operational city | "New Delhi" |
| `status` | String | None | enum: `active`, `suspended`, `pending` | "active" |
| `createdAt` | Date | Timestamp | Registration timestamp | ISO Date |

---

### Collection 2: `vehicles`
Stores customer-owned automobiles linked to user accounts.

| Field Name | Data Type | Key / Index | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique vehicle record | `664c...` |
| `userId` | ObjectId | Foreign Key -> `users` | Owner reference | `664b...` |
| `vehicleNumber` | String | Indexed | Registration plate number | "UP-16-AB-1234" |
| `vehicleType` | String | None | Hatchback, Sedan, SUV, Luxury, Bike | "Hatchback" |
| `brand` | String | None | Manufacturer name | "Hyundai" |
| `model` | String | None | Specific model | "i20 Asta" |
| `fuelType` | String | None | Petrol, Diesel, CNG, Electric | "Petrol" |
| `color` | String | None | Vehicle exterior color | "Polar White" |
| `rcNumber` | String | None | Registration certificate number | "RC-HYU-2022-9901" |
| `isDefault` | Boolean | None | Indicates primary vehicle | `true` |

---

### Collection 3: `driverprofiles`
Specialized attributes for registered temporary drivers.

| Field Name | Data Type | Key / Index | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `userId` | ObjectId | Foreign Key -> `users` | One-to-one user reference | `664d...` |
| `licenseNumber` | String | Indexed | Commercial driving license | "DL-0420140028192" |
| `experienceYears` | Number | None | Driving experience in years | 7 |
| `vehicleTypesSupported` | [String] | None | Eligible vehicles (Sedan, SUV, etc.) | `["Hatchback", "Sedan"]` |
| `languages` | [String] | None | Spoken languages | `["Hindi", "English"]` |
| `hourlyRate` | Number | None | Price per hour (INR) | 120 |
| `dailyRate` | Number | None | Price per full day (INR) | 900 |
| `isAvailable` | Boolean | None | Online/Offline toggle | `true` |
| `verificationStatus`| String | None | `pending`, `approved`, `rejected` | "approved" |
| `rating` | Number | None | Computed average rating | 4.9 |
| `totalTrips` | Number | None | Total completed chauffeur trips | 142 |
| `earnings` | Number | None | Total platform payout | 28400 |

---

### Collection 4: `providerprofiles`
Specialized attributes for mechanics, towing vendors, and breakdown technicians.

| Field Name | Data Type | Key / Index | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `userId` | ObjectId | Foreign Key -> `users` | One-to-one user reference | `664e...` |
| `businessName` | String | None | Trade or garage business name | "SpeedFix Express Garage" |
| `serviceType` | String | None | Mechanic, Towing, Tyre, Battery | "Mechanic" |
| `servicesOffered` | [String] | None | breakdown, puncture, battery, towing... | `["puncture", "battery"]` |
| `baseCharge` | Number | None | Base diagnostic fee (INR) | 299 |
| `ratePerKm` | Number | None | Travel charge per km (INR) | 25 |
| `isAvailable` | Boolean | None | Dispatch availability | `true` |
| `verificationStatus`| String | None | `pending`, `approved`, `rejected` | "approved" |
| `totalJobs` | Number | None | Cumulative jobs completed | 184 |

---

### Collection 5: `assistancerequests`
Roadside assistance incident logs and lifecycle.

| Field Name | Data Type | Key / Index | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique incident ID | `664f...` |
| `userId` | ObjectId | Foreign Key -> `users` | Vehicle owner | `664b...` |
| `vehicleId` | ObjectId | Foreign Key -> `vehicles`| Incident vehicle | `664c...` |
| `providerId` | ObjectId | Foreign Key -> `users` | Assigned technician | `664e...` |
| `serviceType` | String | None | puncture, battery, towing, breakdown | "battery" |
| `problemDescription`| String | None | Owner problem notes | "Battery dead after headlights left on"|
| `location` | Object | Sub-document | Address, latitude, longitude | `{ lat: 28.56, lng: 77.24 }` |
| `status` | String | Indexed | pending, accepted, on_the_way, arrived, in_progress, completed | "accepted" |
| `charges` | Object | Sub-document | base, distance, service, gst, total | `{ totalAmount: 648 }` |
| `paymentStatus` | String | None | pending, paid, cash_on_delivery | "paid" |

---

### Collection 6: `driverbookings`
Temporary chauffeur contracts and trip dispatch records.

| Field Name | Data Type | Key / Index | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique booking ID | `6650...` |
| `userId` | ObjectId | Foreign Key -> `users` | Vehicle owner | `664b...` |
| `driverId` | ObjectId | Foreign Key -> `users` | Assigned chauffeur | `664d...` |
| `vehicleId` | ObjectId | Foreign Key -> `vehicles`| Customer vehicle driven | `664c...` |
| `bookingType` | String | None | 2_hours, 4_hours, full_day, multi_day | "4_hours" |
| `pickupLocation` | Object | Sub-document | Address, latitude, longitude | `{ lat: 28.55, lng: 77.20 }` |
| `startDate` | String | None | Starting date string | "2026-09-18" |
| `startTime` | String | None | Starting time | "10:00 AM" |
| `status` | String | Indexed | pending, accepted, driver_arrived, trip_started, completed | "trip_started" |
| `fare` | Object | Sub-document | rate, driverFee, platformFee, tax, total | `{ totalAmount: 570 }` |

---

### Collection 7: `sosalerts`
Emergency panic button dispatch logs.

| Field Name | Data Type | Key / Index | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique SOS record | `6651...` |
| `userId` | ObjectId | Foreign Key -> `users` | Alert initiator | `664b...` |
| `location` | Object | Sub-document | GPS address & coordinates | `{ lat: 28.54, lng: 77.20 }` |
| `emergencyType` | String | None | Accident, Threat, Night Breakdown | "General SOS" |
| `status` | String | None | active, responded, resolved | "active" |
| `notifiedContacts` | [Object] | Array | Dispatched relatives list | `[{ name: "Father", phone: "..." }]`|
