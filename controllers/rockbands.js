const mongodb = require("../routes/data/database");
const ObjectId = require("mongodb").ObjectId;

const getCollection = () =>
  mongodb.getDatabase().db().collection("rockbands");

const getAllRockbands = async (req, res, next) => {
  //#swagger.tags = ["Rockbands"]
  try {
    const rockbands = await getCollection().find().toArray();
    res.status(200).json(rockbands);
  } catch (err) {
    next(err);
  }
};

const getRockbandById = async (req, res, next) => {
  //#swagger.tags = ["Rockbands"]
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const rockband = await getCollection().findOne({ _id: new ObjectId(id) });

    if (!rockband) {
      return res.status(404).json({ message: "Rockband not found" });
    }

    res.status(200).json(rockband);
  } catch (err) {
    next(err);
  }
};

const createRockband = async (req, res, next) => {
  //#swagger.tags = ["Rockbands"]
  try {
    const rockband = {
      name: req.body.name,
      year: req.body.year,
      singer: req.body.singer,
    };

    const response = await getCollection().insertOne(rockband);

    if (!response.acknowledged) {
      throw new Error("Failed to create rockband");
    }

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

const updateRockbandById = async (req, res, next) => {
  //#swagger.tags = ["Rockbands"]
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const rockband = {
      name: req.body.name,
      year: req.body.year,
      singer: req.body.singer,
    };

    const response = await getCollection().replaceOne(
      { _id: new ObjectId(id) },
      rockband
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Rockband not found" });
    }

    res.status(200).json({ message: "Rockband updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteRockbandById = async (req, res, next) => {
  //#swagger.tags = ["Rockbands"]
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const response = await getCollection().deleteOne({
      _id: new ObjectId(id),
    });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Rockband not found" });
    }

    res.status(200).json({ message: "Rockband deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRockbands,
  getRockbandById,
  createRockband,
  updateRockbandById,
  deleteRockbandById,
};
