const userController = require("./userDb.js");
console.log("checking usersController.jsx...");

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

exports.getUser = (req, res) => {
  console.log("getUser, with validate:", req.user);
  res
    .status(200) // success
    .json(req.user);
};

exports.createUser = (req, res, next) => {
  console.log("exports.createUser...");
  userController
    .insert(req.params.post)
    .then(post => {
      console.log("userController> exports.createUser.then:", post);
      res
        .status(200) //success
        .json(post);
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "Error in createUser" });
    });
};

exports.updateUser = (req, res, next) => {
  console.log("exports.updateUser...");
  userController
    .update(req.params.id, req.params.post)
    .then(user => {
      console.log("userController> exports.updateUser.then:", user);
      res
        .status(200) //success
        .json(user);
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "Error in updateUser" });
    });
};

exports.deleteUser = (req, res, next) => {
  console.log("exports.deleteUser...");
  userController
    .remove()
    .then(user => {
      console.log("userController> exports.deleteUser.then:", user);
      res
        .status(200) //success
        .json(user);
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "Error in deleteUser" });
    });
};

//custom middleware

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
