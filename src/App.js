import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/unique-wines')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data.</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Wine Selection</h1>
      <div>
        {Object.keys(data).map((key) => (
          <div key={key} style={{ margin: '20px' }}>
            <label htmlFor={key} style={{ fontWeight: 'bold', marginRight: '10px' }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <select id={key} name={key} style={{ padding: '10px', fontSize: '16px' }}>
              <option value="">-- Select an option --</option>
              {data[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
