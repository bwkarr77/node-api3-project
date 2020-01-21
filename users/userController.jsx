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

exports.getUser = (req, res, next) => {
  console.log("exports.getUser...");
  userController
    .getById(req.params.id)
    .then(user => {
      console.log("userController> exports.getUser.then:", user);
      res
        .status(200) //success
        .json(user);
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "Error in getUser" });
    });
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
