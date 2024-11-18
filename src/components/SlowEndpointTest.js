import React, { useState } from "react";

// Component that fetches and displays delayed data
function SlowEndpointTest() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDelayedResponse = async () => {
        setLoading(true);
        setError(null); // Reset error state
        setData(null);  // Reset data state

        try {
            const response = await fetch("http://localhost:5000/delayed_response");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h1>React Fetch with Button</h1>
            <button
                onClick={fetchDelayedResponse}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                Fetch Delayed Response
            </button>
            {loading && <p>Loading data from server...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {data && (
                <div>
                    <h2>Response Data:</h2>
                    <p><strong>Message:</strong> {data.message}</p>
                    <p><strong>Delay:</strong> {data.delay_seconds} seconds</p>
                </div>
            )}
        </div>
    );
}

export default SlowEndpointTest;
