import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import SignalIcon from "../Icons/SignalIcon";
import "./Card.css";

export default function StatusCard({ ticket }) {
  let priorityIcon;

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
        <div className="user-icon">
          <FontAwesomeIcon icon={faUser} /> 
        </div>
      </div>
      <div className="ticket-title">
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
