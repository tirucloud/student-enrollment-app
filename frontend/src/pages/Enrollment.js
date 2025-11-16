import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/enrollments', { withCredentials: true });
        setEnrollments(response.data.enrollments);
      } catch (err) {
        setError('Failed to load enrollments');
      }
    };
    fetchEnrollments();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Enrollments</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {enrollments.map(enrollment => (
          <div key={enrollment.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{enrollment.name}</h5>
                <p className="card-text">{enrollment.description}</p>
                <p className="card-text"><small className="text-muted">Enrolled on: {new Date(enrollment.enrolled_at).toLocaleDateString()}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enrollment;
