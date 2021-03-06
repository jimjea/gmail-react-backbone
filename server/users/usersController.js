var User = require('../mongo.js').user;

module.exports = {
  signup: function(req, res) {
    var username = req.body.username + '@jimmail.com';
    var password = req.body.password;

// should return proper error so angular knows when it has passed or failed
    User.findOne({username: username})
      .exec(function(err, found) {
        if (found) {
          res.status(500).send('User already exists');
        } else {
          var newUser = new User({
            username: username,
            password: password
          })
          newUser.save();
          console.log('User saved');
          res.send('Successful Signup');
        }
      })
  },

  signin: function(req, res) {
    var username = req.body.username + '@jimmail.com';
    var password = req.body.password;

    User.findOne({username: username})
      .exec(function(err, found) {
        if (!found) {
          res.status(404).end();
        } else {
          res.redirect('http://localhost:8000/#/inbox')
          // res.send('Login successful');
        }
      })
  }
}