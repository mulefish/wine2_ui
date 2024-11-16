import React, { useEffect, useState } from 'react';
import Selector from './components/Selector';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState({ A: {}, B: {} });

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

  const handleSelectionChange = (id, key, value) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [id]: {
        ...prevSelections[id],
        [key]: value,
      },
    }));
  };

  const handleButtonClick = () => {
    console.log('Selections for A:', selections.A);
    console.log('Selections for B:', selections.B);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data.</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Wine Selection</h1>
      <h2>Selector A</h2>
      <Selector id="A" data={data} onSelectionChange={handleSelectionChange} />
      <h2>Selector B</h2>
      <Selector id="B" data={data} onSelectionChange={handleSelectionChange} />
      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={handleButtonClick}
      >
        Log Selections
      </button>
    </div>
  );
}

export default App;
