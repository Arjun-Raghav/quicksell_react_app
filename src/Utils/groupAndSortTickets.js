import priorityToString from "./priorityToString";

const groupAndSortTickets = (tickets, grouping, sorting, users) => {
  let groupedTickets = {};

  if (grouping === "status") {
    groupedTickets = {
      Backlog: [],
      Todo: [],
      "In progress": [],
      Done: [],
      Cancelled: [],
    };
    tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!groupedTickets[status]) {
        groupedTickets[status] = [];
      }
      groupedTickets[status].push(ticket);
    });
  } else if (grouping === "user") {
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
  } else if (grouping === "priority") {
    [0, 4, 3, 2, 1].forEach((priority) => {
      const priorityGroup = priorityToString(priority);
      groupedTickets[priorityGroup] = tickets.filter(
        (ticket) => ticket.priority === priority
      );
    });
  }

  for (const group in groupedTickets) {
    groupedTickets[group].sort((a, b) => {
      if (sorting === "priority") {
        return b.priority - a.priority;
      } else if (sorting === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }

  return groupedTickets;
};

export default groupAndSortTickets;
