const express = require("express");
const router = express.Router();

const postDB = require("./postDb.js");

console.log("postRouter running...");

const {
  getPosts,
  getPost,
  deletePost,
  updatePost
} = require("./postController.jsx");

router.route("/").get(getPosts);

router
  .route("/:id")
  .get(validatePostId, getPost)
  .delete(validatePostId, deletePost)
  .put(validatePostId, updatePost);

/*
router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});
*/
// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  postDB.getById(req.params.id).then(post => {
    if (!post) {
      res
        .status(404) //
        .json({ error: "Post at specified ID does not exist" });
    } else {
      next();
    }
  });
}

module.exports = router;
