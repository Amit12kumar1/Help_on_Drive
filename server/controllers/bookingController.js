const DriverBooking = require('../models/DriverBooking');
const DriverProfile = require('../models/DriverProfile');
const User = require('../models/User');

// @desc    Create a new driver booking
// @route   POST /api/driver-bookings
const createBooking = async (req, res) => {
  try {
    const {
      vehicleId,
      driverId,
      bookingType,
      tripType,
      startDate,
      startTime,
      endDate,
      durationHours,
      durationDays,
      pickupLocation,
      destinationLocation,
      notes
    } = req.body;

    if (!vehicleId || !driverId || !startDate || !startTime || !pickupLocation) {
      return res.status(400).json({ success: false, message: 'Please provide all required booking fields' });
    }

    // Fetch driver profile to compute accurate rate
    const driverProfile = await DriverProfile.findOne({ userId: driverId });
    const hourlyRate = driverProfile ? driverProfile.hourlyRate : 120;
    const dailyRate = driverProfile ? driverProfile.dailyRate : 900;

    let driverFee = 0;
    const hrs = Number(durationHours) || 4;
    const days = Number(durationDays) || 1;

    if (bookingType && bookingType.includes('day')) {
      driverFee = dailyRate * days;
    } else {
      driverFee = hourlyRate * hrs;
    }

    const platformFee = 50;
    const tax = Math.round((driverFee + platformFee) * 0.05); // 5% GST
    const totalAmount = driverFee + platformFee + tax;

    const booking = await DriverBooking.create({
      userId: req.user.id,
      vehicleId,
      driverId,
      bookingType: bookingType || '4_hours',
      tripType: tripType || 'city_commute',
      startDate,
      startTime,
      endDate: endDate || startDate,
      durationHours: hrs,
      durationDays: days,
      pickupLocation,
      destinationLocation: destinationLocation || { address: 'Local City Run', lat: 28.5355, lng: 77.3910 },
      notes: notes || '',
      fare: {
        rate: bookingType && bookingType.includes('day') ? dailyRate : hourlyRate,
        driverFee,
        platformFee,
        tax,
        totalAmount
      },
      status: 'pending',
      timeline: [
        {
          status: 'pending',
          note: 'Booking requested by customer'
        }
      ]
    });

    const populated = await DriverBooking.findById(booking._id)
      .populate('userId', 'name phone email avatar')
      .populate('vehicleId')
      .populate('driverId', 'name phone avatar');

    res.status(201).json({
      success: true,
      message: 'Driver booked successfully!',
      booking: populated
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get bookings of current customer
// @route   GET /api/driver-bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await DriverBooking.find({ userId: req.user.id })
      .populate('vehicleId')
      .populate('driverId', 'name phone avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get bookings assigned to logged-in driver
// @route   GET /api/driver-bookings/driver
const getDriverBookings = async (req, res) => {
  try {
    const bookings = await DriverBooking.find({ driverId: req.user.id })
      .populate('userId', 'name phone email avatar')
      .populate('vehicleId')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/driver-bookings/:id
const getBookingById = async (req, res) => {
  try {
    const booking = await DriverBooking.findById(req.params.id)
      .populate('userId', 'name phone email avatar')
      .populate('vehicleId')
      .populate('driverId', 'name phone avatar');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update driver booking status (accepted -> driver_arrived -> trip_started -> completed -> cancelled)
// @route   PUT /api/driver-bookings/:id/status
const updateBookingStatus = async (req, res) => {
  try {
    const { status, note, driverLocation } = req.body;
    const booking = await DriverBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;
    if (driverLocation) {
      booking.driverCurrentLocation = driverLocation;
    }

    booking.timeline.push({
      status,
      note: note || `Status updated to ${status.replace(/_/g, ' ')}`
    });

    if (status === 'completed') {
      await DriverProfile.findOneAndUpdate(
        { userId: booking.driverId },
        {
          $inc: {
            totalTrips: 1,
            earnings: booking.fare.driverFee
          }
        }
      );
    }

    await booking.save();

    const populated = await DriverBooking.findById(booking._id)
      .populate('userId', 'name phone email avatar')
      .populate('vehicleId')
      .populate('driverId', 'name phone avatar');

    res.json({ success: true, message: `Booking status updated to ${status}`, booking: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getDriverBookings,
  getBookingById,
  updateBookingStatus
};
