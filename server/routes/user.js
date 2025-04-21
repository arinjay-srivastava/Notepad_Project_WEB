const express = require("express");
const User = require("../models/user");
const router = express.Router();

router
  .post('/login', async (req, res) => {
    try {
      const user = await User.login(req.body);
      res.json({ userId: user.userId, username: user.username, firstName: user.firstName, lastName: user.lastName });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  })
  .post('/register', async (req, res) => {
    try {
      const user = await User.register(req.body);
      res.status(201).json({ userId: user.userId, username: user.username, firstName: user.firstName, lastName: user.lastName });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .put('/users/:userId', async (req, res) => {
    try {
      const user = await User.editUser({ ...req.body, userId: req.params.userId });
      res.json({ userId: user.userId, username: user.username, firstName: user.firstName, lastName: user.lastName });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete('/users/:userId', async (req, res) => {
    try {
      await User.deleteUser({ userId: req.params.userId });
      res.json({ success: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .get('/users', async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;