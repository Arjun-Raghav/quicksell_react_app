import React from "react";

const SignalIcon = ({ colorScheme }) => {
  const signalStyles = {
    container: {
      display: "flex",
      alignItems: "flex-end", // Align bars to the bottom
      width: "25px", // Adjust the width to make the entire icon smaller
      height: "15px", // Adjust the height to make the entire icon smaller
    },
    bar: {
      width: "5px",
      margin: "0 1px", // Decrease horizontal spacing
    },
  };

  // Define bar colors based on the colorScheme parameter
  let barColors = [];
  if (colorScheme === 1) {
    barColors = ["#444", "#ccc", "#ccc"];
  } else if (colorScheme === 2) {
    barColors = ["#444", "#444", "#ccc"];
  } else if (colorScheme === 3) {
    barColors = ["#444", "#444", "#444"];
  } else {
    barColors = ["#444", "#444", "#444"]; // Default to all dark grey
  }

  return (
    <div className="signal-icon" style={signalStyles.container}>
      <div
        className="signal-bar"
        style={{
          ...signalStyles.bar,
          height: "5px",
          backgroundColor: barColors[0],
        }}
      ></div>
      <div
        className="signal-bar"
        style={{
          ...signalStyles.bar,
          height: "10px",
          backgroundColor: barColors[1],
        }}
      ></div>
      <div
        className="signal-bar"
        style={{
          ...signalStyles.bar,
          height: "15px",
          backgroundColor: barColors[2],
        }}
      ></div>
    </div>
  );
};

export default SignalIcon;
