const db = require('../db');

class Enrollment {
  static create(enrollmentData, callback) {
    const { student_id, course_id } = enrollmentData;
    const query = 'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)';
    db.query(query, [student_id, course_id], callback);
  }

  static getByStudentId(studentId, callback) {
    const query = `
      SELECT e.id, c.name, c.description, e.enrolled_at
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = ?
    `;
    db.query(query, [studentId], callback);
  }

  static checkEnrollment(studentId, courseId, callback) {
    const query = 'SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?';
    db.query(query, [studentId, courseId], callback);
  }
}

module.exports = Enrollment;
