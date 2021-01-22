const express = require("express");
const router = express.Router();

// Load input validation
const validateMedicationInput = require("../../validation/medication");

const Child = require("../../models/Child");
const Medication = require("../../models/Medication");

// @route Get api/medication/getMedication/:childId
// @desc Get all medication for that child
// @access Public
router.get("/getMedication/:id", (req, res) => {
  const childId = req.params.id;

  Child.findOne({ _id: childId })
    .populate("medication")
    .then(response => {
      res.json(response.medication);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route Post api/medication/addMedication/:childId
// @desc Add feed for child
// @access Public
router.post("/addMedication/:id", (req, res) => {
  const childId = req.params.id;

  const { errors, isValid } = validateMedicationInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newMedication = new Medication({
    type: req.body.type,
    amount: req.body.amount,
    time: req.body.time,
    date: req.body.date,
    additionalInfo: req.body.additionalInfo
  });

  newMedication
    .save()
    .then(response => {
      return Child.findOneAndUpdate(
        { _id: childId },
        { $push: { medication: response._id } },
        { new: true }
      ).populate("medication");
    })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
    .then(newFeed => res.json(newFeed))
    .catch(err => console.log(err));
});

// @route Delete api/poops/deleteMedication/childid&:medicationId
// @desc Delete selected medication
// @access Public
router.post("/deleteMedication/:childId&:medicationId", (req, res) => {
  const childId = req.params.childId;
  const medicationId = req.params.medicationId;

  Medication.findByIdAndRemove(medicationId)
    .then(response => {
      Child.update({ _id: childId }, { $pull: { medication: medicationId } }).then(
        response => {
          Child.findOne({ _id: childId })
            .populate("medication")
            .then(response => {
              res.json(response.medication);
            });
        }
      );
    })
    .catch(err => {
      res.json(err);
    });
});

// @route Post api/medication/editMedication/:childId&:medicationId
// @desc Edit medication information
// @access Public
router.post("/editMedication/:childId&:medicationId", (req, res) => {
  const childId = req.params.childId;
  const medicationId = req.params.medicationId;

  const { errors, isValid } = validateMedicationInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Medication.findByIdAndUpdate(medicationId, {
    type: req.body.type,
    amount: req.body.amount,
    time: req.body.time,
    date: req.body.date,
    additionalInfo: req.body.additionalInfo
  })
    .then(response => {
      // res.json(response)
      Child.findOne({ _id: childId })
        .populate("medication")
        .then(response => {
          res.json(response.medication);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
