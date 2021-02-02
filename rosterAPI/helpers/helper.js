/**
 * Helper functions to assist the service
 */
const moment = require('moment'); // TODO: Deprecate moment for date-fns once date-fns has UTC capability

/* Format the date to UTC standard */
const timeStamp = (date) => {
  let formattedDate = moment.utc(date);
  formattedDate = formattedDate.format('YYYY-MM-DD h:mmA');
  return `${formattedDate} UTC`;
};

/* Print a simple timestamp and message to the console */
const logStamp = (message, isError) => {
  let stampedMessage = `[${timeStamp()}] - ${message}`;
  if (isError) {
    console.error(stampedMessage);
  } else {
    console.log(stampedMessage);
  }
};

module.exports = {
  logStamp,
  timeStamp
};
