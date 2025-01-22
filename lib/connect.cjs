var Db = require("tingodb")().Db;
var assert = require("assert");

// Create a connection to the database located in the user's home directory.
var db = new Db(process.env.HOME || process.env.USERPROFILE, {});
var collection = db.collection("todo-cli");

/**
 * Inserts a new to-do entry into the collection.
 * @param {Object} dataToInsert - The data object containing the to-do details to be inserted.
 * @param {string} dataToInsert.todoName - The name of the to-do.
 * @param {Object} dataToInsert - Other key-value pairs representing additional properties of the to-do.
 * @returns {void} - No return value; however, the operation will log errors if they occur.
 */
function InserData(dataToInsert) {
  collection.insert(dataToInsert, { w: 1 }, function (err, result) {
    if (err) {
      // Log error if insert fails
      console.error("Error during insert:", err);
      return;
    }
    // Successful insert (optional log statement can be added if needed)
  });
}

/**
 * Fetches a specific to-do by its name from the collection.
 * @param {string} title - The name of the to-do to fetch.
 * @returns {Promise<Object|null>} - Returns a Promise that resolves with the fetched to-do object, or null if no to-do is found.
 * @throws {Error} - If an error occurs while fetching the to-do.
 */
function FetchData(title) {
  return new Promise((resolve, reject) => {
    collection.findOne({ todoName: title }, { w: 1 }, function (err, result) {
      if (err) {
        // Log error if fetch fails
        console.error("Error during fetch:", err);
        reject(err);
        return;
      }
      resolve(result); // Resolve with the fetched result or null if not found
    });
  });
}

/**
 * Fetches all to-dos from the collection.
 * @returns {Promise<Array>} - Returns a Promise that resolves with an array of all to-dos.
 * @throws {Error} - If an error occurs while fetching the to-dos.
 */
function FetchAllData() {
  return new Promise((resolve, reject) => {
    collection.find().toArray(function (err, result) {
      if (err) {
        // Log error if fetch fails
        console.error("Error during fetch:", err);
        reject(err);
        return;
      }
      resolve(result); // Resolve with the array of fetched to-dos
    });
  });
}

module.exports = { InserData, FetchData, FetchAllData };
