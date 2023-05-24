const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { isAuthenticated } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/heroImages/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

let programStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/programImages/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const programImageUpload = multer({
  storage: programStorage,
});

router.get("/adminFeaturedInfo", adminController.adminFeaturedInfo);

router.get("/adminVendorData", isAuthenticated, adminController.adminVendorData);

router.get("/adminCustomerData", isAuthenticated, adminController.adminCustomerData);

router.get("/adminPostsData", isAuthenticated, adminController.adminPostsData);

router.post("/addProgramTitle", programImageUpload.single("image"), adminController.addProgramTitle);

router.put("/editProgramTitle", adminController.editProgramTitle);

router.put("/deleteProgramTitle", adminController.deleteProgramTitle);

router.post("/addCertification", adminController.addCertification);

router.put("/deleteCertification", adminController.deleteCertification);

router.get("/getProgramTitles", adminController.getProgramTitles);

router.get("/getCertifications", adminController.getCertifications);

router.get("/getAdmins", adminController.getAdmins);

router.post("/addAdmin", adminController.addAdmin);

router.get("/getHero", adminController.getHero);

router.post("/uploadHero", upload.single("image"), adminController.uploadHero);

router.post("/showCounter", adminController.showCounter);

router.get("/getQueries", adminController.getQueries);
router.post("/postQueries", adminController.postQueries);

module.exports = router;
