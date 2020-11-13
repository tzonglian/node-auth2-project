const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

// Secret used to make JWT
const { jwtSecret } = require("./secrets.js");

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "60 seconds",
  };
  return jwt.sign(payload, jwtSecret, options);
}

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        console.log(user);
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user);
          console.log("token: ", token);
          res
            .status(200)
            .json({ message: `Welcome to our API, ${user.username}`, token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username and password.  Password is alphanumeric.",
    });
  }
});

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    // hashing password
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    // Save user to database
    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username, password, and department.  Password should be alphanumeric.",
    });
  }
});

module.exports = router;
