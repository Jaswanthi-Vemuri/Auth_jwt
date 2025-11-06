const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SwapRequestSchema = new Schema({
  requesterId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  recipientId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  mySlotId: { type: Schema.Types.ObjectId, ref: 'events', required: true },
  theirSlotId: { type: Schema.Types.ObjectId, ref: 'events', required: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' }
}, { timestamps: true });

const SwapRequestModel = mongoose.model('swaprequests', SwapRequestSchema);
module.exports = SwapRequestModel;
