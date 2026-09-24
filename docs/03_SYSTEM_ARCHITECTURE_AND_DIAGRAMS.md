# SYSTEM ARCHITECTURE & DIAGRAMS
## HELP ON DRIVE - Roadside Assistance & Driver Booking Platform

---

### 1. High-Level System Architecture

```mermaid
graph TD
    Client["Client Layer (React.js + Vite + Tailwind + Leaflet)"]
    Gateway["Express.js REST & WebSocket Gateway (Node.js)"]
    Auth["JWT Authentication & RBAC Middleware"]
    
    subgraph "Backend Services"
        RSA["Roadside Assistance Engine"]
        DriverEngine["Chauffeur Booking Engine"]
        Geo["Location & Proximity Calculator"]
        SOS["SOS Panic & Broadcast Service"]
        Pay["Billing & Tax Invoicing Service"]
        SocketEngine["Socket.IO Live Tracking & Chat Hub"]
    end
    
    subgraph "Data Storage Layer"
        Mongo[("MongoDB Database (Mongoose ODM)")]
    end
    
    Client <-->|"HTTP REST Requests / JSON"| Gateway
    Client <-->|"Bidirectional WebSockets"| SocketEngine
    Gateway --> Auth
    Auth --> RSA
    Auth --> DriverEngine
    Auth --> Geo
    Auth --> SOS
    Auth --> Pay
    
    RSA --> Mongo
    DriverEngine --> Mongo
    Geo --> Mongo
    SOS --> Mongo
    Pay --> Mongo
    SocketEngine --> Mongo
```

---

### 2. Data Flow Diagrams (DFD)

#### 2.1 DFD Level 0 (Context Level Diagram)
```mermaid
flowchart TD
    User["Vehicle Owner / Customer"]
    Driver["Registered Driver"]
    Provider["Service Provider (Mechanic)"]
    Admin["System Administrator"]
    HOD["HELP ON DRIVE System"]
    
    User -->|"Breakdown Request / Driver Booking / SOS"| HOD
    HOD -->|"Live Tracking / Invoices / Driver Arrival"| User
    
    Provider -->|"Accept Job / Dispatch Status / Charges"| HOD
    HOD -->|"Nearby Emergency Notifications / Payouts"| Provider
    
    Driver -->|"Accept Trip / Live GPS Coordinates"| HOD
    HOD -->|"Trip Route / Customer Pickup / Earnings"| Driver
    
    Admin -->|"Approve Partners / Manage Tariffs / SOS Audit"| HOD
    HOD -->|"System Analytics / Revenue Reports"| Admin
```

#### 2.2 DFD Level 1 (Major System Subsystems)
```mermaid
flowchart TD
    Customer["Customer"]
    P1["1.0 User & Vehicle Registry"]
    P2["2.0 Roadside Assistance Engine"]
    P3["3.0 Driver Dispatch Engine"]
    P4["4.0 SOS Alert Manager"]
    P5["5.0 Billing & Invoice System"]
    DB[("MongoDB Stores")]
    
    Customer -->|"Add Vehicle & Profile"| P1
    P1 -->|"Write User/Vehicle"| DB
    
    Customer -->|"Request Breakdown Help"| P2
    P2 -->|"Match Nearby Providers"| DB
    P2 -->|"Live Job Status"| Customer
    
    Customer -->|"Book Chauffeur"| P3
    P3 -->|"Filter Available Drivers"| DB
    P3 -->|"Trip Confirmation"| Customer
    
    Customer -->|"Trigger SOS"| P4
    P4 -->|"Log Alert & Notify Contacts"| DB
    
    P2 -->|"Generate Bill"| P5
    P3 -->|"Generate Bill"| P5
    P5 -->|"Save Invoice & Payment"| DB
    P5 -->|"Printable Tax Invoice"| Customer
```

---

