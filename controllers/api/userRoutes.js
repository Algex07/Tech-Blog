const router = require("express").Router();
const { User } = require("../../models");

router.post("/signup", async (req, res) => {
  console.log("HIT /api/users/signup ON BACKEND", req.body.userName, req.body.password)
  try {
    const newUser = await User.create({
      userName: req.body.userName,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.userName = newUser.userName;
      req.session.loggedIn = true;
      console.log("req.session", req.session.userId, req.session.userName, req.session.loggedIn)
      res.json(newUser);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.findOne({
      where: {
        userName: req.body.userName
      }
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "No user found" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id,
        req.session.userName = userData.userName;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).redirect('/');

    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;