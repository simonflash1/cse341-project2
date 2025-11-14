const mongodb = require("../routes/data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags=['Movies']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Movies']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const movieId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .find({ _id: movieId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  //#swagger.tags=['Movies']
  try {
    const movie = { ...req.body };

    const response = await getCollection().insertOne(movie);

    if (!response.acknowledged) {
      throw new Error("Failed to create movie");
    }

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

const updateMovie = async (req, res, next) => {
  //#swagger.tags=['Movies']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid movie ID");
    }

    const movieId = new ObjectId(req.params.id);
    const movie = { ...req.body };

    const response = await getCollection().replaceOne(
      { _id: movieId },
      movie
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  //#swagger.tags=['Movies']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid movie ID");
    }

    const movieId = new ObjectId(req.params.id);
    const response = await getCollection().deleteOne({ _id: movieId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
};
