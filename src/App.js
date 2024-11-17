import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setResponse, setStatus } from './store/wineSlice';
import Selector from './components/Selector';
import WineList from './components/WineList';
import { useFetchWineData } from './useFetchWineData';
import WineViz from './components/WineViz';

function App() {
  const { data, loading, error } = useFetchWineData('http://localhost:5000/unique-wines');
  const [selections, setSelections] = useState({});
  const [numberSelection, setNumberSelection] = useState(10); // Default to 10
  const [resetTrigger, setResetTrigger] = useState(false); // Trigger for resetting dropdowns
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
      number: numberSelection,
    };

    console.log('Payload: +++++++++\n' + JSON.stringify(payload, null, 2) + '\n = ==========');

    dispatch(setStatus('loading'));
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

      dispatch(setResponse(responseData));
      dispatch(setStatus('succeeded'));
    } catch (error) {
      console.error('Error making POST request:', error);
      dispatch(setStatus('failed'));
    }
  };

  const handleClearButtonClick = () => {
    setSelections({});
    setNumberSelection(10);
    setResetTrigger((prev) => !prev); // Toggle reset trigger
    dispatch(setResponse(null)); // Clear the WineList
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    // <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <div>
      <h1>Wine Selection : Make sure https://github.com/mulefish/wine2 is running</h1>
      {/* <Selector
        id="A"
        data={data}
        onSelectionChange={handleSelectionChange}
        resetTrigger={resetTrigger} // Pass reset trigger to Selector
      /> */}


<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Selector Widget */}
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Selector
            id="A"
            data={data}
            onSelectionChange={handleSelectionChange}
            resetTrigger={resetTrigger}
          />
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

        </div>

        {/* Wine Visualization */}
        <div style={{ flex: '2' }}>
          <WineViz />
        </div>
      </div>


      <button
        style={{
          marginTop: '20px',
          marginRight: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={handleButtonClick}
      >
        Log Selections
      </button>
      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={handleClearButtonClick}
      >
        Clear
      </button>
      <div>
</div>
      <WineList />
    </div>
  );
}

export default App;
