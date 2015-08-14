var Channel = require('../models/Channel');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  //query db for channel users
  router.get('/channels', function(req, res) {

    Channel.find({}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  //post a new user to channel list db
  router.post('/add_to_channel', function(req, res) {
    var newUser = new Channel(req.body);
    newUser.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });
}
