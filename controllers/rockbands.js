const mongodb = require("../routes/data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllRockbands = async (req, res) => {
  //#swagger.tags = ["Rockbands"]
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("rockbands")
    .find();
  result.toArray().then((rockbands) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(rockbands);
  });
};

const getRockbandById = async (req, res) => {
  //#swagger.tags = ["Rockbands"]
  const rockbandId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("rockbands")
    .find({ _id: rockbandId });
  result.toArray().then((rockband) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(rockband);
  });
};

const createRockband = async (req, res) => {
    //#swagger.tags = ["Rockbands"]
    const rockband = {
        name: req.body.name,
        year: req.body.year,
        singer: req.body.singer
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("rockbands")
        .insertOne(rockband);
    if (response.acknowledged) {
        res.status(201).json(rockband);
    } else {
    res.status(500).json(response.error || "Some error occured while creating the contact");
  }
};

const updateRockbandById = async (req, res) => {
    //#swagger.tags = ["Rockbands"]
    const rockbandId = new ObjectId(req.params.id);
    const rockband = {
        name: req.body.name,
        year: req.body.year,
        singer: req.body.singer
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("rockbands")
        .replaceOne({ _id: rockbandId }, rockband);
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the contact");
    }
};

const deleteRockbandById = async (req, res) => {
    //#swagger.tags = ["Rockbands"]
    const rockbandId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("rockbands")
        .deleteOne({ _id: rockbandId });
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some error occured while deleting the contact");
    }
};


module.exports = {
  getAllRockbands,
  getRockbandById,
  createRockband,
  updateRockbandById,
  deleteRockbandById,
};
