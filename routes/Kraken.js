var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
Kraken = require('../src/assets/kraken');

const key = 'cmqRhjTIeeQtzh8TAsET/vvjMrtctz8D8d71XVtxuUPTYiNmnaj9N0Cv'; // API Key
const secret = 'DK7FMgRTln1VHYji4/hnMQrykUPYat9WJC1V2uKJRmc3T1AYKR44qG4TbY966Bc3pXtzFeSDSsJpHYEBqwHRpA=='; // API Private Key

const kraken = new Kraken(key,secret);

router.get('/:method', function (req, res, next) {
  if (req.query.pair !== null && req.query.pair !== undefined) {
    if (req.query.since !== null && req.query.since !== undefined) {
      kraken.api(req.params.method, {"pair": req.query.pair, "&since": req.query.since}, function (err, data) {
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
