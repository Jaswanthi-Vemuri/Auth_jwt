const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['BUSY', 'SWAPPABLE', 'SWAP_PENDING'], default: 'BUSY' },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

const EventModel = mongoose.model('events', EventSchema);
module.exports = EventModel;
