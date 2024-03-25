import React, { useState, useEffect } from 'react';

const useOperatingStatus = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://localhost:8081/')
      .then(response => response.json())
      .then(data => setData(data.filteredData))
      .catch(error => console.error('Error:', error));
  }, []);

  return data;
};

const ServerData = () => {
  const data = useOperatingStatus();

  return (
    <div>
      {data ? (
        <p>Operating Status is {data.operatingStatus}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ServerData;
