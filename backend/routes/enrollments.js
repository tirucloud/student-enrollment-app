const express = require('express');
const Enrollment = require('../models/enrollment');

const router = express.Router();

// Get enrolled courses for current user
router.get('/', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });

  Enrollment.getByStudentId(req.session.userId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ enrollments: results });
  });
});

module.exports = router;
