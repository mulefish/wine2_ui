import React, { useState } from 'react';
import Selector from './components/Selector';
import { useFetchWineData } from './useFetchWineData';

function App() {
  const { data, loading, error } = useFetchWineData('http://localhost:5000/unique-wines');
  const [selections, setSelections] = useState({ A: {}, B: {} });

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Wine Selection</h1>
      <h2>Selector A</h2>
      <Selector id="A" data={data} onSelectionChange={handleSelectionChange} />
      <h2>hello</h2>
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
