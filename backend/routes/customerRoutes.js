const router = require("express").Router();
const customerController = require("../controllers/customerController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/customerFeaturedInfo", isAuthenticated, customerController.customerFeaturedInfo);
router.get("/allPostedPrograms", isAuthenticated, customerController.allPostedPrograms);
router.get("/acceptedQuotations", isAuthenticated, customerController.acceptedQuotations);
router.get("/pendingQuotations", isAuthenticated, customerController.pendingQuotations);
router.get("/getProgramTitles", customerController.getProgramTitles);

module.exports = router;
