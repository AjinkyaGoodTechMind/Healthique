const UserSchema = require("../schemas/userSchema");
const EmailSchema = require("../schemas/emailsSchema");
const NewsletterSchema = require("../schemas/newsletterSchema");
const createError = require("http-errors");
const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const newsletterController = {
  getEmails: async (req, res, next) => {
    try {
      const emails = await EmailSchema.find();

      res.status(200).json(emails);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getNewsletters: async (req, res, next) => {
    try {
      const newsletters = await NewsletterSchema.find();

      res.status(200).json(newsletters);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  signupNewsletter: async (req, res, next) => {
    try {
      const signedUpForEmail = await EmailSchema.findOne({ email: req.body.email });

      if (!signedUpForEmail) {
        await EmailSchema.create({ email: req.body.email, role: "unregistered" });
      }

      res.status(200).json("Email Submitted");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  postNewsletter: async (req, res, next) => {
    try {
      const { subject, body, selectedRoles } = req.body;

      await NewsletterSchema.create({ subject, body, selectedRoles });

      res.status(200).json("Newsletter Created");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  editNewsletter: async (req, res, next) => {
    try {
      const { subject, body, selectedRoles, id } = req.body;

      await NewsletterSchema.findOneAndUpdate({ _id: id }, { $set: { subject, body, selectedRoles } });

      res.status(200).json("Newsletter Edited");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  deleteNewsletter: async (req, res, next) => {
    try {
      const { id } = req.body;

      await NewsletterSchema.findOneAndDelete({ _id: id });

      res.status(200).json("Newsletter Deleted");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  sendNewsletter: async (req, res, next) => {
    try {
      const { newsletterId } = req.body;

      const newsletterDetails = await NewsletterSchema.findOne({ _id: newsletterId });

      const emails = await EmailSchema.find({ role: { $in: newsletterDetails.selectedRoles } });

      if (emails.length > 0) {
        const recipients = emails.map((e) => e.email).join(",");

        let details = {
          from: process.env.EMAIL,
          to: recipients,
          subject: `${newsletterDetails.subject}`,
          html: `<p>${newsletterDetails.body}</p>`,
        };

        mailTransporter.sendMail(details);
      }

      res.status(200).json("Newsletter Sent to selected users");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  deleteEmail: async (req, res, next) => {
    try {
      await EmailSchema.findOneAndDelete({ email: req.body.email });

      res.status(200).json("Email Deleted");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};
module.exports = newsletterController;
