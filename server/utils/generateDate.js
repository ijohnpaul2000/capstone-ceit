const moment = require("moment");

const generateDate = () => {
  uniqueDate = moment().format("MM-DD-YYYY");
  return uniqueDate;
};

module.exports = { generateDate };
