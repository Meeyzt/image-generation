// userController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const options = { expiresIn: '1h' };

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const user = new User({
        username,
        email,
        password: hashedPassword
      });

      user.save()
        .then((savedUser) => {
          const token = jwt.sign({ userId: savedUser._id }, 'AXW23RFMFJFUEFJEFMKFDSLKFSDFSDFLSDFLK', options);
          res.status(200).send({ token });
        })
        .catch((err) => {
          res.status(500).send(err);
        })
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if(!user) {
        res.status(401).send('User Not Found');
        return;
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else if (!result) {
          res.status(401).send('Wrong Pass');
        } else {
          const token = jwt.sign({ userId: user._id }, 'AXW23RFMFJFUEFJEFMKFDSLKFSDFSDFLSDFLK');
          res.status(200).send({ token });
        }
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    })
};
