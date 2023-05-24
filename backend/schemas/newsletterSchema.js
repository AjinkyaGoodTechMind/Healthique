const mongoose = require("mongoose");
const { Schema } = mongoose;

const newsletterSchema = new Schema({
  subject: { type: Schema.Types.String },
  body: { type: Schema.Types.String },
  image: { type: Schema.Types.String },
  selectedRoles: [{ type: Schema.Types.String }],
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const newsletter = mongoose.model("newsletter", newsletterSchema);

module.exports = newsletter;
