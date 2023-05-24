const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  planId: { type: Schema.Types.ObjectId },
  userId: { type: Schema.Types.ObjectId },
  expireDate: { type: Schema.Types.Date },
  type: { type: Schema.Types.String, enum: ["monthly", "yearly"] },
  status: { type: Schema.Types.String, default: "Active", enum: ["Active", "Expired"] },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const subscription = mongoose.model("subscription", subscriptionSchema);

module.exports = subscription;
