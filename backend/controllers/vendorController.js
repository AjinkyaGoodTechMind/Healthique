const UserSchema = require("../schemas/userSchema");
const JobPostsSchema = require("../schemas/jobPostsSchema");
const BidsSchema = require("../schemas/bidsSchema");
const createError = require("http-errors");

const vendorController = {
  vendorFeaturedInfo: async (req, res, next) => {
    try {
      const postedQuotations = await BidsSchema.find({ vendorId: req.user._id });

      const postedQuotationsCount = postedQuotations.length;

      const acceptedQuotations = postedQuotations.filter((e) => e.status === "accepted");

      const acceptedQuotationsCount = acceptedQuotations.length;

      const pendingQuotations = postedQuotations.filter((e) => e.status === "pending");

      const pendingQuotationsCount = pendingQuotations.length;

      res.status(200).json({ postedQuotationsCount, acceptedQuotationsCount, pendingQuotationsCount });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  allPostedQuotations: async (req, res, next) => {
    try {
      const postedQuotations = await BidsSchema.find({ vendorId: req.user._id });

      res.status(200).json(postedQuotations);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  acceptedQuotations: async (req, res, next) => {
    try {
      const postedQuotations = await BidsSchema.find({ vendorId: req.user._id });

      const acceptedQuotations = postedQuotations.filter((e) => e.status === "accepted");

      res.status(200).json(acceptedQuotations);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  pendingQuotations: async (req, res, next) => {
    try {
      const postedQuotations = await BidsSchema.find({ vendorId: req.user._id });

      const pendingQuotations = postedQuotations.filter((e) => e.status === "pending");

      res.status(200).json(pendingQuotations);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = vendorController;
