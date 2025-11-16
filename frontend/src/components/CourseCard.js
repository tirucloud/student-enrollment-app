import React, { useState } from 'react';
import axios from 'axios';

const CourseCard = ({ course }) => {
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState('');

  const handleEnroll = async () => {
    try {
      await axios.post(`http://localhost:5000/api/courses/${course.id}/enroll`, {}, { withCredentials: true });
      setEnrolled(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Enrollment failed');
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{course.name}</h5>
        <p className="card-text">{course.description}</p>
        {enrolled ? (
          <button className="btn btn-success" disabled>Enrolled</button>
        ) : (
          <button className="btn btn-primary" onClick={handleEnroll}>Enroll</button>
        )}
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default CourseCard;
