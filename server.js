// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var dotenv = require('dotenv').config();

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
// I had an issue here.  If you want to connect to a remote server like mlab for heroku, you need to include the database url/uri
// this is the mongodb://jfniegegogij uri that is created automatically when you privision a mlab db in heroku. If you want to create a new user for 
//the db, you can but you need to correctly update the mongodb uri to connect the same data i.e. username and password. See https://devcenter.heroku.com/articles/mongolab#connecting-to-your-mongodb-instance
//See https://youtu.be/2E8eWUHJaNg?list=PLOFmg4xbN_TPrB6w4rThsFanVxJI_SfER for help deploying mongodb to heroku. ***This process will be different if you use conventional routing and models with Mongoose.
//this particular example is for using mongojs npm package along with heroku and mlab.
//This database url will revert to local url, bwi-login (arbitrary), or the process.env.MONGODB_URI for connecting with mlab. No need to create a seperate .env file for storing the MONGODB_URI
var databaseUrl = process.env.MONGODB_URI || "bwi-login";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
// var db = mongoose.connection;
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