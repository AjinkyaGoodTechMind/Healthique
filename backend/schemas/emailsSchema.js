const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailsSchema = new Schema({
  email: { type: Schema.Types.String },
  role: { type: Schema.Types.String },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const emails = mongoose.model("emails", emailsSchema);

module.exports = emails;
