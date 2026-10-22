const Trip = require('../models/Trip');
const { generateTripPlan } = require('../services/aiService');

const generateTrip = async (req, res) => {
  try {
    const { source, destination, budget, numberOfDays, numberOfPeople, preferences } = req.body;

    if (!source || !destination || !budget || !numberOfDays || !numberOfPeople)
      return res.status(400).json({ message: 'All trip details are required' });

    const budgetCategory =
      budget / numberOfPeople < 5000
        ? 'budget'
        : budget / numberOfPeople < 15000
        ? 'mid-range'
        : 'luxury';

    const generatedPlan = await generateTripPlan({
      source, destination, budget, numberOfDays, numberOfPeople,
      preferences: preferences || [],
    });

    const trip = await Trip.create({
      userId: req.user ? req.user._id : null,
      source, destination, budget, budgetCategory,
      numberOfDays, numberOfPeople,
      preferences: preferences || [],
      generatedPlan,
    });

    if (req.user) {
      const User = require('../models/User');
      await User.findByIdAndUpdate(req.user._id, { $push: { savedTrips: trip._id } });
    }

    res.status(201).json(trip);
  } catch (error) {
    console.error('Trip generation error:', {
      name: error.name,
      status: error.status,
      code: error.code,
      message: error.message,
    });
    res.status(500).json({ message: error.message || 'Failed to generate trip plan' });
  }
};

const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userId && trip.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await Trip.findByIdAndDelete(req.params.id);
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user._id, { $pull: { savedTrips: req.params.id } });

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateTrip, getMyTrips, getTripById, deleteTrip };
