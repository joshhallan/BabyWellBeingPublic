const express = require("express");
const router = express.Router();

// Load input validation
const validateFeedInput = require("../../validation/feeds");

const Child = require("../../models/Child");
const Feed = require("../../models/Feed");

// FEEDS

// @route Get api/feeds/getFeeds/:childId
// @desc Get all feeds for that child
// @access Public
router.get("/getFeeds/:id", (req, res) => {
  const childId = req.params.id;

  Child.findOne({ _id: childId })
    .populate("feeds")
    .then(response => {
      res.json(response.feeds);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route Post api/feeds/addFeed/:childId
// @desc Add feed for child
// @access Public
router.post("/addFeed/:id", (req, res) => {
  const childId = req.params.id;

  const { errors, isValid } = validateFeedInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newFeed = new Feed({
    feeder: req.body.feeder,
    amount: req.body.amount,
    time: req.body.time,
    date: req.body.date,
    additionalInfo: req.body.additionalInfo
  });

  newFeed
    .save()
    .then(response => {
      return Child.findOneAndUpdate(
        { _id: childId },
        { $push: { feeds: response._id } },
        { new: true }
      ).populate("feeds");
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

// @route Delete api/feeds/deleteFeed/:feedId
// @desc Delete selected feed
// @access Public
router.post("/deleteFeed/:childId&:feedId", (req, res) => {
  const feedId = req.params.feedId;
  const childId = req.params.childId;

  Feed.findByIdAndRemove(feedId)
    .then(response => {
      Child.update({ _id: childId }, { $pull: { feeds: feedId } }).then(
        response => {
          Child.findOne({ _id: childId })
            .populate("feeds")
            .then(response => {
              res.json(response.feeds);
            });
        }
      );
    })
    .catch(err => {
      res.json(err);
    });
});

// @route Post api/feeds/editFeed/:childId&:feedId
// @desc Edit feed information
// @access Public
router.post("/editFeed/:childId&:feedId", (req, res) => {
  const feedId = req.params.feedId;
  const childId = req.params.childId;

  const { errors, isValid } = validateFeedInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Feed.findByIdAndUpdate(feedId, {
    feeder: req.body.feeder,
    amount: req.body.amount,
    time: req.body.time,
    date: req.body.date,
    additionalInfo: req.body.additionalInfo
  })
    .then(response => {
      Child.findOne({ _id: childId })
        .populate("feeds")
        .then(response => {
          res.json(response.feeds);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
