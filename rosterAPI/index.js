/** 
 * Server file run by Node
 */
require('dotenv').config();
const Helper = require('./helpers/helper');
const port = process.env.PORT;  

require('./db/db').initDb(err => {
  try {
    if (err) throw err;
    // initialise express app
    const app = require('./app');
  
    app.listen(port, (connectError) => {
      if (connectError) throw connectError;
    });
  } catch (error) {
    Helper.logStamp(error.message, true);
  }
});
