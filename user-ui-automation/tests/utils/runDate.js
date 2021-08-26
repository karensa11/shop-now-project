const dateFormat = require('dateformat');

const runDate = dateFormat(new Date(), "yyyy-mm-dd_HH-MM-ss");

module.exports = runDate;
