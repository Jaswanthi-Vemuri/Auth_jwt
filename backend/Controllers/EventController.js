const Event = require("../Models/Event");

// Create event
exports.createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    const event = new Event({ title, startTime, endTime, status: "BUSY", userId: req.user._id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err });
  }
};
// Get my events
exports.getMyEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user._id });
  res.json(events);
};
// Update event status (e.g. SWAPPABLE)
exports.updateEventStatus = async (req, res) => {
  const { status } = req.body;
  const updated = await Event.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { status },
    { new: true }
  );
  res.json(updated);
};
