const express = require("express");
const router = express.Router();

// Load input validation
const validateChildInput = require("../../validation/children");

const Child = require("../../models/Child");
const User = require("../../models/User");
const Feed = require("../../models/Feed");

// CHILDREN

// @route POST api/child/addChild/:userID
// @desc Add child
// @access Public
// todo: add error messages
router.post("/addChild/:id", (req, res) => {
  const userId = req.params.id;

  const newChild = new Child({
    fName: req.body.fName,
    lName: req.body.lName,
    users: userId
  });

  const { errors, isValid } = validateChildInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  newChild
    .save()
    .then(response => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $push: { children: response._id } },
        { new: true }
      ).populate("children");
    })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
    .then(newChild => res.json(newChild))
    .catch(err => console.log(err));
});

// @ POST api/child/addChildById/:childID
// @desc Add child to user account by ID
// @access Public
// todo: add error messages
router.post("/addChildById/:userId&:childId", (req, res) => {
  const userId = req.params.userId;
  const childId = req.params.childId;

  Child.findOneAndUpdate(
    { _id: childId },
    { $push: { users: userId } },
    { new: true }
  ).then(child => {
    if (!child) {
      return res.status(400).json({ child: "Child doesn't exist" });
    } else {
      User.findOneAndUpdate(
        { _id: userId },
        { $push: { children: childId } },
        { new: true }
      )
        .populate("children")
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          res.json(err);
        });
    }
  });
});

// @route GET api/child/getChildren/:userId
// @desc Get all of a users children
// @access public
router.get("/getChildren/:id", (req, res) => {
  const userID = req.params.id;

  User.findOne({ _id: userID })
    .populate("children")
    .then(response => {
      res.json(response);
      return response;
    })
    .catch(err => {
      res.json(err);
    });
});

// @route POST api/child/removeChild/:childId&userId
// @desc Remove child from user
// @access public
router.post("/removeChild/:childId&:userId", (req, res) => {
  const childId = req.params.childId;
  console.log("childId", childId);
  const userId = req.params.userId;
  console.log("userId", userId);

  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { children: childId } },
    { new: true }
  )
    .populate("children")
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route get api/child/deleteChild/:childId
// @desc Permenently remove child
// @access public
router.post("/deleteChild/:id", (req, res) => {
  const childId = req.params.id;

  Child.findById(childId)
    .then(response => {
      for (let user of response.users) {
        User.findOneAndUpdate(
          { _id: user },
          { $pull: { children: childId } },
          { new: true }
        )
          .populate("children")
          .then(response => {
            res.json(response);
          })
          .catch(err => {
            res.json(err);
          });
      }

      for (let feed of response.feeds) {
        Feed.deleteOne({ _id: feed }).catch(err => {
          res.json(err);
        });
      }
    })
    .then(response => {
      Child.deleteOne({ _id: childId })
        .then(response => {
          console.log("Child removed");
        })
        .catch(err => {
          res.json(err);
        });
    });
});

module.exports = router;
