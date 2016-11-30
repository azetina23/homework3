var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('resume', ['resume']);
var bodyParser = require("body-parser");

app.use(bodyParser.json());

//grabbing html file
app.use(express.static(__dirname + "/public"));

app.get('/resume', function(req, res) {
  console.log("I recieved a GET request")

  db.resume.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });

});

app.post("/resume", function(req, res) {
  console.log(req.body);
  db.resume.insert(req.body, function(err, docs) {
    res.json(docs);
  });
});

app.delete('/resume/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.resume.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.get('/resume/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.resume.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

// app.put('/resume/:id', function(req, res) {
//   var id = req.params.id;
//   console.log(id);
//   db.resume.findAndModify(
//     {query: {_id: mongojs.ObjectId(id)},
//       update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
//       new: true
//     }, function(err,doc) {
//       res.json(doc);
//     });
// });

// listening to things that only have port 3000
app.listen(8080);
console.log("Server running on port 8080");
