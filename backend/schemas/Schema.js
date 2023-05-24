const mongoose = require("mongoose");
const { Schema } = mongoose;

const bidsSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId },
  vendorId2: { type: Schema.Types.String },
  postId: { type: Schema.Types.ObjectId },
  postId2: { type: Schema.Types.String },
  quotation: { type: Schema.Types.String },
  status: { type: Schema.Types.String, default: "pending", enum: ["pending", "rejected", "accepted"] },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const bids = mongoose.model("bids", bidsSchema);

module.exports = bids;
