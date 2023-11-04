import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleHalfStroke,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { faSignal } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import StatusIcon from "../Icons/StatusIcon";
import SignalIcon from "../Icons/SignalIcon";

export default function UserCard({ ticket }) {
  let priorityIcon;
  let statusIcon;

  if (ticket.status === "Todo") {
    statusIcon = (
      <FontAwesomeIcon
        icon={faCircleRegular}
        style={{
          color: "grey",
          marginRight: "10px",
          scale: "1.25",
        }}
      />
    );
  } else if (ticket.status === "In progress") {
    statusIcon = (
      <FontAwesomeIcon
        icon={faCircleHalfStroke}
        flip="horizontal"
        // rotation={90}
        style={{
          color: "#f2d26e",
          marginRight: "10px",
          scale: "1.4",
        }}
      />
    );
  } else if (ticket.status === "Done") {
    statusIcon = <FontAwesomeIcon icon={faSignal} />;
  } else if (ticket.status === "Cancelled") {
    statusIcon = <FontAwesomeIcon icon={faSignal} />;
  } else {
    statusIcon = <StatusIcon status="Backlog" />;
  }

  if (ticket.priority === 4) {
    priorityIcon = (
      <div className="urgent-icon">
        <FontAwesomeIcon icon={faExclamation} style={{ color: "white" }} />
      </div>
    );
  } else if (ticket.priority === 3) {
    priorityIcon = <SignalIcon colorScheme={3} />;
  } else if (ticket.priority === 2) {
    priorityIcon = <SignalIcon colorScheme={2} />;
  } else if (ticket.priority === 1) {
    priorityIcon = <SignalIcon colorScheme={1} />;
  } else {
    priorityIcon = <FontAwesomeIcon icon={faEllipsisH} />;
  }

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-id">{ticket.id}</div>
      </div>
      <div className="ticket-title">
        <div className="ticket-status">{statusIcon}</div>
        <p>{ticket.title}</p>
      </div>
      <div className="ticket-footer">
        <div className="priority-icon">{priorityIcon}</div>

        <div className="ticket-tag">
          <div className="tag-icon">
            <FontAwesomeIcon icon={faCircle} /> 
          </div>
          <div className="tag-name">{ticket.tag}</div>
        </div>
      </div>
    </div>
  );
}
