const router = require("express").Router();
const plansController = require("../controllers/plansController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/getPlans", plansController.getPlans);

router.post("/postPlans", plansController.postPlans);

router.put("/updatePlans", plansController.updatePlans);

router.get("/getSubscriptionAdmin", isAuthenticated, plansController.getSubscriptionAdmin);

router.get("/getSubscription", isAuthenticated, plansController.getSubscription);

router.post("/postSubscription", isAuthenticated, plansController.postSubscription);

router.put("/updateSubscription", isAuthenticated, plansController.updateSubscription);

router.post("/createPayment", isAuthenticated, plansController.createPayment);

module.exports = router;
