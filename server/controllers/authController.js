const User = require('../models/User');
const DriverProfile = require('../models/DriverProfile');
const ProviderProfile = require('../models/ProviderProfile');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'help_on_drive_super_secure_jwt_secret_key_2026', {
    expiresIn: '30d'
  });
};

// @desc    Register user / driver / provider
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, city, businessName, serviceType, licenseNumber, experienceYears, hourlyRate } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: role || 'user',
      city: city || 'New Delhi'
    });

    // If driver registered, initialize DriverProfile
    if (user.role === 'driver') {
      await DriverProfile.create({
        userId: user._id,
        licenseNumber: licenseNumber || 'DL-' + Math.floor(10000000 + Math.random() * 90000000),
        experienceYears: Number(experienceYears) || 3,
        vehicleTypesSupported: ['Hatchback', 'Sedan', 'SUV'],
        transmissionTypes: ['Manual', 'Automatic'],
        languages: ['Hindi', 'English'],
        hourlyRate: Number(hourlyRate) || 120,
        dailyRate: 900,
        verificationStatus: 'approved' // auto-approve for seamless testing
      });
    }

    // If service provider registered, initialize ProviderProfile
    if (user.role === 'provider') {
      await ProviderProfile.create({
        userId: user._id,
        businessName: businessName || `${name}'s Auto Care`,
        serviceType: serviceType || 'Mechanic',
        servicesOffered: ['breakdown', 'puncture', 'battery', 'fuel', 'towing', 'lockout', 'repair'],
        experienceYears: Number(experienceYears) || 5,
        baseCharge: 299,
        ratePerKm: 25,
        verificationStatus: 'approved' // auto-approve for seamless testing
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended. Please contact support.' });
    }

    let extraProfile = null;
    if (user.role === 'driver') {
      extraProfile = await DriverProfile.findOne({ userId: user._id });
    } else if (user.role === 'provider') {
      extraProfile = await ProviderProfile.findOne({ userId: user._id });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        avatar: user.avatar,
        profile: extraProfile
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let extraProfile = null;
    if (user.role === 'driver') {
      extraProfile = await DriverProfile.findOne({ userId: user._id });
    } else if (user.role === 'provider') {
      extraProfile = await ProviderProfile.findOne({ userId: user._id });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        address: user.address,
        avatar: user.avatar,
        status: user.status,
        profile: extraProfile
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, city, address, avatar } = req.body;
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (city) user.city = city;
    if (address) user.address = address;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        address: user.address,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, getMe, updateProfile };
