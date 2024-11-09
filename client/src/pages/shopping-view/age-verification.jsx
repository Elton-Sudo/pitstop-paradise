import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AgeVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(null);

  const handleYes = () => {
    navigate('/shop/home');
  };

  useEffect(() => {
    // Capture the previous location
    return () => {
      setPreviousLocation(location.pathname);
    };
  }, [location]);

  const handleNo = () => {
    if (previousLocation) {
      navigate(previousLocation); 
    } else {
      navigate('/'); 
    }
  };

  return (
    <div className="age-verification-background flex flex-col items-center">
      {/* Logo at the top with increased size */}
      <img 
        src="https://res.cloudinary.com/daynaexaz/image/upload/v1728726708/Pitstop_Paradise_logo_1_optimized_1000_ko3i9s.png" 
        alt="Pitstop Paradise Logo" 
        className="mb-4 w-48" 
      />

      {/* Verification Box */}
      <div className="verification-content border-4 border-blue-500 p-6 rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Verify Age</h1>
        <p className="text-lg mb-6">
          You must be at least 18 years old to shop.
        </p>
        <div className="space-x-4">
          <button
            onClick={handleYes}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
