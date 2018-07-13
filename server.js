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
var packages = mongoose.model('packages', packageSchema);

//Make this available to Node app users.
module.exports = packages;

//----------------------------------------------------------------------------//
//                               Function Calls                               //
//----------------------------------------------------------------------------//

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//----------------------------------------------------------------------------//

app.get('/', function (req, res) {

  res.send("Hello, World!");

});

//----------------------------------------------------------------------------//

app.post('/packages', function(req, res){

  packages.findOneAndUpdate({packageId: req.body.packageId}, req.body , {upsert:true}, function(err, doc) {

    if (!err) {

      console.log('POST -> packageId: ' + req.body.packageId + ', isDelivered: ' + req.body.isDelivered);
      res.send(doc);

    }
    else {

      console.error("An Error has occured :(")
      res.send(err);

    }

  });

});
//----------------------------------------------------------------------------//
app.post('/packageSet', function(req, res) {
  console.log(req.body);
  var dataSet = req.body.packageData;
  console.log(dataSet);
  for(var i = 0; i < dataSet.length; i++) {
    packages.find({packageId: dataSet[i].packageId}, dataSet[i] , {upsert:true}, function(err, doc) {
      if (!err) {
        console.log('POST -> packageId: ' + dataSet[i].packageId + ', isDelivered: ' + dataSet[i].isDelivered);
      }
      else {
        console.error("An Error has occured :(")
        res.send(err);
      }
    });
  }

  res.send("sent")
});

//----------------------------------------------------------------------------//

app.get('/packages/facility/:id', function(req, res){

  var id = req.params['id'];

  packages.find({facilityId: id}, function (err, doc){

      if(!err){

          res.send(doc);

          console.log('Success! Package(s) found!');

      }
      else{

          res.send(err);

          console.error("Error, no packages found!")

      }

  });

});

//----------------------------------------------------------------------------//

app.get('/packages/package/:id', function(req, res){

  var id = req.params['id'];

  packages.find({packageId: id}, function (err, doc){

      if(!err){

          res.send(doc);

          console.log('Success! Package found!');

      }
      else{

          res.send(err);

          console.error("Error, no packages found!")

      }

  });

});


//----------------------------------------------------------------------------//

app.listen(8080, function() {

  console.log('Listening on port 8080!')

});
