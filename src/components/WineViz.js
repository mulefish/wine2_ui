import React from 'react';
import { useSelector } from 'react-redux';

const WineViz = () => {
  const response = useSelector((state) => state.wine.response); // Access wine data from Redux

  if (!response || response.status !== 'success' || !response.data.length) {
    return <div>No wine data to visualize</div>;
  }

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 600;

  // Padding
  const padding = 50;

  // Find min and max similarity scores
  const scores = response.data.map((wine) => wine.similarity);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const scoreRange = maxScore - minScore || 1; // Handle edge case where all scores are identical

  // Add 10% buffer to min and max scores
  const adjustedMin = minScore - 0.1 * scoreRange;
  const adjustedMax = maxScore + 0.1 * scoreRange;
  const adjustedRange = adjustedMax - adjustedMin;

  // Calculate Y positions for wines based on similarity
  const yScale = (similarity) =>
    svgHeight - padding - ((similarity - adjustedMin) / adjustedRange) * (svgHeight - 2 * padding);

  // Calculate Y positions for highest and lowest scores
  const highestY = yScale(maxScore);
  const lowestY = yScale(minScore);


  // Randomize X positions to space out wines
  const xPositions = response.data.map(
    () => padding + Math.random() * (svgWidth - 2 * padding)
  );

  return (
    <svg width={svgWidth} height={svgHeight} style={{ border: '1px solid #ccc' }}>
      {/* X and Y axes */}
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={svgHeight - padding}
        stroke="black"
      />
      <line
        x1={padding}
        y1={svgHeight - padding}
        x2={svgWidth - padding}
        y2={svgHeight - padding}
        stroke="black"
      />

      {/* Axis labels */}
      <text x={svgWidth / 2} y={svgHeight - 10} textAnchor="middle" fontSize="14">
        X axis means nothing
      </text>

      {/* Highest and lowest markers */}
      <text x={padding - 45} y={highestY + 5} fill="green" fontSize="14">
        Highest: {maxScore.toFixed(2)}
      </text>
      <text x={padding - 45} y={lowestY + 5} fill="red" fontSize="14">
        Lowest: {minScore.toFixed(2)}
      </text>

      {/* Wine points and labels */}
      {response.data.map((wine, index) => {
        const x = xPositions[index];
        const y = yScale(wine.similarity);

        return (
          <g key={wine.wine_id}>
            {/* Circle for wine point */}
            <circle cx={x} cy={y} r={5} fill="#007BFF" />
            {/* Label for wine */}
            <text x={x + 10} y={y + 5} fontSize="12" fill="#333">
              {wine.wine_name} {wine.similarity.toFixed(2)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default WineViz;
