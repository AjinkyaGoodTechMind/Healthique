const router = require("express").Router();
const bidsController = require("../controllers/bidsController");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/postBid", isAuthenticated, bidsController.postBid);

router.put("/acceptBid", isAuthenticated, bidsController.acceptBid);

router.put("/rejectBid", isAuthenticated, bidsController.rejectBid);

router.get("/getBidsCustomer", isAuthenticated, bidsController.getBidsCustomer);

router.get("/getBidsVendor", isAuthenticated, bidsController.getBidsVendor);

router.put("/editBid", isAuthenticated, bidsController.editBid);

module.exports = router;
