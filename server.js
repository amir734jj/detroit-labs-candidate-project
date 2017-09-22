var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/', express.static('public'));

var port = process.env.PORT || 3000;
var router = express.Router();


// Rover logic, converted from Rover.ts
var Rover = require('./models/Rover.ts.js')({
  height: 50,
  width: 50
});

var _ROVER_ = null;
var _OBSTACLES_ = Array();

router.get('/', (req, res) => {
  var message = "Welcome to rover api!";

  if (_ROVER_) {
    message += "\n" + JSON.stringify(_ROVER_.coordinate);
  } else {
    message += "\n" + "Please initialize your rover!";
  }

  res.send(message);
});

router.post('/rover/init', (req, res) => {
  _ROVER_ = new Rover({ x: req.body.x, y: req.body.y }, req.body.direction);
  res.json(_ROVER_);
});

router.post('/rover/move/:direction', (req, res) => {
  if (_ROVER_) {
    _ROVER_.move(req.params.direction);
    res.json(_ROVER_);
  } else {
    res.sendStatus(500);
  }
});


app.use('/api', router);

app.listen(port, () => {
  console.log('Magic happens on port ' + port);
});
