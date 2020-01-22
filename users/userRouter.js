const express = require("express");
const router = express.Router();

const userDB = require("./userDb");

console.log("userRouter running...");

const {
  getUsers,
  getUser,
  getUserPosts,
  createUser,
  createUserPost,
  updateUser,
  deleteUser
} = require("./userController.jsx");

router
  .route("/")
  .get(getUsers)
  .post(validateUser, createUser);

router
  .route("/:id")
  .get(validateUserId, getUser)
  .put(validateUserId, validateUser, updateUser)
  .delete(validateUserId, deleteUser);

router
  .route("/:id/comments")
  .get(validateUserId, getUserPosts)
  .post(validateUserId, validatePost, createUserPost);

/*
router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});
/*
router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  userDB
    .get()
    .then(users => {
      res
        .status(200) //success
        .json(users);
    })
    .catch(err => {
      console.log("router.get.catch: ", err);
      res
        .status(500) //server error
        .json({ errorMessage: "Cannot locate users at this location" });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});
*/
//custom middleware

function validateUserId(req, res, next) {
  console.log("validateUserId: ", req.body);
  userDB
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        console.log("validateUserId fail:");
        res
          .status(400) //Bad Request
          .json({ message: "ID not found" });
      }
    })
    .catch(err => {
      console.log("validateUserId, err: ", err);
      res
        .status(500) //server error
        .json({ message: "server error" });
    });
}

function validateUser(req, res, next) {
  console.log("validateUser: ", req.body);
  if (!req.body) {
    res
      .status(400) //Bad Request
      .json({ message: "missing user information" });
  } else if (!req.body.name) {
    res
      .status(400) //Bad Request
      .json({ message: "missing user name" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  console.log("validatePost: ", req.body);
  if (!req.body) {
    res
      .status(400) //Bad Request
      .json({ message: "missing post information" });
  } else if (!req.body.name) {
    res
      .status(400) //Bad Request
      .json({ message: "missing post text" });
  } else {
    next();
  }
}

module.exports = router;
