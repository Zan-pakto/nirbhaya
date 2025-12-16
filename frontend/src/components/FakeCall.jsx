import React, { useState, useEffect } from 'react';

const FakeCall = ({ onClose }) => {
  const [callerName] = useState('Mom');
  const [callDuration, setCallDuration] = useState(0);
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    // Simulate ringing for 3 seconds
    const ringTimer = setTimeout(() => {
      setIsRinging(false);
    }, 3000);

    // Update call duration
    const durationInterval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(ringTimer);
      clearInterval(durationInterval);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full mx-4">
        <div className="text-center">
          {isRinging ? (
            <>
              <div className="mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto flex items-center justify-center text-4xl">
                  📞
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{callerName}</h2>
              <p className="text-gray-600 mb-4">Incoming call...</p>
              <div className="animate-pulse text-primary-600">🔔 Ringing</div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center text-4xl">
                  📞
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{callerName}</h2>
              <p className="text-gray-600 mb-4">{formatTime(callDuration)}</p>
            </>
          )}

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition"
            >
              End Call
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            This is a fake call for safety purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default FakeCall;

