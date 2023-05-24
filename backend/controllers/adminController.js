const UserSchema = require("../schemas/userSchema");
const JobPostsSchema = require("../schemas/jobPostsSchema");
const ProgramTitlesSchema = require("../schemas/programTitlesSchema");
const HeroSchema = require("../schemas/heroSchema");
const CertificationsSchema = require("../schemas/certificationsSchema");
const QueriesSchema = require("../schemas/queriesSchema");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const adminController = {
  adminFeaturedInfo: async (req, res, next) => {
    try {
      const userData = await UserSchema.find();

      const vendors = userData.filter((e) => e.role === "vendor");

      const vendorCount = vendors.length;

      const customers = userData.filter((e) => e.role === "customer");

      const customerCount = customers.length;

      const postedPrograms = await JobPostsSchema.find();

      const postedProgramsCount = postedPrograms.length;

      const pendingApprovals = postedPrograms.filter((e) => e.approvalStatus === "pending");

      const pendingApprovalsCount = pendingApprovals.length;

      res.status(200).json({ vendorCount, customerCount, postedProgramsCount, pendingApprovalsCount });
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  adminVendorData: async (req, res, next) => {
    try {
      const userData = await UserSchema.find();

      const vendors = userData.filter((e) => e.role === "vendor");

      res.status(200).json(vendors);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  adminCustomerData: async (req, res, next) => {
    try {
      const userData = await UserSchema.find();

      const customers = userData.filter((e) => e.role === "customer");

      res.status(200).json(customers);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  adminPostsData: async (req, res, next) => {
    try {
      const postedPrograms = await JobPostsSchema.find();

      res.status(200).json(postedPrograms);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  addProgramTitle: async (req, res, next) => {
    try {
      const image = req.file;
      const filePath = `/${image.destination}/${image.filename}`;
      const { title } = req.body;
      const titleAded = await ProgramTitlesSchema.create({ title: title, image: filePath });

      res.status(200).json(titleAded);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  editProgramTitle: async (req, res, next) => {
    try {
      const image = req.file;
      const filePath = `/${image.destination}/${image.filename}`;
      const { title, id } = req.body;

      const titleAdded = await ProgramTitlesSchema.findOneAndUpdate({ _id: id }, { $set: { title: title, image: filePath } });

      res.status(200).json(titleAdded);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  deleteProgramTitle: async (req, res, next) => {
    try {
      const { id } = req.body;

      const titleDeleted = await ProgramTitlesSchema.findOneAndDelete({ _id: id });

      res.status(200).json(titleDeleted);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  addCertification: async (req, res, next) => {
    try {
      const { title } = req.body;
      const certificationAdded = await CertificationsSchema.create({ title: title });

      res.status(200).json(certificationAdded);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  deleteCertification: async (req, res, next) => {
    try {
      const { id } = req.body;
      const certificationDeleted = await CertificationsSchema.findOneAndDelete({ _id: id });

      res.status(200).json(certificationDeleted);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getProgramTitles: async (req, res, next) => {
    try {
      const programTitles = await ProgramTitlesSchema.find();

      res.status(200).json(programTitles);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getCertifications: async (req, res, next) => {
    try {
      const certifications = await CertificationsSchema.find();

      res.status(200).json(certifications);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  addAdmin: async (req, res, next) => {
    try {
      const { email, password, username, contactNumber } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await UserSchema.create({ username, email, contactNumber, password: hashedPassword, role: "admin" });

      res.status(200).json("Admin created");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getAdmins: async (req, res, next) => {
    try {
      const allAdmins = await UserSchema.find({ role: "admin" });

      let admins = allAdmins.filter((e) => e.email !== "admin@gmail.com");

      res.status(200).json(admins);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getHero: async (req, res, next) => {
    try {
      const hero = await HeroSchema.findOne();

      res.status(200).json(hero);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  uploadHero: async (req, res, next) => {
    try {
      const image = req.file;

      const filePath = `/${image.destination}/${image.filename}`;

      const currentHero = await HeroSchema.findOne();

      if (currentHero) {
        const hero = await HeroSchema.findOneAndUpdate({ _id: currentHero._id }, { $set: { image: filePath } });
        res.status(200).json(hero);
      } else {
        const hero = await HeroSchema.create({ image: filePath });
        res.status(200).json(hero);
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  showCounter: async (req, res, next) => {
    try {
      const currentHero = await HeroSchema.findOne();

      const hero = await HeroSchema.findOneAndUpdate({ _id: currentHero._id }, { $set: { counter: req.body.counter } });
      res.status(200).json(hero);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getQueries: async (req, res, next) => {
    try {
      const queries = await QueriesSchema.find();
      res.status(200).json(queries);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  postQueries: async (req, res, next) => {
    try {
      const queries = await QueriesSchema.create({ ...req.body });
      res.status(200).json(queries);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = adminController;
