require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const DriverProfile = require('../models/DriverProfile');
const ProviderProfile = require('../models/ProviderProfile');
const AssistanceRequest = require('../models/AssistanceRequest');
const DriverBooking = require('../models/DriverBooking');
const EmergencyContact = require('../models/EmergencyContact');
const Payment = require('../models/Payment');
const Review = require('../models/Review');
const PricingConfig = require('../models/PricingConfig');
const Complaint = require('../models/Complaint');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/help_on_drive';
    await mongoose.connect(mongoUri);
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await DriverProfile.deleteMany({});
    await ProviderProfile.deleteMany({});
    await AssistanceRequest.deleteMany({});
    await DriverBooking.deleteMany({});
    await EmergencyContact.deleteMany({});
    await Payment.deleteMany({});
    await Review.deleteMany({});
    await PricingConfig.deleteMany({});
    await Complaint.deleteMany({});

    console.log('🧹 Old collections wiped clean.');

    // 1. Initialize Pricing Config
    await PricingConfig.create({
      rsa: {
        baseBreakdown: 399,
        basePuncture: 199,
        baseBattery: 349,
        baseFuel: 249,
        baseTowing: 799,
        baseLockout: 449,
        baseRepair: 499,
        ratePerKm: 25,
        emergencySurcharge: 150,
        nightSurcharge: 200,
        taxPercentage: 18
      },
      driver: {
        hourlyRate: 120,
        dailyRate: 900,
        outstationPerDay: 1400,
        platformFeePercentage: 10,
        nightAllowance: 150,
        taxPercentage: 18
      }
    });

    // 2. Admin User
    const admin = await User.create({
      name: 'Help On Drive Admin',
      email: 'admin@helpondrive.com',
      password: 'admin123',
      phone: '+91 9999000111',
      role: 'admin',
      city: 'New Delhi',
      status: 'active'
    });

    // 3. Customer User
    const customer = await User.create({
      name: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      password: 'user123',
      phone: '+91 9876543210',
      role: 'user',
      city: 'New Delhi',
      address: 'B-14, Green Park Extension, New Delhi',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    });

    // Customer's Vehicles
    const car1 = await Vehicle.create({
      userId: customer._id,
      vehicleNumber: 'UP-16-AB-1234',
      vehicleType: 'Hatchback',
      brand: 'Hyundai',
      model: 'i20 Asta',
      fuelType: 'Petrol',
      color: 'Polar White',
      rcNumber: 'RC-HYU-2022-9901',
      isDefault: true
    });

    const car2 = await Vehicle.create({
      userId: customer._id,
      vehicleNumber: 'DL-03-CC-5678',
      vehicleType: 'SUV',
      brand: 'Tata',
      model: 'Nexon Fearless',
      fuelType: 'Diesel',
      color: 'Foliage Green',
      rcNumber: 'RC-TAT-2023-4412',
      isDefault: false
    });

    const car3 = await Vehicle.create({
      userId: customer._id,
      vehicleNumber: 'HR-26-EE-9999',
      vehicleType: 'SUV',
      brand: 'Mahindra',
      model: 'Thar 4x4',
      fuelType: 'Diesel',
      color: 'Napoli Black',
      rcNumber: 'RC-MAH-2021-3321',
      isDefault: false
    });

    // Customer's Emergency Contacts
    await EmergencyContact.create([
      { userId: customer._id, name: 'Ramesh Sharma', relationship: 'Father', phone: '+91 9811122334' },
      { userId: customer._id, name: 'Sunita Sharma', relationship: 'Mother', phone: '+91 9811122335' },
      { userId: customer._id, name: 'Aman Sharma', relationship: 'Brother', phone: '+91 9811122336' },
      { userId: customer._id, name: 'Vikas Gupta', relationship: 'Friend', phone: '+91 9811122337' }
    ]);

    // 4. Drivers
    const driver1User = await User.create({
      name: 'Rajesh Verma',
      email: 'rajesh.driver@helpondrive.com',
      password: 'driver123',
      phone: '+91 9810101011',
      role: 'driver',
      city: 'New Delhi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    });

    const driver1Profile = await DriverProfile.create({
      userId: driver1User._id,
      licenseNumber: 'DL-0420140028192',
      experienceYears: 7,
      vehicleTypesSupported: ['Hatchback', 'Sedan', 'SUV'],
      transmissionTypes: ['Manual', 'Automatic'],
      languages: ['Hindi', 'English', 'Punjabi'],
      hourlyRate: 120,
      dailyRate: 900,
      isAvailable: true,
      verificationStatus: 'approved',
      rating: 4.9,
      totalRatings: 38,
      totalTrips: 142,
      earnings: 28400,
      currentLocation: {
        lat: 28.5672,
        lng: 77.2100,
        address: 'AIIMS Circle, New Delhi'
      }
    });

    const driver2User = await User.create({
      name: 'Vikram Singh',
      email: 'vikram.driver@helpondrive.com',
      password: 'driver123',
      phone: '+91 9810101012',
      role: 'driver',
      city: 'Noida',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    });

    await DriverProfile.create({
      userId: driver2User._id,
      licenseNumber: 'UP-1420160081290',
      experienceYears: 5,
      vehicleTypesSupported: ['Sedan', 'SUV', 'Luxury'],
      transmissionTypes: ['Automatic'],
      languages: ['Hindi', 'English'],
      hourlyRate: 150,
      dailyRate: 1100,
      isAvailable: true,
      verificationStatus: 'approved',
      rating: 4.8,
      totalRatings: 24,
      totalTrips: 89,
      earnings: 19500,
      currentLocation: {
        lat: 28.5355,
        lng: 77.3910,
        address: 'Sector 62, Noida'
      }
    });

    const driver3User = await User.create({
      name: 'Amit Kumar',
      email: 'driver@helpondrive.com', // standard test driver
      password: 'driver123',
      phone: '+91 9810101013',
      role: 'driver',
      city: 'Gurugram',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150'
    });

    await DriverProfile.create({
      userId: driver3User._id,
      licenseNumber: 'HR-2620180091823',
      experienceYears: 4,
      vehicleTypesSupported: ['Hatchback', 'Sedan'],
      transmissionTypes: ['Manual', 'Automatic'],
      languages: ['Hindi'],
      hourlyRate: 110,
      dailyRate: 850,
      isAvailable: true,
      verificationStatus: 'approved',
      rating: 4.7,
      totalRatings: 19,
      totalTrips: 64,
      earnings: 14200,
      currentLocation: {
        lat: 28.4595,
        lng: 77.0266,
        address: 'Cyber Hub, Gurugram'
      }
    });

    // 5. Service Providers
    const provider1User = await User.create({
      name: 'Manoj Mechanic',
      email: 'provider@helpondrive.com', // standard test provider
      password: 'provider123',
      phone: '+91 9820202021',
      role: 'provider',
      city: 'New Delhi',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'
    });

    const provider1Profile = await ProviderProfile.create({
      userId: provider1User._id,
      businessName: 'SpeedFix Express Garage & RSA',
      serviceType: 'Mechanic',
      servicesOffered: ['breakdown', 'puncture', 'battery', 'fuel', 'lockout', 'repair', 'emergency'],
      experienceYears: 9,
      baseCharge: 299,
      ratePerKm: 25,
      isAvailable: true,
      verificationStatus: 'approved',
      rating: 4.9,
      totalRatings: 56,
      totalJobs: 184,
      earnings: 45200,
      workshopAddress: 'Shop 12, Main Ring Road, Lajpat Nagar, New Delhi',
      currentLocation: {
        lat: 28.5670,
        lng: 77.2430,
        address: 'Lajpat Nagar IV, New Delhi'
      }
    });

    const provider2User = await User.create({
      name: 'Sardar Kulvinder Singh',
      email: 'towing@helpondrive.com',
      password: 'provider123',
      phone: '+91 9820202022',
      role: 'provider',
      city: 'New Delhi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    });

    await ProviderProfile.create({
      userId: provider2User._id,
      businessName: '24x7 Falcon Flatbed Heavy Towing',
      serviceType: 'Towing',
      servicesOffered: ['towing', 'breakdown', 'emergency'],
      experienceYears: 12,
      baseCharge: 799,
      ratePerKm: 35,
      isAvailable: true,
      verificationStatus: 'approved',
      rating: 4.8,
      totalRatings: 44,
      totalJobs: 130,
      earnings: 68900,
      workshopAddress: 'Plot 4, Mayapuri Industrial Area Phase 1, New Delhi',
      currentLocation: {
        lat: 28.6328,
        lng: 77.1297,
        address: 'Mayapuri, New Delhi'
      }
    });

    // 6. Sample Completed Roadside Assistance Job
    const sampleRSA = await AssistanceRequest.create({
      userId: customer._id,
      vehicleId: car1._id,
      providerId: provider1User._id,
      serviceType: 'puncture',
      problemDescription: 'Right front tyre punctured while parking near market. Need on-spot replacement with spare tyre.',
      location: {
        address: 'Hauz Khas Market, New Delhi',
        lat: 28.5494,
        lng: 77.2001
      },
      status: 'completed',
      charges: {
        baseCharge: 199,
        distanceCharge: 80,
        serviceCharge: 120,
        gst: 72,
        totalAmount: 471
      },
      paymentStatus: 'paid',
      distanceKm: 3.2,
      etaMinutes: 12,
      timeline: [
        { status: 'pending', note: 'Request submitted' },
        { status: 'accepted', note: 'SpeedFix Express accepted job' },
        { status: 'on_the_way', note: 'Mechanic on the way' },
        { status: 'arrived', note: 'Mechanic arrived at location' },
        { status: 'completed', note: 'Tyre replaced and pressure calibrated successfully' }
      ]
    });

    await Payment.create({
      userId: customer._id,
      bookingId: sampleRSA._id,
      bookingType: 'assistance',
      invoiceNumber: 'HOD-RSA-2026-001',
      amount: 471,
      paymentMethod: 'upi',
      transactionId: 'UPI_981249129841_HOD',
      status: 'success',
      breakdown: {
        baseFare: 199,
        distanceFare: 80,
        driverOrServiceCharge: 120,
        platformFee: 0,
        gst: 72
      }
    });

    await Review.create({
      userId: customer._id,
      targetId: provider1User._id,
      bookingId: sampleRSA._id,
      bookingType: 'assistance',
      rating: 5,
      comment: 'Very fast response! Mechanic arrived within 15 minutes with hydraulic jack and electric wrench. Fixed in no time.',
      aspects: { punctuality: 5, professionalism: 5, serviceQuality: 5 }
    });

    // 7. Sample Completed Driver Booking
    const sampleBooking = await DriverBooking.create({
      userId: customer._id,
      vehicleId: car2._id,
      driverId: driver1User._id,
      bookingType: '4_hours',
      tripType: 'city_commute',
      startDate: new Date().toISOString().split('T')[0],
      startTime: '10:00 AM',
      endDate: new Date().toISOString().split('T')[0],
      durationHours: 4,
      durationDays: 1,
      pickupLocation: {
        address: 'Green Park Extension, New Delhi',
        lat: 28.5583,
        lng: 77.2028
      },
      destinationLocation: {
        address: 'DLF Cyber City, Gurugram',
        lat: 28.4950,
        lng: 77.0890
      },
      status: 'completed',
      fare: {
        rate: 120,
        driverFee: 480,
        platformFee: 50,
        tax: 40,
        totalAmount: 570
      },
      paymentStatus: 'paid',
      timeline: [
        { status: 'pending', note: 'Driver requested' },
        { status: 'accepted', note: 'Rajesh Verma accepted the booking' },
        { status: 'driver_arrived', note: 'Driver arrived at pickup address' },
        { status: 'trip_started', note: 'Trip started in Tata Nexon' },
        { status: 'completed', note: 'Trip ended smoothly' }
      ]
    });

    await Payment.create({
      userId: customer._id,
      bookingId: sampleBooking._id,
      bookingType: 'driver',
      invoiceNumber: 'HOD-DRV-2026-002',
      amount: 570,
      paymentMethod: 'card',
      transactionId: 'CRD_784192841_HOD',
      status: 'success',
      breakdown: {
        baseFare: 480,
        driverOrServiceCharge: 0,
        platformFee: 50,
        gst: 40
      }
    });

    await Review.create({
      userId: customer._id,
      targetId: driver1User._id,
      bookingId: sampleBooking._id,
      bookingType: 'driver',
      rating: 5,
      comment: 'Super polite, drove very safely in heavy Delhi peak traffic. Took great care of my car!',
      aspects: { punctuality: 5, professionalism: 5, serviceQuality: 5 }
    });

    // 8. Sample Complaint
    await Complaint.create({
      userId: customer._id,
      category: 'Booking Issue',
      subject: 'Clarification regarding outstation driver allowance',
      description: 'Wanted to confirm if night allowance is included in multi-day booking calculation.',
      status: 'resolved',
      adminResponse: 'Yes Rahul, night allowance of ₹150/night is automatically factored for multi-day trips staying overnight.'
    });

    console.log('✅ Seed Database populated with complete realistic test data successfully!');
    console.log(`
==================================================
🌟 DEMO LOGIN CREDENTIALS:
==================================================
👑 Admin:
   Email: admin@helpondrive.com
   Password: admin123

👤 Customer (Vehicle Owner):
   Email: rahul@gmail.com
   Password: user123
   (Includes 3 cars: Hyundai i20, Tata Nexon, Mahindra Thar)

👨‍✈️ Driver:
   Email: driver@helpondrive.com  (or rajesh.driver@helpondrive.com)
   Password: driver123

👨‍🔧 Service Provider (Mechanic):
   Email: provider@helpondrive.com
   Password: provider123
==================================================
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
