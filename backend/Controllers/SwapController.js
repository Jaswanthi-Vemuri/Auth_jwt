const Event = require("../Models/Event");
const SwapRequest = require("../Models/SwapRequest");

// Marketplace: Get all swappable slots (except my own)
exports.getSwappableSlots = async (req, res) => {
  const slots = await Event.find({ status: 'SWAPPABLE', userId: { $ne: req.user._id } });
  res.json(slots);
};

// POST /swap-request
exports.requestSwap = async (req, res) => {
  const { mySlotId, theirSlotId } = req.body;
  const mySlot = await Event.findOne({ _id: mySlotId, userId: req.user._id, status: "SWAPPABLE" });
  const theirSlot = await Event.findOne({ _id: theirSlotId, status: "SWAPPABLE" });

  if (!mySlot || !theirSlot) return res.status(400).json({ message: "Invalid slots" });

  const swapRequest = new SwapRequest({
    requesterId: req.user._id,
    recipientId: theirSlot.userId,
    mySlotId,
    theirSlotId,
    status: "PENDING"
  });
  mySlot.status = 'SWAP_PENDING';
  theirSlot.status = 'SWAP_PENDING';
  await Promise.all([swapRequest.save(), mySlot.save(), theirSlot.save()]);
  res.status(201).json(swapRequest);
};

// POST /swap-response/:requestId
exports.swapResponse = async (req, res) => {
  const { accepted } = req.body;
  const swapRequest = await SwapRequest.findById(req.params.requestId);
  if (!swapRequest || String(swapRequest.recipientId) !== String(req.user._id))
    return res.status(403).json({ message: "Forbidden" });

  const mySlot = await Event.findById(swapRequest.mySlotId);
  const theirSlot = await Event.findById(swapRequest.theirSlotId);

  if (accepted) {
    swapRequest.status = "ACCEPTED";
    // swap userId
    const temp = mySlot.userId;
    mySlot.userId = theirSlot.userId;
    theirSlot.userId = temp;
    mySlot.status = "BUSY";
    theirSlot.status = "BUSY";
  } else {
    swapRequest.status = "REJECTED";
    mySlot.status = "SWAPPABLE";
    theirSlot.status = "SWAPPABLE";
  }

  await Promise.all([swapRequest.save(), mySlot.save(), theirSlot.save()]);
  res.json(swapRequest);
};

// Get my outgoing/incoming requests (for notification UX)
exports.getRequests = async (req, res) => {
  const incoming = await SwapRequest.find({ recipientId: req.user._id });
  const outgoing = await SwapRequest.find({ requesterId: req.user._id });
  res.json({ incoming, outgoing });
};
