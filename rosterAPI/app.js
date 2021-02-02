/**
 * Initialize and direct routes to controllers for requests.
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

/* Express Initialization */
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

/* Initialize the router controllers */
app.use(`/artists`, require('./controllers/artistController'));

module.exports = app;
