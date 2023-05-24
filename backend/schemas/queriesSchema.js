const mongoose = require("mongoose");
const { Schema } = mongoose;

const queriesSchema = new Schema({
  name: { type: Schema.Types.String },
  email: { type: Schema.Types.String },
  subject: { type: Schema.Types.String },
  message: { type: Schema.Types.String },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const queries = mongoose.model("queries", queriesSchema);

module.exports = queries;
