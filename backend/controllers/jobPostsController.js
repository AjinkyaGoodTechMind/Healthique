const UserSchema = require("../schemas/userSchema");
const JobPostsSchema = require("../schemas/jobPostsSchema");
const createError = require("http-errors");
const nodemailer = require("nodemailer");
const EmailSchema = require("../schemas/emailsSchema");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const jobPostsController = {
  postNewJob: async (req, res, next) => {
    try {
      const user = req.user;

      let postCount = await JobPostsSchema.count();

      postCount = postCount + 1;

      let postId = `PROGRAM${postCount}`;

      const newJobPost = await JobPostsSchema.create({ customerId2: user.userId, postId: postId, customerId: user._id, ...req.body });

      res.status(200).json(newJobPost);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getAllPosts: async (req, res, next) => {
    try {
      const { location, date, title } = req.query;
      const posts = await JobPostsSchema.find();

      if (!location && !date && !title) {
        res.status(200).json(posts);
      } else if (location.length !== 0 && date.length !== 0 && title.length !== 0) {
        let newPost = posts.filter(
          (e) =>
            e.date === date &&
            e.location.toLowerCase() === location.toLowerCase() &&
            e.title.toLowerCase().replace(/\s/g, "") === title.toLowerCase().replace(/\s/g, "")
        );
        res.status(200).json(newPost);
      } else if (location.length !== 0 && date.length !== 0) {
        let newPost = posts.filter((e) => e.date === date && e.location.toLowerCase() === location.toLowerCase());
        res.status(200).json(newPost);
      } else if (location.length !== 0 && title.length !== 0) {
        let newPost = posts.filter(
          (e) =>
            e.location.toLowerCase() === location.toLowerCase() && e.title.toLowerCase().replace(/\s/g, "") === title.toLowerCase().replace(/\s/g, "")
        );
        res.status(200).json(newPost);
      } else if (date.length !== 0 && title.length !== 0) {
        let newPost = posts.filter((e) => e.date === date && e.title.toLowerCase().replace(/\s/g, "") === title.toLowerCase().replace(/\s/g, ""));
        res.status(200).json(newPost);
      } else if (location.length !== 0) {
        let newPost = posts.filter((e) => e.location.toLowerCase() === location.toLowerCase());
        res.status(200).json(newPost);
      } else if (date.length !== 0) {
        let newPost = posts.filter((e) => e.date === date);
        res.status(200).json(newPost);
      } else if (title.length !== 0) {
        let newPost = posts.filter((e) => e.title.toLowerCase().replace(/\s/g, "") === title.toLowerCase().replace(/\s/g, ""));
        res.status(200).json(newPost);
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getUserPosts: async (req, res, next) => {
    try {
      const user = req.user;
      const userPosts = await JobPostsSchema.find({ customerId: user._id });
      res.status(200).json(userPosts);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getPendingApprovalPosts: async (req, res, next) => {
    try {
      const pendingApprovalPosts = await JobPostsSchema.find({ approvalStatus: "pending" });
      res.status(200).json(pendingApprovalPosts);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  updatePostApproval: async (req, res, next) => {
    try {
      const { postId, updatedStatus, reason } = req.query;

      if (updatedStatus === "rejected") {
        await JobPostsSchema.findOneAndUpdate({ _id: postId }, { $set: { approvalStatus: updatedStatus, rejectedReason: reason } });

        const jobPost = await JobPostsSchema.findOne({ _id: postId });

        const customer = await UserSchema.findOne({ _id: jobPost.customerId });

        let details = {
          from: process.env.EMAIL,
          to: customer.email,
          subject: "Your Program has been Rejected due to Missing information.",
          html: `<p>Dear,
          <br/>
          <br/>
    We are very sorry to inform you that your program is been rejected due to some missing information on program, 
          <br/>
          <br/>
    Request you to kindly login our portal and find the error on comments, kindly correct the error and submit the program again. 
          <br/>
          <br/>
    We are looking forward to your resubmission of your program. 
          <br/>
          <br/>
          <br/>
    With regards, 
          <br/>
          <br/>
          <br/>
    Healthique Team
          <br/>
    care@healthique.in
          <br/>
          <br/>
          <br/>
    This is Auto generated Email or newsletter, please do not reply to this email. For more information please contact our support team at care@healthique.in
          <br/>
        </p>`,
        };

        mailTransporter.sendMail(details);
      } else {
        await JobPostsSchema.findOneAndUpdate({ _id: postId }, { $set: { approvalStatus: updatedStatus, rejectedReason: "" } });

        const jobPost = await JobPostsSchema.findOne({ _id: postId });

        const customer = await UserSchema.findOne({ _id: jobPost.customerId });

        const emails = await EmailSchema.find({ role: "vendor" });

        if (emails.length > 0) {
          const recipients = emails.map((e) => e.email).join(",");

          let details = {
            from: process.env.EMAIL,
            to: customer.email,
            subject: `Your Program has been approved and Listed on our Website `,
            html: `<p>Dear, 
            <br/>
      We are happy to announce that your program has been successfully approved and has been listed on our website. 
            <br/>
            <br/>
      You can view your listing by clicking on this link 
            <br/>
            <br/>
      Now Sit tight and wait for a Quotation from our vendor. 
            <br/>
            <br/>
      Don’t Hurry to accept quotations below or nearby your budget, As there may be many more who can provide you best of best quotation. 
            <br/>
            <br/>
      We are happy that you choose our services, 
            <br/>
            <br/>
      Be Unique in wellness with Healthique
            <br/>
            <br/>
            <br/>
      Regards, 
            <br/>
      Healthique Team
            <br/>
            <br/>
      This is Auto generated Email or newsletter, please do not reply to this email. For more information please contact our support team at care@healthique.in
            <br/>
          </p>`,
          };

          let details2 = {
            from: process.env.EMAIL,
            to: recipients,
            subject: `New Program Posted`,
            html: `<p>Dear, 
            <br/>
      New Program has been posted on the website. 
            <br/>
            <br/>
      You check out the new lising by clicking on this link 
            <br/>
            <br/>
      Give a Free Quotation Now !!!.
            <br/>
            <br/>
      We are happy that you choose our services, 
            <br/>
            <br/>
      Be Unique in wellness with Healthique
            <br/>
            <br/>
            <br/>
      Regards, 
            <br/>
      Healthique Team
            <br/>
            <br/>
      This is Auto generated Email or newsletter, please do not reply to this email. For more information please contact our support team at care@healthique.in
            <br/>
          </p>`,
          };

          mailTransporter.sendMail(details);

          mailTransporter.sendMail(details2);
        }
      }

      res.status(200).send("Status Updated");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  updatePost: async (req, res, next) => {
    try {
      const { newProgram, postId } = req.body;
      // console.log(newProgram, postId);

      await JobPostsSchema.findOneAndUpdate({ _id: postId }, { ...newProgram, approvalStatus: "pending" });

      res.status(200).send("Status Updated");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  submitSpoc: async (req, res, next) => {
    try {
      const { newSpocName, newSpocContact, postId, newSpocEmail } = req.body;
      // console.log(newProgram, postId);

      const jobPost = await JobPostsSchema.findOne({ _id: postId });

      const customer = await UserSchema.findOne({ _id: jobPost.customerId });

      await JobPostsSchema.findOneAndUpdate(
        { _id: postId },
        { $set: { spocDetails: { name: newSpocName, contact: newSpocContact, email: newSpocEmail }, isSpocDetailsSubmitted: true } }
      )
        .then((res) => {
          let details = {
            from: process.env.EMAIL,
            to: customer.email,
            subject: "SPOC Details of your Program",
            html: `	<p>Dear,
            <br/>
            <br/>
      Please find the SPOC Details of your Program Awarded to our vendor as below :
            <br/>
            <br/>
      Program ID :- ${jobPost.postId}
            <br/>
      Program Name : ${jobPost.title}
            <br/>
      Vendor Name : ${jobPost.vendorDetails.username}
            <br/>
      SPOC Name : ${newSpocName}
            <br/>
      SPOC Email Id : ${newSpocEmail}
            <br/>
      SPOC Mobile Number : ${newSpocContact}
            <br/>
            <br/>
      SPOC and Vendor Details are also available in our portal, 
            <br/>
            <br/>
      Note : Kindly Discuss and Signed LOI or P.O and Payment Term with Client for the project or program at your end for safer side. You can mention Program ID on LOI / P.O for the reference.
            <br/>
            <br/>
      We are looking forward to more programs.
            <br/>
            <br/>
      We are happy that you choose our services,
            <br/>
            <br/>
            <br/>
      Be Unique in wellness with Healthique
            <br/>
            <br/>
            <br/>
      With regards,
            <br/>
            <br/>
            <br/>
      Healthique Team
            <br/>
      care@healthique.in
            <br/>
            <br/>
            <br/>
      This is Auto generated Email or newsletter, please do not reply to this email. For more information please contact our support team at care@healthique.in
          </p>`,
          };

          mailTransporter.sendMail(details);
        })
        .catch((err) => {
          console.log(err);
        });

      res.status(200).send("Status Updated");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};
module.exports = jobPostsController;
