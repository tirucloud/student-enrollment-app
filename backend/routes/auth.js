const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../models/student');

const router = express.Router();

// Signup
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  Student.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length > 0) return res.status(400).json({ error: 'Email already exists' });

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error hashing password' });

      Student.create({ name, email, password: hashedPassword }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error creating user' });
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  Student.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Error comparing password' });
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      req.session.userId = user.id;
      res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    });
  });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Error logging out' });
    res.json({ message: 'Logout successful' });
  });
});

// Get current user
router.get('/me', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });

  Student.findById(req.session.userId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  });
});

module.exports = router;
