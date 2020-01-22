const postController = require("./postDb.js");
console.log("checking postController.jsx");

exports.getPosts = (req, res, next) => {
  postController
    .get()
    .then(posts => {
      console.log("getPosts: ", posts);
      res
        .status(200) //success
        .json(posts);
    })
    .catch(err => {
      console.log("getPosts err:", err);
      res
        .status(500) //server error
        .json({ message: "Error accessing Posts" });
    });
};

exports.getPost = (req, res, next) => {
  postController
    .getById(req.params.id)
    .then(post => {
      res
        .status(200) //success
        .json(post);
    })
    .catch(err => {
      console.log("getPost err:", err);
      res
        .status(500) //server error
        .json({ message: "Error accessing Post for user ID" });
    });
};

//desc
//
exports.deletePost = (req, res, next) => {
  postController
    .remove(req.params.id)
    .then(post => {
      res
        .status(200) //success
        .json({
          message: `Post  with ID: ${req.params.id}was deleted successfully`
        });
    })
    .catch(err => {
      console.log("deletePost err:", err);
      res
        .status(500) //server error
        .json({ message: "Error deleting Post with ID" });
    });
};

//desc
//
exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  postController
    .update(id, req.body)
    .then(updated => {
      postController
        .getById(id)
        .then(post => {
          res
            .status(201) //success
            .json(post);
        })
        .catch(err => {
          res
            .status(404) //error
            .json({ message: "error retrieving post ID" });
        });
    })
    .catch(err => {
      console.log("updatePost err:", err);
      res
        .status(500) //server error
        .json({ message: "Error updating Post" });
    });
};
