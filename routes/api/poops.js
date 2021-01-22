const express = require("express");
const router = express.Router();

// Load input validation
const validatePoopInput = require("../../validation/poops");

const Child = require("../../models/Child");
const Poops = require("../../models/Poops");

// @route Get api/poops/getPoops/:childId
// @desc Get all poops for that child
// @access Public
router.get("/getPoops/:id", (req, res) => {
  const childId = req.params.id;

  Child.findOne({ _id: childId })
    .populate("poops")
    .then(response => {
      res.json(response.poops);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route Post api/poops/addPoop/:childId
// @desc Add feed for child
// @access Public
router.post("/addPoop/:id", (req, res) => {
  const childId = req.params.id;

  const { errors, isValid } = validatePoopInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPoop = new Poops({
    time: req.body.time,
    date: req.body.date,
    additionalInfo: req.body.additionalInfo
  });

  newPoop
    .save()
    .then(response => {
      return Child.findOneAndUpdate(
        { _id: childId },
        { $push: { poops: response._id } },
        { new: true }
      ).populate("poops");
    })
    .then(response => {
      res.json(response.poops);
    })
    .catch(err => {
      res.json(err);
    })
    .then(newFeed => res.json(newFeed))
    .catch(err => console.log(err));
});

// @route Delete api/poops/deletePoop/childid&:poopId
// @desc Delete selected poop
// @access Public
router.post("/deletePoop/:childId&:poopId", (req, res) => {
  const childId = req.params.childId;
  const poopId = req.params.poopId;

  Poops.findByIdAndRemove(poopId)
    .then(response => {
      Child.update({ _id: childId }, { $pull: { poops: poopId } }).then(
        response => {
          Child.findOne({ _id: childId })
            .populate("poops")
            .then(response => {
              res.json(response.poops);
            });
        }
      );
    })
    .catch(err => {
      res.json(err);
    });
});

// @route Post api/poops/editPoop/:childId&:poopId
// @desc Edit feed information
// @access Public
router.post("/editPoop/:childId&:poopId", (req, res) => {
  const poopId = req.params.poopId;
  const childId = req.params.childId;

  const { errors, isValid } = validatePoopInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Poops.findByIdAndUpdate(poopId, {
    time: req.body.time,
    date: req.body.date,
    additionalInfo: req.body.additionalInfo
  })
    .then(response => {
      Child.findOne({ _id: childId })
        .populate("poops")
        .then(response => {
          res.json(response.poops);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
