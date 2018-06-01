var express = require('express');
var router = express.Router();
Kraken = require('../src/assets/kraken');




router.get('/:method', function (req, res, next) {
  const kraken = new Kraken();
  // const kraken = new Kraken(key,secret);

  if (req.query.pair !== null && req.query.pair !== undefined) {
    if (req.query.since !== null && req.query.since !== undefined) {
      kraken.api(req.params.method, {"pair": req.query.pair, "since": req.query.since}, function (err, data) {
        if (err) return next(err);
        res.json(data.result);
      });
    } else {
      kraken.api(req.params.method, {"pair": req.params.pair}, function (err, data) {
        if (err) return next(err);
        res.json(data.result);
      });
    }
  } else {
    kraken.api(req.params.method, function (err, data) {
      if (err) return next(err);
      res.json(data.result);
    });
  }

});

module.exports = router;
