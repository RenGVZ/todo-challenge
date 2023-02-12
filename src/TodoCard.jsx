import React from "react";
import { Link } from "react-router-dom";

const TodoCard = ({ item: { id, title, completed, userId } }) => {
  const truncateTitle = (str) => {
    if (str.length > 20) {
      return `${str.slice(0, 20)}...`;
    } else {
      return str;
    }
  };

  return (
    <Link
      to={`details/${id}`}
      key={id}
      className={`todo-card ${completed ? "complete" : "incomplete"}`}
    >
      <p>#{id}</p>
      <p>{truncateTitle(title)}</p>
    </Link>
  );
};

export default TodoCard;
