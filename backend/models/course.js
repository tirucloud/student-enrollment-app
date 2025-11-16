const db = require('../db');

class Course {
  static getAll(callback) {
    const query = 'SELECT * FROM courses';
    db.query(query, callback);
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM courses WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Course;
