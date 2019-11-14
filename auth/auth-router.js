const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 10);
  userInfo.password = hash;

  Users.add(userInfo)
    .then(newUser => {
      const token = generateToken(newUser);
      res.status(201).json(newUser)
    })
    .catch(error => {
      res.status(500).json(error);
    });

})

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });

})


function generateToken(user) {
  // header payload and verify signature
  //payload -> username, id, department
  const payload = {
    sub: user.id,
    username: user.username,
    department: user.department
  }

  const secret = process.env.JWT_SECRET || "no evn secret";

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)

}

module.exports = router;
