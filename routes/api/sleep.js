const express = require("express");
const router = express.Router();

// Load input validation
const validateSleepInput = require("../../validation/sleep");

const Child = require("../../models/Child");
const Sleep = require("../../models/Sleep");

// @route Get api/sleep/getSleep/:childId
// @desc Get all sleep for that child
// @access Public
router.get("/getSleep/:id", (req, res) => {
  const childId = req.params.id;

  Child.findOne({ _id: childId })
    .populate("sleep")
    .then(response => {
      res.json(response.sleep);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route Post api/sleep/addSleep/:childId
// @desc Add sleep for child
// @access Public
router.post("/addSleep/:id", (req, res) => {
  const childId = req.params.id;

  const { errors, isValid } = validateSleepInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  const newSleep = new Sleep({
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    additionalInfo: req.body.additionalInfo
  });

  newSleep
    .save()
    .then(response => {
      return Child.findOneAndUpdate(
        { _id: childId },
        { $push: { sleep: response._id } },
        { new: true }
      ).populate("sleep");
    })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
    .then(newSleep => res.json(newSleep))
    .catch(err => console.log(err));
});

// @route Delete api/sleep/deleteSleep/childId&:sleepId
// @desc Delete selected sleep
// @access Public
router.post("/deleteSleep/:childId&:sleepId", (req, res) => {
  const childId = req.params.childId;
  const sleepId = req.params.sleepId;

  Sleep.findByIdAndRemove(sleepId)
    .then(response => {
      Child.update({ _id: childId }, { $pull: { sleep: sleepId } }).then(
        response => {
          Child.findOne({ _id: childId })
            .populate("sleep")
            .then(response => {
              res.json(response.sleep);
            });
        }
      );
    })
    .catch(err => {
      res.json(err);
    });
});

// @route Post api/sleep/editSleep/:childId&:SleepId
// @desc Edit sleep information
// @access Public
router.post("/editSleep/:childId&:sleepId", (req, res) => {
  const childId = req.params.childId;
  const sleepId = req.params.sleepId;

  const { errors, isValid } = validateSleepInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Sleep.findByIdAndUpdate(sleepId, {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    additionalInfo: req.body.additionalInfo
  })
    .then(response => {
      Child.findOne({ _id: childId })
        .populate("sleep")
        .then(response => {
          res.json(response.sleep);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
