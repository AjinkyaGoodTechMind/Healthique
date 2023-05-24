const UserSchema = require("../schemas/userSchema");
const JobPostsSchema = require("../schemas/jobPostsSchema");
const BidsSchema = require("../schemas/bidsSchema");
const ProgramTitlesSchema = require("../schemas/programTitlesSchema");
const CertificationSchema = require("../schemas/certificationsSchema");
const createError = require("http-errors");

const customerController = {
  customerFeaturedInfo: async (req, res, next) => {
    try {
      const postedPrograms = await JobPostsSchema.find({ customerId: req.user._id });

      const postedProgramsCount = postedPrograms.length;

      const quotation = await BidsSchema.find();

      let customerQuotations = [];

      for (i = 0; i < postedPrograms.length; i++) {
        let newQuotation = quotation.filter((e) => e.postId.toString() === postedPrograms[i]._id.toString());

        customerQuotations = [...customerQuotations, ...newQuotation];
      }

      const totalQuotationsCount = customerQuotations.length;

      const acceptedQuotations = customerQuotations.filter((e) => e.status === "accepted");

      const acceptedQuotationsCount = acceptedQuotations.length;

      const pendingQuotations = customerQuotations.filter((e) => e.status === "pending");

      const pendingQuotationsCount = pendingQuotations.length;

      res.status(200).json({ totalQuotationsCount, acceptedQuotationsCount, pendingQuotationsCount });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  allPostedPrograms: async (req, res, next) => {
    try {
      const postedPrograms = await JobPostsSchema.find({ customerId: req.user._id });

      res.status(200).json(postedPrograms);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  acceptedQuotations: async (req, res, next) => {
    try {
      const quotation = await BidsSchema.find();

      const postedPrograms = await JobPostsSchema.find({ customerId: req.user._id });

      let customerQuotations = [];

      for (i = 0; i < postedPrograms.length; i++) {
        let newQuotation = quotation.filter((e) => e.postId.toString() === postedPrograms[i]._id.toString());

        customerQuotations = [...customerQuotations, ...newQuotation];
      }

      const acceptedQuotations = customerQuotations.filter((e) => e.status === "accepted");

      res.status(200).json(acceptedQuotations);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  pendingQuotations: async (req, res, next) => {
    try {
      const quotation = await BidsSchema.find();

      const postedPrograms = await JobPostsSchema.find({ customerId: req.user._id });

      let customerQuotations = [];

      for (i = 0; i < postedPrograms.length; i++) {
        let newQuotation = quotation.filter((e) => e.postId.toString() === postedPrograms[i]._id.toString());

        customerQuotations = [...customerQuotations, ...newQuotation];
      }

      const pendingQuotations = customerQuotations.filter((e) => e.status === "pending");

      res.status(200).json(pendingQuotations);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getProgramTitles: async (req, res, next) => {
    try {
      const programTitles = await ProgramTitlesSchema.find();
      const certifications = await CertificationSchema.find();

      res.status(200).json({ programTitles, certifications });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = customerController;
