const BidsSchema = require("../schemas/bidsSchema");
const UserSchema = require("../schemas/userSchema");
const JobPostsSchema = require("../schemas/jobPostsSchema");
const createError = require("http-errors");
const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

mailTransporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const bidsController = {
  getBidsCustomer: async (req, res, next) => {
    try {
      const postId = req.query.postId;

      console.log(postId);

      const bids = await BidsSchema.find({ postId: postId });

      res.status(200).json(bids);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  getBidsVendor: async (req, res, next) => {
    try {
      const user = req.user;
      const bids = await BidsSchema.find({ vendorId: user._id });

      res.status(200).json(bids);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  postBid: async (req, res, next) => {
    try {
      const user = req.user;

      const { postId, quotation } = req.body;

      const jobPost = await JobPostsSchema.findOne({ _id: postId });

      const customer = await UserSchema.findOne({ _id: jobPost.customerId });

      const vendor = await UserSchema.findOne({ _id: user._id });

      await BidsSchema.create({ vendorId: user._id, vendorId2: vendor.userId, postId: postId, postId2: jobPost.postId, quotation: quotation });

      let details = {
        from: process.env.EMAIL,
        to: customer.email,
        subject: "You received a Quotation on your program.",
        html: `<p>Dear,
        <br/>
        <br/>
  We are very happy to inform you that you received new quotation on your program 
        <br/>
        <br/>
  Request you to kindly login our portal and find the quotation, Once you award the program to any vendor, SPOC Details will be provided to you by Vendor, 
        <br/>
        <br/>
  Note : Kindly  Discuss and Signed LOI or P.O and Payment Term with vendor for the project or program at your end for safer side. You can mention Program ID on LOI / P.O for the reference. 
        <br/>
        <br/>
  We are looking forward to more programs in future. 
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
        <br/>
      </p>`,
      };

      mailTransporter
        .sendMail(details)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      res.status(200).send("Bid Posted");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  acceptBid: async (req, res, next) => {
    try {
      const bidId = req.query.bidId;
      const postId = req.query.postId;

      const bid = await BidsSchema.findOne({ _id: bidId });

      const user = await UserSchema.findOne({ _id: bid.vendorId });

      await BidsSchema.findOneAndUpdate({ _id: bidId }, { $set: { status: "accepted" } });

      await JobPostsSchema.findOneAndUpdate(
        { _id: postId },
        { $set: { isQuotationAccepted: true, acceptedQuotationDetails: bid, vendorDetails: user } }
      );

      let details = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Your Quotation has been Accepted.",
        html: `<p>Dear,
        <br/>
        <br/>
  We are very happy to inform you that your quotation has been accepted on one of our program 
        <br/>
        <br/>
  Request you to kindly login our portal and and provide the SPOC Details to client on accepted programs, 
        <br/>
        <br/>
  Note : Kindly Discuss and Signed LOI or P.O and Payment Term with Client for the project or program at your end for safer side. You can mention Program ID on LOI / P.O for the reference. 
        <br/>
        <br/>
  We are looking forward to more quotations on our programs.
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
        <br/>
      </p>`,
      };

      mailTransporter.sendMail(details);

      res.status(200).send("Bid Accepted");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  rejectBid: async (req, res, next) => {
    try {
      const bidId = req.query.bidId;

      await BidsSchema.findOneAndUpdate({ _id: bidId }, { $set: { status: "rejected" } });

      res.status(200).send("Bid Rejected");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  editBid: async (req, res, next) => {
    try {
      const { newQuotation, quotationId } = req.body;

      await BidsSchema.findOneAndUpdate({ _id: quotationId }, { $set: { quotation: newQuotation } });

      res.status(200).send("Success");
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};
module.exports = bidsController;
