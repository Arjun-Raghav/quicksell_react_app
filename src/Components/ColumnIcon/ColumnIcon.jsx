import StatusIcon from "../../Icons/StatusIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignal,
  faEllipsisH,
  faExclamationTriangle,
  faCircleXmark,
  faCheck,
  faCircleCheck,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import SignalIcon from "../../Icons/SignalIcon";

export default function ColumnIcon({ grouping, group }) {
  if (grouping == "status") {
    let statusIcon;

    if (group === "Todo") {
      statusIcon = <StatusIcon status="Todo" />;
    } else if (group === "In progress") {
      statusIcon = <StatusIcon status="In progress" />;
    } else if (group === "Done") {
      statusIcon = <StatusIcon status="Done" />;
    } else if (group === "Cancelled") {
      statusIcon = (
        <FontAwesomeIcon icon={faCircleXmark} style={{ color: "grey" }} />
      );
    } else {
      statusIcon = <StatusIcon status="Backlog" />;
    }
    return statusIcon;
  } else if (grouping == "user") {
    return (
      <div className="user-icon">
        <FontAwesomeIcon icon={faUser} /> {/* Empty circle icon */}
      </div>
    );
  } else if (grouping == "priority") {
    let priorityIcon;

    if (group === "Urgent") {
      priorityIcon = (
        <div className="urgent-icon">
          <FontAwesomeIcon icon={faExclamation} style={{ color: "white" }} />
        </div>
      );
    } else if (group === "High") {
      priorityIcon = <SignalIcon colorScheme={3} />;
    } else if (group === "Medium") {
      priorityIcon = <SignalIcon colorScheme={2} />;
    } else if (group === "Low") {
      priorityIcon = <SignalIcon colorScheme={1} />;
    } else {
      priorityIcon = <FontAwesomeIcon icon={faEllipsisH} />;
    }
    return priorityIcon;
  }
}
