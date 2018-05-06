var mongoose = require('mongoose');

var ChartSchema = new mongoose.Schema({
  platform: String,
  pair: String,
  startDate: Number,
  endDate: Number,
  chart: [],
  isAllImported: Boolean,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chart', ChartSchema);

