var express = require('express');
var router = express.Router();   2020
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/users', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("analatics");
    dbo.collection("users").find({}).toArray(function(err, result) {
      console.log(result);
      if (err) throw err;
      res.status(200).send(result);
      db.close();
    });
  });
});
router.get('/search/:searchstring', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("analatics");
    console.log(req.params.searchstring);
    dbo.collection("users").find( {$or: [{name: new RegExp(req.params.searchstring, 'i') }, 
                                          {username: new RegExp(req.params.searchstring, 'i') }, 
                                          {email: new RegExp(req.params.searchstring, 'i') }   , 
                                          {"address.city": new RegExp(req.params.searchstring, 'i') }
  ]}
      ).toArray(function(err, result) {
      console.log(result);
      if (err) throw err;
      res.status(200).send(result);
      db.close();
    });
  });
});

module.exports = router;