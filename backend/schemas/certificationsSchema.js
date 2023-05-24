const mongoose = require("mongoose");
const { Schema } = mongoose;

const certificationsSchema = new Schema({
  title: { type: Schema.Types.String },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const certifications = mongoose.model("certifications", certificationsSchema);

module.exports = certifications;
