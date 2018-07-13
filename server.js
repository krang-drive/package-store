//----------------------------------------------------------------------------//
//                               Imports & Constants                          //
//----------------------------------------------------------------------------//

//Importing express module
const express = require('express');

//Setting express to a constant
const app = express();

//Importing mongoose module
var mongoose = require('mongoose');

//Importing body-parser module.
var bodyParser = require('body-parser');

//Setting up constant values for connecting to the database.
const host = process.env.DATABASE_HOST || "package-store-db";
const port = process.env.DATABASE_PORT || 27017;
const database = process.env.DATABASE_NAME || "packagedb";
const user = process.env.DATABASE_USER || 'nodejs';
const pass = process.env.DATABASE_PASS || 'nodejs';
const url = `mongodb://${user}:${pass}@${host}:${port}/${database}`;

//Connecting mongoose to MongoDB
mongoose.connect(url);

//Setting the schema to use mongoose.
var Schema = mongoose.Schema;

//----------------------------------------------------------------------------//
//                               Schema & Model Creation                      //
//----------------------------------------------------------------------------//

//Creating a driverSchema.
var packageSchema = new Schema({

    packageId: String,
    facilityId: String,
    deliveryLocation: String,
    signatureRequired: Boolean,
    isDelivered: Boolean,
    packageWeight: Number

})

//Create a model that uses the schema.
var package = mongoose.model('driver', driverSchema);

//Make this available to Node app users.
module.exports = package;

//----------------------------------------------------------------------------//
//                               Function Calls                               //
//----------------------------------------------------------------------------//

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extented: true }));

//----------------------------------------------------------------------------//

app.get('/', function (req, res) {

  res.send("Hello, World!");

});

//----------------------------------------------------------------------------//

app.get('/packages', function (req, res) {

    package.find({online: req.body.TODOTODOTODO}, function (err, docs) {

      if(!err){

          res.send(docs);

          console.log("Package found.");

      }
      else {

          console.log("Error, no packages found!");

      }

    });

});

//----------------------------------------------------------------------------//

app.post('/packages', function(req, res){


});

//----------------------------------------------------------------------------//

app.get('/packages/:packageId', function(req, res){


});

//----------------------------------------------------------------------------//

app.listen(8080, function() {

  console.log('Listening on port 8080!')

});
