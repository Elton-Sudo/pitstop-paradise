import React from 'react';
import { useNavigate } from 'react-router-dom';

function UnauthPage() {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const messageStyle = {
    color: 'red',
    fontSize: '3em',
    textAlign: 'center',
    animation: 'fadeInSlideDown 1.5s ease-in-out',
    marginBottom: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  };

  // Create a style tag dynamically to insert keyframes
  const addKeyframes = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInSlideDown {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  };

  React.useEffect(() => {
    addKeyframes();
  }, []);

 
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <h1 style={messageStyle}>You don't have access to view this page</h1>
      <button style={buttonStyle} onClick={goToHome}>Go Back to Shop</button>
    </div>
  );
}

export default UnauthPage;
