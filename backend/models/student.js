const db = require('../db');

class Student {
  static create(studentData, callback) {
    const { name, email, password } = studentData;
    const query = 'INSERT INTO students (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], callback);
  }

  static findByEmail(email, callback) {
    const query = 'SELECT * FROM students WHERE email = ?';
    db.query(query, [email], callback);
  }

  static findById(id, callback) {
    const query = 'SELECT id, name, email FROM students WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Student;
