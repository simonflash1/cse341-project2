const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let database;

function initDB(callback) {
  if (database) {
    console.log("Database already connected");
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URL).then((client) => {
    database = client;
    callback(null, database);
  });
}

const getDatabase = () => {
  if (!database) {
    throw new Error("Database not connected");
  }
  return database;
};

module.exports = {
  initDB,
  getDatabase,
};
