import React, { useEffect, useState } from 'react';
import Selector from './components/Selector';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <h2>First Selector</h2>
      <Selector data={data} />
      <h2>Second Selector</h2>
      <Selector data={data} />
    </div>
  );
}

export default App;
