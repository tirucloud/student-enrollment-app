const express = require('express');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

const router = express.Router();

// Get all courses
router.get('/', (req, res) => {
  Course.getAll((err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ courses: results });
  });
});

// Enroll in a course
router.post('/:id/enroll', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });

  const courseId = req.params.id;
  const studentId = req.session.userId;

  // Check if already enrolled
  Enrollment.checkEnrollment(studentId, courseId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length > 0) return res.status(400).json({ error: 'Already enrolled in this course' });

    Enrollment.create({ student_id: studentId, course_id: courseId }, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error enrolling in course' });
      res.json({ message: 'Enrolled successfully' });
    });
  });
});

module.exports = router;
