import React, { useState, useEffect } from 'react';
import './index.css'; // Import your CSS styles

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const groupAndSortTickets = (tickets, grouping, sorting) => {
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
        if (!groupedTickets[userId]) {
          groupedTickets[userId] = [];
        }
        groupedTickets[userId].push(ticket);
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

  const groupedAndSortedTickets = groupAndSortTickets(tickets, grouping, sorting);

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
              <div key={ticket.id} className="ticket">
                <h4>{ticket.title}</h4>
                <p>Status: {ticket.status}</p>
                <p>Priority: {ticket.priority}</p>
                <p>Tags: {ticket.tag.join(', ')}</p>
                <p>ID: {ticket.id}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
