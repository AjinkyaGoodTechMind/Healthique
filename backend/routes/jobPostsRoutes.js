const router = require("express").Router();
const jobPostsController = require("../controllers/jobPostsController");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/postNewJob", isAuthenticated, jobPostsController.postNewJob);

router.get("/getAllPosts", jobPostsController.getAllPosts);

router.get("/getUserPosts", isAuthenticated, jobPostsController.getUserPosts);

router.get("/getPendingApprovalPosts", isAuthenticated, jobPostsController.getPendingApprovalPosts);

router.put("/updatePostApproval", isAuthenticated, jobPostsController.updatePostApproval);

router.put("/updatePost", isAuthenticated, jobPostsController.updatePost);

router.put("/submitSpoc", isAuthenticated, jobPostsController.submitSpoc);

module.exports = router;
