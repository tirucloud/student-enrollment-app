import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.name}!</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Browse Courses</h5>
              <p className="card-text">View and enroll in available courses.</p>
              <button className="btn btn-primary" onClick={() => navigate('/courses')}>View Courses</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Enrollments</h5>
              <p className="card-text">View your enrolled courses.</p>
              <button className="btn btn-primary" onClick={() => navigate('/enrollments')}>View Enrollments</button>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-danger mt-4" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
