/**
 * Controller to manage all requests for artists
 */
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const Artist = require('../models/artist').Model;
const Builder = require('../helpers/builder');
const CustomError = require('../helpers/customError').CustomError;
const ObjectId = require('mongodb').ObjectID;

/**
 * Method: GET
 * Path: artists/
 * Query: any field that is part of Artist schema
 *
 * Designed to provide a simple way to retrieve documents based on it's schema
 */
router.get('/', async (req, res) => {
  try {
    let filter = Builder.formatFilter(req.query.filter);
    if (req.query.range) {
      Builder.formatRange(filter, req.query.range);
    }
    let query = Builder.formatManyRequest(req.query);

    let count = await Artist.countDocuments(filter).exec();
    let results = await Artist.find(filter).sort(query.sort).skip(query.skip).limit(query.limit).exec();
    if (!results.length) {
      throw new CustomError('Record not found');
    }
    Builder.sendSuccessResponse(req.method, res, results, query, count);
  } catch (error) {
    Builder.sendErrorResponse(res, error);
  }
});

/**
 * Method: GET
 * Path: artists/:id
 * Params: MongoId of the document to be queried
 *
 * Designed to provide a simple way to retrieve documents based on it's MongoId.
 */
router.get('/:id', async (req, res) => {
  try {
    let result = await Artist.findById(req.params.id).exec();
    if (!result) {
      throw new CustomError('Record not found');
    }
    Builder.sendSuccessResponse(req.method, res, result);
  } catch (error) {
    Builder.sendErrorResponse(res, error);
  }
});

/**
 * Method: POST
 * Path: artists/
 * Body: artist of Artist schema is required
 *
 * Simple create document path.
 */
router.post('/', async (req, res) => {
  try {
    let newArtist = new Artist(req.body);
    let result = await newArtist.save();
    if (result) {
      Builder.sendSuccessResponse(req.method, res, result);
    } else {
      throw new CustomError('Record could not be created');
    }
  } catch (error) {
    Builder.sendErrorResponse(res, error);
  }
});

/**
 * Method: PUT
 * Path: artists/
 * Body: MongoId and artist of Artist schema is required
 *
 * Update document based on unique MongoId.
 */
router.put('/', async (req, res) => {
  try {
    let mongoId = req.body._id;
    delete req.body._id;
    let result = await Artist.findByIdAndUpdate(mongoId, req.body, { upsert: false, rawResult: true, runValidators: true }).exec();
    if (result.lastErrorObject.updatedExisting) {
      Builder.sendSuccessResponse(req.method, res, result);
    } else {
      throw new CustomError('Record could not be replaced');
    }
  } catch (error) {
    Builder.sendErrorResponse(res, error);
  }
});

/**
 * Method: PATCH
 * Path: artists/
 * Body: MongoId is required
 *
 * Update specific fields of the document based on unique MongoId.
 */
router.patch('/', async (req, res) => {
  try {
    let mongoId = req.body._id;
    delete req.body._id;
    let result = await Artist.findByIdAndUpdate(mongoId, req.body, { upsert: false, rawResult: true, runValidators: true }).exec();
    if (result.lastErrorObject.updatedExisting) {
      let keys = Object.keys(req.body);
      Builder.sendSuccessResponse(req.method, res, keys);
    } else {
      throw new CustomError('Record could not be updated');
    }
  } catch (error) {
    Builder.sendErrorResponse(res, error);
  }
});

/**
 * Method: DELETE
 * Path: artists/:id
 * Params: MongoId of the document to be deleted.
 *
 * Delete document based on unique MongoId.
 */
router.delete('/:id', async (req, res) => {
  try {
    let mongoId = req.params.id;
    let result = await Artist.deleteOne({ _id: ObjectId(mongoId) }).exec();
    if (result.n) {
      Builder.sendSuccessResponse(req.method, res, result);
    } else {
      throw new CustomError('Record could not be deleted');
    }
  } catch (error) {
    Builder.sendErrorResponse(res, error);
  }
});

/**
 * Method: POST
 * Path: artists/load
 *
 * Insert records into database from a static file by bulk.
 */
router.post('/load', async (req, res) => {
  try {
    let bulkRecords = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/roster.json')));
    let results = await Artist.insertMany(bulkRecords.data, {rawResult: true});
    if (results.result.ok) {
      Builder.sendSuccessResponse(req.method, res, null);
    }
  } catch (error) {
    Builder.sendErrorResponse(res, error);
  }
});

module.exports = router;
