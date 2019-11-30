// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");

// // Require all models
// var db = require("./models/index");

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database configuration
var databaseUrl = "bwi-login";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//     res.send("Hello world");
//   });

// Place login credentials into the mongodb db
app.post("/login", function(req, res) {
    var result = req.body;

    // result.email = req.body;
    // result.password = req.body;

            // Insert the data in the scrapedData db
            db.scrapedData.insert(result
                , function(err, inserted) {
                if (err) {
                  // Log the error if one is encountered during the query
                  console.log(err);
                }
                else {
                  // Otherwise, log the inserted data
                  console.log(inserted);
                }
              });
  
    // Results to the browser in json
    res.json(result);
  });

// Retrieve data from the db
app.get("/all", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.scrapedData.find({}, function(error, found) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.json(found);
      }
    });
  });

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }



// "mongodb://localhost/scrapedData"

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapedData";

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true });

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/scrapedData",
//   {
//     useMongoClient: true
//   }
// );

const PORT = process.env.PORT || 3001;
app.listen(PORT);