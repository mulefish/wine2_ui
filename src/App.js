import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setResponse, setStatus } from './store/wineSlice';
import Selector from './components/Selector';
import WineList from './components/WineList'; // Import WineList
import { useFetchWineData } from './useFetchWineData';

function App() {
  const { data, loading, error } = useFetchWineData('http://localhost:5000/unique-wines');
  const [selections, setSelections] = useState({});
  const [numberSelection, setNumberSelection] = useState(10); // Default to 10
  const dispatch = useDispatch();

  const handleSelectionChange = (id, key, value) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: value,
    }));
  };

  const handleNumberChange = (e) => {
    setNumberSelection(Number(e.target.value));
  };

  const handleButtonClick = async () => {
    const payload = {
      selections,
      number: numberSelection, // Include the selected number
    };

    console.log('Payload: +++++++++\n' + JSON.stringify(payload, null, 2) + '\n = ==========');

    dispatch(setStatus('loading')); // Set status to loading
    try {
      const response = await fetch('http://127.0.0.1:5000/get_closest_wines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        dispatch(setStatus('failed'));
        return;
      }

      const responseData = await response.json();
      console.log('Response from server:\n' + JSON.stringify(responseData, null, 2));

      // Dispatch the response to Redux
      dispatch(setResponse(responseData));
      dispatch(setStatus('succeeded'));
    } catch (error) {
      console.error('Error making POST request:', error);
      dispatch(setStatus('failed'));
    }
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
      <WineList /> {/* Add WineList component here */}
    </div>
  );
}

export default App;
