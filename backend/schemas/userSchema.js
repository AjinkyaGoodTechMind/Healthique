const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: Schema.Types.String },
  username: { type: Schema.Types.String },
  email: { type: Schema.Types.String },
  contactNumber: { type: Schema.Types.Number },
  role: { type: Schema.Types.String, default: "customer", enum: ["vendor", "customer", "admin"] },
  password: { type: Schema.Types.String },

  profilePic: { type: Schema.Types.String },

  companyName: { type: Schema.Types.String, default: "" },
  address: { type: Schema.Types.String, default: "" },
  gstNo: { type: Schema.Types.String, default: "" },
  landlineNo: { type: Schema.Types.String, default: "" },
  altContactNumber: { type: Schema.Types.String, default: "" },

  concernPersonName: { type: Schema.Types.String, default: "" },
  concernPersonDesignation: { type: Schema.Types.String, default: "" },
  concernPersonContactNumber: { type: Schema.Types.String, default: "" },
  concernPersonEmail: { type: Schema.Types.String, default: "" },

  authoriedPersonName: { type: Schema.Types.String, default: "" },
  authoriedPersonDesignation: { type: Schema.Types.String, default: "" },
  authoriedPersonContactNumber: { type: Schema.Types.String, default: "" },
  authoriedPersonEmail: { type: Schema.Types.String, default: "" },

  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
