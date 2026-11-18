/**
 * Help on Drive - Standalone Local Storage Engine & Mock Data
 */

(function () {
  const DEFAULT_USERS = {
    user: {
      id: 'usr_001',
      name: 'Rahul Sharma',
      email: 'user@helpondrive.com',
      role: 'user',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
    },
    provider: {
      id: 'prv_001',
      name: 'Manoj Mechanic',
      email: 'provider@helpondrive.com',
      role: 'provider',
      phone: '+91 98202 02021',
      company: 'SpeedFix Express Garage & Towing',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'
    },
    driver: {
      id: 'drv_001',
      name: 'Rajesh Verma',
      email: 'driver@helpondrive.com',
      role: 'driver',
      phone: '+91 98101 01011',
      experience: '7 Years Pro Chauffeur',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    admin: {
      id: 'adm_001',
      name: 'Help on Drive SuperAdmin',
      email: 'admin@helpondrive.com',
      role: 'admin',
      phone: '+91 99990 00111',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    }
  };

  const DEFAULT_VEHICLES = [
    {
      id: 'veh_01',
      brand: 'Hyundai',
      model: 'i20 Asta',
      number: 'UP-16-AB-1234',
      type: 'Hatchback',
      fuel: 'Petrol',
      color: 'Polar White',
      isDefault: true
    },
    {
      id: 'veh_02',
      brand: 'Tata',
      model: 'Nexon Fearless',
      number: 'DL-03-CC-5678',
      type: 'SUV',
      fuel: 'Diesel',
      color: 'Foliage Green',
      isDefault: false
    },
    {
      id: 'veh_03',
      brand: 'Mahindra',
      model: 'Thar 4x4',
      number: 'HR-26-EE-9999',
      type: 'SUV',
      fuel: 'Diesel',
      color: 'Napoli Black',
      isDefault: false
    }
  ];

  const DEFAULT_SERVICES = [
    { id: 'puncture', name: 'Flat Tyre / Puncture Repair', icon: '🛞', basePrice: 199, image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&q=80', desc: 'Tubeless puncture plugging or spare wheel mounting' },
    { id: 'battery', name: 'Battery Jumpstart', icon: '⚡', basePrice: 349, image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&q=80', desc: 'Heavy-duty 12V terminal jumpstart & alternator check' },
    { id: 'fuel', name: 'Emergency Fuel Delivery', icon: '⛽', basePrice: 249, image: 'https://images.unsplash.com/photo-1527018607119-e33e13707f57?w=400&q=80', desc: '5 Litres petrol or diesel delivered directly to your stranded car' },
    { id: 'towing', name: 'Flatbed Tow Truck', icon: '🚛', basePrice: 799, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80', desc: 'Hydraulic ramp flatbed towing to certified garage' },
    { id: 'lockout', name: 'Key Lockout Assistance', icon: '🔑', basePrice: 449, image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&q=80', desc: 'Non-damaging car door entry & ignition key retrieval' },
    { id: 'repair', name: 'Minor On-Spot Repair', icon: '🔧', basePrice: 499, image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80', desc: 'Radiator hose, fuse, brake pad or fan belt emergency servicing' }
  ];

  const DEFAULT_BOOKINGS = [
    {
      id: 'HOD-RSA-8821',
      type: 'assistance',
      serviceType: 'Flat Tyre / Puncture Repair',
      vehicle: { brand: 'Hyundai', model: 'i20 Asta', number: 'UP-16-AB-1234' },
      provider: DEFAULT_USERS.provider,
      location: { address: 'Hauz Khas Enclave, Outer Ring Road, New Delhi', lat: 28.5494, lng: 77.2001 },
      status: 'on_the_way',
      charges: { base: 199, distance: 100, platform: 50, gst: 63, total: 412 },
      paymentStatus: 'pending',
      paymentMethod: 'UPI (Pending Settle)',
      createdAt: 'Today, 10:45 AM'
    },
    {
      id: 'HOD-DRV-4412',
      type: 'driver',
      serviceType: '4 Hours Chauffeur Duty',
      vehicle: { brand: 'Tata', model: 'Nexon Fearless', number: 'DL-03-CC-5678' },
      driver: DEFAULT_USERS.driver,
      location: { address: 'DLF Cyber City to New Delhi Airport (T3)', lat: 28.4595, lng: 77.0266 },
      status: 'completed',
      charges: { base: 480, distance: 0, platform: 50, gst: 95, total: 625 },
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card (Paid)',
      createdAt: 'Yesterday, 02:15 PM'
    },
    {
      id: 'HOD-RSA-1109',
      type: 'assistance',
      serviceType: 'Battery Jumpstart & Health Test',
      vehicle: { brand: 'Mahindra', model: 'Thar 4x4', number: 'HR-26-EE-9999' },
      provider: DEFAULT_USERS.provider,
      location: { address: 'Yamuna Expressway Mile 28, Noida Sector 128', lat: 28.5355, lng: 77.3910 },
      status: 'completed',
      charges: { base: 349, distance: 150, platform: 50, gst: 99, total: 648 },
      paymentStatus: 'paid',
      paymentMethod: 'Cash to Mechanic (Paid)',
      createdAt: '14 Nov 2026, 06:30 PM'
    }
  ];

  const DEFAULT_STATIONS = [
    {
      id: 'pump_01',
      type: 'petrol',
      name: 'Indian Oil (IOCL) 24x7 Highway Care',
      brand: 'IndianOil',
      address: 'Outer Ring Road, Near Hauz Khas Metro Gate 2',
      lat: 28.5520,
      lng: 77.2060,
      distance: '0.8 km',
      rates: { petrol: '₹96.72', diesel: '₹89.62', cng: '₹79.20' },
      amenities: ['Free Nitrogen Air', 'Automated Car Wash', '24x7 Convenience Store', 'ATM'],
      rating: 4.8,
      status: 'Open 24 Hours'
    },
    {
      id: 'ev_01',
      type: 'ev',
      name: 'Tata Power EZ Charge (60kW DC Fast)',
      brand: 'Tata Power',
      address: 'Commercial Complex Parking, Hauz Khas Market',
      lat: 28.5540,
      lng: 77.2100,
      distance: '1.2 km',
      ports: 'CCS-2 (60kW) & Type-2 (22kW)',
      availableGuns: '3 of 4 Guns Free',
      ratePerKwh: '₹18.00 / kWh',
      amenities: ['Ultra Fast Charging', 'Coffee Lounge', 'Restrooms', 'Security'],
      rating: 4.9,
      status: 'Operational (Fast Charger)'
    },
    {
      id: 'pump_02',
      type: 'petrol',
      name: 'Bharat Petroleum (BPCL) SpeedHub',
      brand: 'BPCL',
      address: 'Mehrauli-Gurgaon Road, Opp. Qutub Minar Crossing',
      lat: 28.5430,
      lng: 77.1950,
      distance: '1.4 km',
      rates: { petrol: '₹96.75', diesel: '₹89.65', speed97: '₹108.50' },
      amenities: ['High Octane Speed97', 'Quick Tyre Pressure Check', 'EV Slow Charger'],
      rating: 4.7,
      status: 'Open 24 Hours'
    },
    {
      id: 'ev_02',
      type: 'ev',
      name: 'Statiq Dual-Gun 120kW Supercharger',
      brand: 'Statiq',
      address: 'DLF South Court Multi-Level Parking Level B1',
      lat: 28.5410,
      lng: 77.2080,
      distance: '2.1 km',
      ports: 'Dual CCS-2 (120kW Fast)',
      availableGuns: '2 of 2 Guns Free',
      ratePerKwh: '₹19.50 / kWh',
      amenities: ['Mall Food Court Access', 'Covered Basement Bay', 'App-Based Pay'],
      rating: 4.8,
      status: 'Operational (Supercharger)'
    },
    {
      id: 'pump_03',
      type: 'petrol',
      name: 'HP Auto Care Express Service Station',
      brand: 'HPCL',
      address: 'AIIMS Ring Road Flyover Exit, New Delhi',
      lat: 28.5600,
      lng: 77.2150,
      distance: '2.3 km',
      rates: { petrol: '₹96.70', diesel: '₹89.60', powerPetrol: '₹102.00' },
      amenities: ['Club HP Lounge', 'Wheel Alignment', 'Highway Emergency Spares'],
      rating: 4.6,
      status: 'Open 24 Hours'
    },
    {
      id: 'ev_03',
      type: 'ev',
      name: 'Jio-bp pulse Highway Fast EV Hub',
      brand: 'Jio-bp pulse',
      address: 'Near Green Park Main Market Boulevard',
      lat: 28.5650,
      lng: 77.1980,
      distance: '3.2 km',
      ports: 'CCS-2 (30kW DC) & Bharat AC-001',
      availableGuns: '1 of 2 Guns Free',
      ratePerKwh: '₹17.50 / kWh',
      amenities: ['Wild Bean Café', 'Clean Washrooms', 'Free Wi-Fi'],
      rating: 4.7,
      status: 'Operational (Fast Charger)'
    }
  ];

  const DEFAULT_SOS_ALERTS = [
    {
      id: 'SOS-9912',
      userName: 'Rahul Sharma',
      phone: '+91 98765 43210',
      location: 'Yamuna Expressway (KM 42.5), Greater Noida',
      lat: 28.3245,
      lng: 77.5432,
      time: '15 mins ago',
      status: 'Police & Ambulance Dispatched'
    }
  ];

  // Initialize LocalStorage if empty
  function initStorage() {
    if (!localStorage.getItem('hod_current_role')) {
      localStorage.setItem('hod_current_role', 'user');
    }
    if (!localStorage.getItem('hod_vehicles')) {
      localStorage.setItem('hod_vehicles', JSON.stringify(DEFAULT_VEHICLES));
    }
    if (!localStorage.getItem('hod_bookings')) {
      localStorage.setItem('hod_bookings', JSON.stringify(DEFAULT_BOOKINGS));
    }
    if (!localStorage.getItem('hod_stations')) {
      localStorage.setItem('hod_stations', JSON.stringify(DEFAULT_STATIONS));
    }
    if (!localStorage.getItem('hod_sos_alerts')) {
      localStorage.setItem('hod_sos_alerts', JSON.stringify(DEFAULT_SOS_ALERTS));
    }
    if (!localStorage.getItem('hod_reviews')) {
      localStorage.setItem('hod_reviews', JSON.stringify([]));
    }

    // Restore any custom registered user profiles
    ['user', 'provider', 'driver'].forEach(r => {
      const saved = localStorage.getItem('hod_user_' + r);
      if (saved) {
        try {
          DEFAULT_USERS[r] = JSON.parse(saved);
        } catch (e) {}
      }
    });
  }

  initStorage();

  // Public API attached to window.HOD
  window.HOD = {
    USERS: DEFAULT_USERS,
    SERVICES: DEFAULT_SERVICES,
    STATIONS: DEFAULT_STATIONS,

    getStations: function (filter = 'all') {
      const stations = JSON.parse(localStorage.getItem('hod_stations') || JSON.stringify(DEFAULT_STATIONS));
      if (filter === 'petrol') return stations.filter(s => s.type === 'petrol');
      if (filter === 'ev') return stations.filter(s => s.type === 'ev');
      return stations;
    },

    getCurrentRole: function () {
      return localStorage.getItem('hod_current_role') || 'user';
    },

    getCurrentUser: function () {
      const role = this.getCurrentRole();
      return DEFAULT_USERS[role] || DEFAULT_USERS.user;
    },

    switchRole: function (newRole) {
      if (DEFAULT_USERS[newRole]) {
        localStorage.setItem('hod_current_role', newRole);
        window.location.reload();
      }
    },

    getVehicles: function () {
      return JSON.parse(localStorage.getItem('hod_vehicles') || '[]');
    },

    addVehicle: function (vehicle) {
      const vehicles = this.getVehicles();
      const newVeh = {
        id: 'veh_' + Date.now().toString().slice(-4),
        ...vehicle
      };
      vehicles.push(newVeh);
      localStorage.setItem('hod_vehicles', JSON.stringify(vehicles));
      return newVeh;
    },

    deleteVehicle: function (id) {
      const vehicles = this.getVehicles().filter(v => v.id !== id);
      localStorage.setItem('hod_vehicles', JSON.stringify(vehicles));
    },

    getBookings: function () {
      return JSON.parse(localStorage.getItem('hod_bookings') || '[]');
    },

    getActiveBooking: function () {
      const bookings = this.getBookings();
      return bookings.length > 0 ? bookings[0] : null;
    },

    createBooking: function (bookingData) {
      const bookings = this.getBookings();
      const newBooking = {
        id: 'HOD-' + (bookingData.type === 'driver' ? 'DRV-' : 'RSA-') + Math.floor(Math.random() * 8999 + 1000),
        status: 'pending',
        createdAt: new Date().toISOString(),
        paymentStatus: 'pending',
        ...bookingData
      };
      bookings.unshift(newBooking);
      localStorage.setItem('hod_bookings', JSON.stringify(bookings));
      return newBooking;
    },

    updateBookingStatus: function (id, status) {
      const bookings = this.getBookings();
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        booking.status = status;
        localStorage.setItem('hod_bookings', JSON.stringify(bookings));
      }
      return booking;
    },

    updatePaymentStatus: function (id, status) {
      const bookings = this.getBookings();
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        booking.paymentStatus = status;
        localStorage.setItem('hod_bookings', JSON.stringify(bookings));
      }
      return booking;
    },

    getSOSAlerts: function () {
      return JSON.parse(localStorage.getItem('hod_sos_alerts') || '[]');
    },

    triggerSOS: function (lat, lng, address) {
      const alerts = this.getSOSAlerts();
      const user = this.getCurrentUser();
      const newAlert = {
        id: 'SOS-' + Math.floor(Math.random() * 8999 + 1000),
        userName: user.name,
        phone: user.phone,
        location: address || 'Highway GPS Coordinate Alert',
        lat: lat || 28.5494,
        lng: lng || 77.2001,
        time: 'Just now',
        status: 'Police & Ambulance Dispatched'
      };
      alerts.unshift(newAlert);
      localStorage.setItem('hod_sos_alerts', JSON.stringify(alerts));
      return newAlert;
    },

    addReview: function (review) {
      const reviews = JSON.parse(localStorage.getItem('hod_reviews') || '[]');
      reviews.unshift({
        id: 'rev_' + Date.now(),
        date: new Date().toLocaleDateString(),
        ...review
      });
      localStorage.setItem('hod_reviews', JSON.stringify(reviews));
    },

    registerUser: function (data) {
      const role = data.role || 'user';
      const rolePrefix = role === 'driver' ? 'drv_' : role === 'provider' ? 'prv_' : 'usr_';
      const newUser = {
        id: rolePrefix + Date.now().toString().slice(-4),
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: role,
        avatar: data.avatar || (role === 'driver' 
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
          : role === 'provider'
          ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'),
        city: data.city || 'New Delhi',
        company: data.businessName || (role === 'provider' ? `${data.name}'s Garage` : undefined),
        experience: data.experience ? `${data.experience} Years Pro` : undefined,
        rating: 5.0,
        ...data
      };

      // Save user
      this.USERS[role] = newUser;
      localStorage.setItem('hod_user_' + role, JSON.stringify(newUser));
      localStorage.setItem('hod_current_role', role);

      // If customer provided initial car, add to garage
      if (role === 'user' && data.vehicleBrand && data.vehicleNumber) {
        this.addVehicle({
          brand: data.vehicleBrand,
          model: data.vehicleModel || 'Standard',
          number: data.vehicleNumber.toUpperCase(),
          type: data.vehicleType || 'Hatchback',
          fuel: data.fuelType || 'Petrol',
          color: data.vehicleColor || 'Standard',
          isDefault: true
        });
      }

      // Record in registered directory
      const directory = JSON.parse(localStorage.getItem('hod_registered_directory') || '[]');
      directory.unshift({
        id: newUser.id,
        name: newUser.name,
        role: role,
        email: newUser.email,
        phone: newUser.phone,
        businessName: data.businessName || '-',
        license: data.licenseNumber || '-',
        registeredAt: new Date().toLocaleDateString()
      });
      localStorage.setItem('hod_registered_directory', JSON.stringify(directory));

      return { success: true, user: newUser };
    }
  };
})();
