const router = require("express").Router();
const vendorController = require("../controllers/vendorController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/vendorFeaturedInfo", isAuthenticated, vendorController.vendorFeaturedInfo);
router.get("/allPostedQuotations", isAuthenticated, vendorController.allPostedQuotations);
router.get("/acceptedQuotations", isAuthenticated, vendorController.acceptedQuotations);
router.get("/pendingQuotations", isAuthenticated, vendorController.pendingQuotations);

module.exports = router;
