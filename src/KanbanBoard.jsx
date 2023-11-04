import { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusCard from "./Cards/StatusCard";
import UserCard from "./Cards/UserCard";
import PriorityCard from "./Cards/PriorityCard";
import Header from "./Components/Header/Header";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import ColumnIcon from "./Components/ColumnIcon/ColumnIcon";
import groupAndSortTickets from "./Utils/groupAndSortTickets";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export default function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sorting, setSorting] = useState("priority");
  const [users, setUsers] = useState([]);

  // Check and retrieve from localStorage on component mount
  useEffect(() => {
    const savedGrouping = localStorage.getItem("grouping");
    const savedSorting = localStorage.getItem("sorting");

    if (savedGrouping) {
      setGrouping(savedGrouping);
    }

    if (savedSorting) {
      setSorting(savedSorting);
    }
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const groupedAndSortedTickets = groupAndSortTickets(
    tickets,
    grouping,
    sorting,
    users
  );

  return (
    <div className="kanban-board">
      <Header
        grouping={grouping}
        sorting={sorting}
        setGrouping={setGrouping}
        setSorting={setSorting}
      />
      <div className="kanban-columns">
        {Object.keys(groupedAndSortedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <div className="kanban-column-header">
              <div className="kanban-column-header-info">
                <ColumnIcon grouping={grouping} group={group} />
                <p>{group}</p>
                <span>{groupedAndSortedTickets[group].length}</span>
              </div>
              <div className="kanban-column-header-more">
                <FontAwesomeIcon icon={faPlus} />
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>
            {groupedAndSortedTickets[group].map((ticket) => {
              if (grouping === "status") {
                return <StatusCard key={ticket.id} ticket={ticket} />;
              } else if (grouping === "user") {
                return <UserCard key={ticket.id} ticket={ticket} />;
              } else if (grouping === "priority") {
                return <PriorityCard key={ticket.id} ticket={ticket} />;
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
