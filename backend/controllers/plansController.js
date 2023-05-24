const UserSchema = require("../schemas/userSchema");
const JobPostsSchema = require("../schemas/jobPostsSchema");
const PlansSchema = require("../schemas/plansSchema");
const SubscriptionSchema = require("../schemas/subscriptionSchema");
const createError = require("http-errors");
const sdk = require("api")("@cashfreedocs-new/v3#3xydlzglh91har8");

const plansController = {
  getPlans: async (req, res, next) => {
    try {
      const plans = await PlansSchema.find();

      res.status(200).json(plans);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  postPlans: async (req, res, next) => {
    try {
      const plans = await PlansSchema.create({ ...req.body });

      res.status(200).json(plans);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
  updatePlans: async (req, res, next) => {
    try {
      const plans = await PlansSchema.findOneAndUpdate({ _id: req.body.planId }, { $set: { ...req.body } });

      res.status(200).json(plans);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getSubscriptionAdmin: async (req, res, next) => {
    try {
      const subscripion = await SubscriptionSchema.find();

      res.status(200).json(subscripion);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getSubscription: async (req, res, next) => {
    try {
      const subscripion = await SubscriptionSchema.find({ userId: req.user._id });

      res.status(200).json(subscripion);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  postSubscription: async (req, res, next) => {
    try {
      const userSubscription = await SubscriptionSchema.findOne({ userId: req.user._id });

      if (userSubscription) {
        const subscripion = await SubscriptionSchema.findOneAndUpdate({ userId: req.user._id }, { $set: { ...req.body, status: "Active" } });
        res.status(200).json(subscripion);
      } else {
        const subscripion = await SubscriptionSchema.create({ userId: req.user._id, ...req.body });
        res.status(200).json(subscripion);
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  updateSubscription: async (req, res, next) => {
    try {
      const subscripion = await SubscriptionSchema.findOneAndUpdate({ userId: req.user._id }, { $set: { ...req.body } });

      res.status(200).json(subscripion);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  createPayment: async (req, res, next) => {
    try {
      sdk
        .createOrder(
          { ...req.body },
          {
            "x-client-id": "TEST373737442c2e23a66174fa3a56737373",
            "x-client-secret": "TEST3b761ec269b5143e6442644bcd4b92535aa01a3d",
            "x-api-version": "2022-09-01",
          }
        )
        .then(({ data }) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = plansController;