### 3. Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ VEHICLE : owns
    USER ||--o{ EMERGENCY_CONTACT : designates
    USER ||--o{ ASSISTANCE_REQUEST : requests
    USER ||--o{ DRIVER_BOOKING : books
    USER ||--o{ SOS_ALERT : triggers
    USER ||--o{ REVIEW : writes
    USER ||--o{ COMPLAINT : files
    
    USER ||--o| DRIVER_PROFILE : has_role_driver
    USER ||--o| PROVIDER_PROFILE : has_role_provider
    
    DRIVER_PROFILE ||--o{ DRIVER_BOOKING : assigned_to
    PROVIDER_PROFILE ||--o{ ASSISTANCE_REQUEST : assigned_to
    
    DRIVER_BOOKING ||--o| PAYMENT : generates
    ASSISTANCE_REQUEST ||--o| PAYMENT : generates
    
    USER {
        ObjectId _id
        string name
        string email
        string password
        string phone
        string role
        string city
    }
    
    VEHICLE {
        ObjectId _id
        ObjectId userId
        string vehicleNumber
        string brand
        string model
        string fuelType
    }
    
    DRIVER_PROFILE {
        ObjectId _id
        ObjectId userId
        string licenseNumber
        number hourlyRate
        number dailyRate
        boolean isAvailable
        string verificationStatus
    }
    
    PROVIDER_PROFILE {
        ObjectId _id
        ObjectId userId
        string businessName
        string serviceType
        number baseCharge
        boolean isAvailable
        string verificationStatus
    }
    
    ASSISTANCE_REQUEST {
        ObjectId _id
        ObjectId userId
        ObjectId vehicleId
        ObjectId providerId
        string serviceType
        string status
        number totalAmount
    }
    
    DRIVER_BOOKING {
        ObjectId _id
        ObjectId userId
        ObjectId vehicleId
        ObjectId driverId
        string bookingType
        string status
        number totalAmount
    }
    
    PAYMENT {
        ObjectId _id
        ObjectId userId
        ObjectId bookingId
        string invoiceNumber
        number amount
        string status
    }
```

---

### 4. Sequence Diagrams

#### 4.1 Roadside Assistance Dispatch Flow
```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant App as Frontend Client
    participant Server as Backend API
    actor Provider as Mechanic / Provider
    participant Socket as Socket.IO Server
    
    Customer->>App: Choose Service (e.g. Battery Jumpstart) & Vehicle
    App->>Server: POST /api/assistance (Location, Problem, Vehicle)
    Server->>Socket: Emit 'new_job_available' to Providers
    Socket->>Provider: Incoming Alert with distance & problem details
    Provider->>Server: PUT /api/assistance/:id/accept
    Server->>Socket: Emit 'job_accepted' to Customer room
    Socket->>App: Notify: "Provider Accepted! On the way"
    Provider->>Socket: Stream 'update_location' (GPS coords)
    Socket->>App: Leaflet Marker animates along route towards Customer
    Provider->>Server: PUT /api/assistance/:id/status ('completed')
    Server->>App: Service completed, prompt payment & review
    Customer->>Server: POST /api/payments/process (UPI / Card)
    Server->>Customer: Printable Tax Invoice generated
```

#### 4.2 On-Demand Driver Booking Flow
```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant App as React App
    participant Server as Express API
    actor Driver as Temporary Driver
    
    Customer->>App: Select Duration (4 Hours), Date, Pickup Location
    App->>Server: GET /api/drivers?vehicleType=Sedan
    Server->>App: Return verified drivers list with ratings & tariffs
    Customer->>App: Select Driver & confirm booking
    App->>Server: POST /api/driver-bookings
    Server->>Driver: Dispatch booking notification
    Driver->>Server: Accept trip & navigate to pickup
    Driver->>Server: Advance status: Driver Arrived -> Trip Started -> Completed
    Customer->>App: Trip completed -> submit 5-star rating & review
```

---

### 5. Use Case Diagram
```mermaid
graph LR
    subgraph Users
        U((Vehicle Owner))
        D((Driver))
        P((Mechanic / Towing))
        A((Super Admin))
    end
    
    subgraph "Platform Use Cases"
        UC1[Manage Vehicles]
        UC2[Request Roadside Assistance]
        UC3[Book Temporary Driver]
        UC4[Trigger Emergency SOS]
        UC5[Live GPS Map Tracking]
        UC6[In-App Real-time Chat]
        UC7[Accept / Advance Jobs]
        UC8[Toggle Availability Status]
        UC9[Verify Driver & Provider Docs]
        UC10[Configure System Pricing & Tariffs]
        UC11[Generate Tax Invoices & Reports]
    end
    
    U --> UC1
    U --> UC2
    U --> UC3
    U --> UC4
    U --> UC5
    U --> UC6
    U --> UC11
    
    D --> UC7
    D --> UC8
    D --> UC5
    D --> UC6
    
    P --> UC7
    P --> UC8
    P --> UC5
    P --> UC6
    
    A --> UC9
    A --> UC10
    A --> UC11
    A --> UC4
```
