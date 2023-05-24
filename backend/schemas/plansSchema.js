const mongoose = require("mongoose");
const { Schema } = mongoose;

const plansSchema = new Schema({
  title: { type: Schema.Types.String },
  description: { type: Schema.Types.String },
  features: [{ type: Schema.Types.String }],
  monthlyPrice: { type: Schema.Types.Number },
  yearlyPrice: { type: Schema.Types.Number },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const plans = mongoose.model("plans", plansSchema);

module.exports = plans;
