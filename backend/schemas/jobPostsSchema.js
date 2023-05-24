const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobPostsSchema = new Schema({
  postId: { type: Schema.Types.String },
  customerId: { type: Schema.Types.ObjectId },
  customerId2: { type: Schema.Types.String },
  title: { type: Schema.Types.String },
  location: { type: Schema.Types.String },
  state: { type: Schema.Types.String },
  city: { type: Schema.Types.String },
  budget: { type: Schema.Types.String },
  date: { type: Schema.Types.String },
  industry: { type: Schema.Types.String },
  certificationRequired: { type: Schema.Types.String },
  specificRequirements: { type: Schema.Types.String },
  reportDelivery: { type: Schema.Types.String },
  parametersRequired: { type: Schema.Types.String },
  minPersonCount: { type: Schema.Types.String },
  maxPersonCount: { type: Schema.Types.String },
  lastQuotationDate: { type: Schema.Types.String },
  approvalStatus: { type: Schema.Types.String, default: "pending", enum: ["pending", "rejected", "approved", "expired"] },
  isQuotationAccepted: { type: Schema.Types.Boolean, default: "false" },
  acceptedQuotationDetails: {
    quotation: { type: Schema.Types.String },
    status: { type: Schema.Types.String },
    createdAt: { type: Schema.Types.Date },
  },
  vendorDetails: {
    _id: { type: Schema.Types.ObjectId },
    username: { type: Schema.Types.String },
    email: { type: Schema.Types.String },
    contactNumber: { type: Schema.Types.Number },
  },
  isSpocDetailsSubmitted: { type: Schema.Types.Boolean, default: "false" },
  spocDetails: {
    name: { type: Schema.Types.String },
    email: { type: Schema.Types.String },
    contact: { type: Schema.Types.Number },
  },
  rejectedReason: { type: Schema.Types.String },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const jobPosts = mongoose.model("jobPosts", jobPostsSchema);

module.exports = jobPosts;
