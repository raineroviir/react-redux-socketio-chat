var Channel = require('../models/Channel');
var bodyparser = require('body-parser');
var UserList = require('../models/UserList');

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

  router.get('/channels/:id', function(req, res) {

    Channel.find({name: req.params.id}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data)
    })
  })

  //post a new user to channel list db
  router.post('/channels/new_channel', function(req, res) {
    var newChannel = new Channel(req.body);
    newChannel.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  //add users to the channel user list
  // router.patch('/channels/add_user_to_channel', function(req, res) {
  //   var channel = req.body.channel;
  //   var username = req.body.username
  //   console.log(req.body);
  //   Channel.update({name: channel}, { $addToSet: {users: username} },
  //     function(err, data) {
  //       if(err) {
  //         console.log(err);
  //         return res.status(500).json({msg: 'internal server error'});
  //       }
  //     });
  //
  //   res.json({msg: 'added user'});
  // })
  //
  // router.patch('/channels/remove_user_from_channel', function(req, res) {
  //   var username = req.body.username;
  //   var channel = req.body.channel;
  //   console.log(req.body);
  //   Channel.update({name: channel}, { $pull: {users: username} },
  //     function(err, data) {
  //     if(err) {
  //       console.log(err);
  //       return res.status(500).json({msg: 'internal server error'});
  //     }
  //
  //     res.json({msg: 'removed user'});
  //   })
  // })

  router.get('/userlist', function(req, res) {

    UserList.find({}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });


  //users online module ...
  router.post('/userlist/user_is_online', function(req, res) {
    console.log(req.body);
    var newUserListItem = new UserList(req.body);
    newUserListItem.save(
      function(err, data) {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }
        console.log(data)

      res.json({msg: 'added user'});
    });
  })

  router.delete('/userlist/user_is_offline/:id', function(req, res) {
    var username = req.params.id
    UserList.remove({username: username}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

    res.json({msg: 'removed user'});
    })
  })
}
