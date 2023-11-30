import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactAgents = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          {/* Column for displaying text */}
          <div style={{ padding: '20px' }}>
            <h2>Text Column</h2>
            <p>This is where your text content goes.</p>
            <p>Make sure to adjust the content as needed!</p>
          </div>
        </div>
        <div className="col-lg-6">
          {/* Column for displaying image */}
          <div style={{ padding: '20px' }}>
            <h2>Image Column</h2>
            <img
              src="https://via.placeholder.com/300" // Replace with your image URL
              alt="Placeholder"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAgents;
