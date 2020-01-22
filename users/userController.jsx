const userController = require("./userDb.js");
console.log("checking usersController.jsx...");

// ================================
//            GET
// ================================
// @desc    GET all users
// @route   GET to /api/users
exports.getUsers = (req, res, next) => {
  console.log("exports.getUsers...");
  userController
    .get()
    .then(users => {
      console.log("userController> exports.getUsers.then:", users);
      res
        .status(200) //success
        .json(users);
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "Error in getUsers" });
    });
};
// @desc    GET user with id
// @route   GET to /api/users/:id
exports.getUser = (req, res) => {
  console.log("getUser, with validate:", req.user);
  res
    .status(200) // success
    .json(req.user);
};
// @desc    GET all comments from user with id
// @route   GET to /api/users/:id/comments
exports.getUserPosts = (req, res, next) => {
  console.log("getUserPosts..");
  userController
    .getUserPosts(req.params.id)
    .then(posts => {
      res
        .status(200) // success
        .json(posts);
    })
    .catch(err => {
      res
        .status(500) //server error
        .json({ message: "error getting post" });
    });
};

// ================================
//            POST
// ================================
// @desc    create info for user
// @route   POST to /api/users
exports.createUser = (req, res, next) => {
  console.log("exports.createUser...");
  userController
    .insert(req.body)
    .then(user => {
      console.log("userController> exports.createUser.then:", user);
      res
        .status(200) //success
        .json(user);
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "Error in createUser" });
    });
};
// @desc    create comment for user with id
// @route   POST to /api/users/:id/comments
/*
exports.createUserPost = (req, res, next) => {
  req.body.id = req.params.id;
  console.log("createUserPost, ", req.body, req.params.id);
  userController
    .insert(req.body)
    .then(post => {
      res
        .status(200) //success
        .json(post);
    })
    .catch(err => {
      res
        .status(500) //success
        .json({ message: "error creating post for that user ID" });
    });
};
*/

// ================================
//            PUT
// ================================
// @desc    update id
// @route   PUT to /api/users
exports.updateUser = (req, res, next) => {
  console.log("exports.updateUser: ", req.body);
  userController
    .update(req.params.id, req.body)
    .then(updated => {
      console.log("updatedController> exports.updateupdated.then:", updated);
      if (!!updated) {
        userController
          .getById(req.params.id)
          .then(user => {
            res
              .status(200) //success
              .json(user);
          })
          .catch(err => {
            console.log("updateUser err:", err);
            res
              .status(404) //user not found
              .json({ message: "user not found" });
          });
      }
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "Error in updateUser" });
    });
};

// ================================
//            DELETE
// ================================
// @desc    DELETE current user
// @route   DELETE to /api/users
exports.deleteUser = (req, res, next) => {
  console.log("exports.deleteUser...");
  userController
    .remove(req.params.id)
    .then(user => {
      console.log("userController> exports.deleteUser.then:", user);
      if (!!user) {
        console.log(!!user);
        res
          .status(200) //success
          .json({ message: `user ${req.params.id} was deleted` });
      } else {
        res
          .status(404) //user not found
          .json({ message: "User with that ID does not exist!!" });
      }
    })
    .catch(err => {
      console.log("deleteUser err:", err);
      res
        .status(500) //server error
        .json({ errorMessage: "Error in deleteUser" });
    });
};

//custom middleware
/*
function validateUserId(req, res, next) {
  console.log("validateUserID...");
  userController
    .getById(req.params.id)
    .then(user => {
      console.log("validateUserId: ", user);
      if (user) {
        req.user = user;
        next();
      } else {
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
  console.log("validatePost: ", req.body);
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
  } else if (!req.body.text) {
    res
      .status(400) //Bad Request
      .json({ message: "missing post text" });
  } else {
    next();
  }
}
*/
