import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function Header({ grouping, sorting, setGrouping, setSorting }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to update the state and localStorage
  const updateStateAndLocalStorage = (key, value) => {
    if (key === "grouping") {
      setGrouping(value);
    } else if (key === "sorting") {
      setSorting(value);
    }

    localStorage.setItem(key, value);
  };

  // Close dropdown when user clicks outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <div className="ref-handler" ref={dropdownRef}>
        <button className="toggle-button" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faSliders} />
          <p>Display</p>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <div className="dropdown-item">
              <p> Grouping</p>
              <select
                value={grouping}
                onChange={(e) =>
                  updateStateAndLocalStorage("grouping", e.target.value)
                }
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <p>Ordering</p>
              <select
                value={sorting}
                onChange={(e) =>
                  updateStateAndLocalStorage("sorting", e.target.value)
                }
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
