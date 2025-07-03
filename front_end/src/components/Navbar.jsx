// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-2"
      style={{ backgroundColor: '#007BFF', color: 'white' , minHeight: '20px' , maxHeight: '50px' }}
    >
      <h4 className="m-0">FINMAN Dashboard</h4>
      <div>
        <button
          style={{ fontSize: '18px', padding: '10px 16px', marginRight: '12px', maxHeight:'40px' }}
          className="btn btn-warning"
          onClick={() => navigate('/summary')}
        >
          Transaction Summary
        </button>
        <button
          style={{ fontSize: '18px', padding: '10px 16px', maxHeight: '40px'}}
          className="btn btn-light"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
