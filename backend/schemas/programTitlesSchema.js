const mongoose = require("mongoose");
const { Schema } = mongoose;

const programTitlesSchema = new Schema({
  title: { type: Schema.Types.String },
  image: { type: Schema.Types.String },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const programTitles = mongoose.model("programTitles", programTitlesSchema);

module.exports = programTitles;
