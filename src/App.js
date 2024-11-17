import React, { useState } from 'react';
import Selector from './components/Selector';
import { useFetchWineData } from './useFetchWineData';

function App() {
  const { data, loading, error } = useFetchWineData('http://localhost:5000/unique-wines');
  const [selections, setSelections] = useState({});
  const [numberSelection, setNumberSelection] = useState(10); // Default to 10

  const handleSelectionChange = (id, key, value) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: value,
    }));
  };

  const handleNumberChange = (e) => {
    setNumberSelection(Number(e.target.value));
  };

  const handleButtonClick = () => {
    const payload = {
      selections,
      number: numberSelection, // Include the selected number
    };

    console.log('Payload: +++++++++\n' + JSON.stringify( payload, null, 2 ) + "\n = ==========");
    // Use the payload in your API call or other logic
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
      <Selector id="A" data={data} onSelectionChange={handleSelectionChange} />
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="number-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Select a Number:
        </label>
        <select
          id="number-select"
          value={numberSelection}
          onChange={handleNumberChange}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={100}>100</option>
        </select>
      </div>
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
