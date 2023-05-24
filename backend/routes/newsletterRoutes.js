const router = require("express").Router();
const newsletterController = require("../controllers/newsletterController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/getEmails", newsletterController.getEmails);

router.post("/signupNewsletter", newsletterController.signupNewsletter);

router.get("/getNewsletters", newsletterController.getNewsletters);

router.post("/postNewsletter", newsletterController.postNewsletter);

router.put("/editNewsletter", newsletterController.editNewsletter);

router.put("/deleteNewsletter", newsletterController.deleteNewsletter);

router.post("/sendNewsletter", newsletterController.sendNewsletter);

router.put("/deleteEmail", newsletterController.deleteEmail);

module.exports = router;
