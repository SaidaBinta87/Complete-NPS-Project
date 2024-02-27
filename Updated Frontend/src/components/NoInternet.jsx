import React, { useState, useEffect } from 'react';

const InternetStatusChecker = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {!isOnline && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-2">
          No internet<br />Try:<br />
          Checking the network cables, modem, and router<br />
          Reconnecting to Wi-Fi<br />
          Running Windows Network Diagnostics<br />
          ERR_INTERNET_DISCONNECTED
        </div>
      )}
    </div>
  );
};

export default InternetStatusChecker;
