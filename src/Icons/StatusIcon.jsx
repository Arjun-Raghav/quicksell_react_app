import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleHalfStroke,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
const StatusIcon = ({ status }) => {
  if (status === "Todo") {
    return <FontAwesomeIcon icon={faCircle} style={{ color: "grey" }} />;
  } else if (status === "In progress") {
    return (
      <FontAwesomeIcon
        icon={faCircleHalfStroke}
        flip="horizontal"
        // rotation={90}
        style={{
          color: "#f2d26e",
          marginRight: "10px",
        }}
      />
    );
  } else if (status === "Backlog") {
    const iconStyle = {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      border: "2px dotted #333",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "5px",
      marginRight: "5px",
    };

    return (
      <div style={iconStyle}>
        {/* You can customize the content inside the circle */}
      </div>
    );
  } else if (status === "Done") {
    return (
      <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#5f6bd2" }} />
    );
  } else if (status === "Cancelled") {
    return <FontAwesomeIcon icon={faCircleXmark} />;
  }
};

export default StatusIcon;
