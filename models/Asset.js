var mongoose = require('mongoose');

var AssetSchema = new mongoose.Schema({
  platform: String,
  assets: [],
  pairs: [],
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('asset', AssetSchema);

