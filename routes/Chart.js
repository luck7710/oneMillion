var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chart = require('../models/Chart.js');

/* GET ALL CHART */
router.get('/', function(req, res, next) {
  Chart.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Chart BY ID */
router.get('/:id', function(req, res, next) {
  Chart.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE CHART */
router.post('/', function(req, res, next) {
  Chart.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE CHART */
router.put('/:id', function(req, res, next) {
  Chart.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE CHART */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
