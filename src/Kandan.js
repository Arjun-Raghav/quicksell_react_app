import React, { useState, useEffect } from 'react';
import './index.css'; // Import your CSS styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faEllipsisH, faCheck, faExclamationTriangle, faSignal } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const groupAndSortTickets = (tickets, grouping, sorting, users) => {
    let groupedTickets = {};

    if (grouping === 'status') {
      tickets.forEach((ticket) => {
        const status = ticket.status;
        if (!groupedTickets[status]) {
          groupedTickets[status] = [];
        }
        groupedTickets[status].push(ticket);
      });
    } else if (grouping === 'user') {
      tickets.forEach((ticket) => {
        const userId = ticket.userId;
        const user = users.find((u) => u.id === userId);
        if (user) {
          const userName = user.name;
          if (!groupedTickets[userName]) {
            groupedTickets[userName] = [];
          }
          groupedTickets[userName].push(ticket);
        }
      });
    } else if (grouping === 'priority') {
      [0, 1, 2, 3, 4].forEach((priority) => {
        const priorityGroup = priorityToString(priority);
        groupedTickets[priorityGroup] = tickets.filter((ticket) => ticket.priority === priority);
      });
    }

    for (const group in groupedTickets) {
      groupedTickets[group].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else if (sorting === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    return groupedTickets;
  };

  const priorityToString = (priority) => {
    switch (priority) {
      case 0:
        return 'No priority';
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      case 4:
        return 'Urgent';
      default:
        return '';
    }
  };

  const groupedAndSortedTickets = groupAndSortTickets(tickets, grouping, sorting, users);

  return (
    <div className="kanban-board">
      <div className="options">
        <select onChange={(e) => setGrouping(e.target.value)}>
          <option value="status">Group by Status</option>
          <option value="user">Group by User</option>
          <option value="priority">Group by Priority</option>
        </select>
        <select onChange={(e) => setSorting(e.target.value)}>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      <div className="kanban-columns">
        {Object.keys(groupedAndSortedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <h3>{group}</h3>
            {groupedAndSortedTickets[group].map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const TicketCard = ({ ticket }) => {
  let priorityIcon;

  if (ticket.priority === 4) {
    priorityIcon = <FontAwesomeIcon icon={faExclamationTriangle} />;
  } else if (ticket.priority === 3) {
    priorityIcon = <FontAwesomeIcon icon={faSignal} />;
  } else if (ticket.priority === 2) {
    priorityIcon = <FontAwesomeIcon icon={faSignal} />;
  } else if (ticket.priority === 1) {
    priorityIcon = <FontAwesomeIcon icon={faSignal} />;
  } else {
    priorityIcon = <FontAwesomeIcon icon={faEllipsisH} />;
  }

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-id">{ticket.id}</div>
        <div className="user-icon">
          <FontAwesomeIcon icon={faCircle} /> {/* Empty circle icon */}
        </div>
      </div>
      <div className="ticket-title">
        <strong>{ticket.title}</strong>
      </div>
      <div className="ticket-info">
        <div className="tag-icon">
          <FontAwesomeIcon icon={faCircle} /> {/* Small grey circle icon */}
        </div>
        <div className="ticket-tag">
          {ticket.tag.join(', ')}
        </div>
      </div>
      <div className="priority-icon">
        {priorityIcon}
      </div>
    </div>
  );
};

export default KanbanBoard;
