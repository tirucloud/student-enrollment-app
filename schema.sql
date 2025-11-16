-- Create database
CREATE DATABASE IF NOT EXISTS student_enrollment;
USE student_enrollment;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_enrollment (student_id, course_id)
);

-- Insert sample data
INSERT INTO courses (name, description) VALUES
('Introduction to Computer Science', 'Learn the basics of programming and computer science concepts.'),
('Web Development Fundamentals', 'Build dynamic websites using HTML, CSS, and JavaScript.'),
('Database Design', 'Understand relational databases and SQL.'),
('Data Structures and Algorithms', 'Master essential data structures and algorithmic thinking.'),
('Machine Learning Basics', 'Introduction to machine learning concepts and techniques.');
