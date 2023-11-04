import React from "react";

const SignalIcon = ({ colorScheme }) => {
  const signalStyles = {
    container: {
      display: "flex",
      alignItems: "flex-end", 
      width: "25px", 
      height: "15px", 
    },
    bar: {
      width: "5px",
      margin: "0 1px", 
    },
  };

  
  let barColors = [];
  if (colorScheme === 1) {
    barColors = ["#444", "#ccc", "#ccc"];
  } else if (colorScheme === 2) {
    barColors = ["#444", "#444", "#ccc"];
  } else if (colorScheme === 3) {
    barColors = ["#444", "#444", "#444"];
  } else {
    barColors = ["#444", "#444", "#444"]; 
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
