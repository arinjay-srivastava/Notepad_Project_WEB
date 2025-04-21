const express = require("express");
const User = require("../models/user");
const router = express.Router();

router
  // Login
  .post('/login', async (req, res) => {
    try {
      const user = await User.login(req.body);
      res.json({ userId: user.userid, username: user.username, firstName: user.firstname, lastName: user.lastname });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  })

  // Register
  .post('/register', async (req, res) => {
    try {
      const user = await User.register(req.body);
      res.status(201).json({ userId: user.userid, username: user.username, firstName: user.firstname, lastName: user.lastname });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  // Edit user
  .put('/users/:userId', async (req, res) => {
    try {
      const user = await User.editUser({ ...req.body, userid: req.params.userId });
      res.json({ userId: user.userid, username: user.username, firstName: user.firstname, lastName: user.lastname });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  // Delete user
  .delete('/users/:userId', async (req, res) => {
    try {
      await User.deleteUser({ userid: req.params.userId });
      res.json({ success: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;