/**
 * Artist model Schema for the database
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MODEL_NAME = 'Artist';
const COLLECTION_NAME = require('../db/collections').ARTIST_COLLECTION;

const Artist = new Schema({
  artist: { type: String, required: true },
  rate: Number,
  streams: Number,
  isPaid: Boolean
});

/* Connect model to Mongoose */
var Model = require('../db/db').getDb().model(MODEL_NAME, Artist, COLLECTION_NAME);

module.exports = {
  Model
}; 
