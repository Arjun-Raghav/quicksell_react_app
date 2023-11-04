import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleHalfStroke,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import StatusIcon from "../Icons/StatusIcon";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
export default function PriorityCard({ ticket }) {
  let statusIcon;

  if (ticket.status === "Todo") {
    statusIcon = (
      <FontAwesomeIcon
        icon={faCircleRegular}
        style={{
          color: "grey",
          marginRight: "10px",
          scale: "1.4",
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
    statusIcon = <StatusIcon status="Done" />;
  } else if (ticket.status === "Cancelled") {
    statusIcon = <StatusIcon status="Cancelled" />;
  } else {
    statusIcon = <StatusIcon status="Backlog" />;
  }
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-id">{ticket.id}</div>
        <div className="user-icon">
          <FontAwesomeIcon icon={faUser} /> {/* Empty circle icon */}
        </div>
      </div>
      <div className="ticket-title">
        <div className="ticket-status">{statusIcon}</div>
        <p>{ticket.title}</p>
      </div>
      <div className="ticket-footer">
        <div className="ticket-tag">
          <div className="tag-icon">
            <FontAwesomeIcon icon={faCircle} /> {/* Small grey circle icon */}
          </div>
          <div className="tag-name">{ticket.tag}</div>
        </div>
      </div>
    </div>
  );
}
