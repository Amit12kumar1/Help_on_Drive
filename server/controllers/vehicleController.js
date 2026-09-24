const Vehicle = require('../models/Vehicle');

// @desc    Get all vehicles for current user
// @route   GET /api/vehicles
const getMyVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: vehicles.length, vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a vehicle
// @route   POST /api/vehicles
const addVehicle = async (req, res) => {
  try {
    const { vehicleNumber, vehicleType, brand, model, fuelType, color, rcNumber, isDefault } = req.body;

    if (!vehicleNumber || !brand || !model) {
      return res.status(400).json({ success: false, message: 'Please provide vehicle number, brand, and model' });
    }

    // If marked default, unmark others
    if (isDefault) {
      await Vehicle.updateMany({ userId: req.user.id }, { isDefault: false });
    }

    const vehicle = await Vehicle.create({
      userId: req.user.id,
      vehicleNumber: vehicleNumber.toUpperCase().trim(),
      vehicleType: vehicleType || 'Sedan',
      brand,
      model,
      fuelType: fuelType || 'Petrol',
      color: color || 'White',
      rcNumber: rcNumber || '',
      isDefault: Boolean(isDefault)
    });

    res.status(201).json({ success: true, message: 'Vehicle added successfully', vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
const updateVehicle = async (req, res) => {
  try {
    let vehicle = await Vehicle.findOne({ _id: req.params.id, userId: req.user.id });
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    if (req.body.isDefault) {
      await Vehicle.updateMany({ userId: req.user.id }, { isDefault: false });
    }

    vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Vehicle updated successfully', vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    res.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMyVehicles, addVehicle, updateVehicle, deleteVehicle };
