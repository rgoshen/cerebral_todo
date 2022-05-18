import React from "react";
import classNames from "classnames";
import { state, sequences } from "cerebral";
import { connect } from "@cerebral/react";
import { pluralize } from "../utils";

const TodoFooter = connect(
  {
    filter: state`filter`,
    activeTodoCount: state`activeTodoCount`,
    hasCompletedTodos: state`hasCompletedTodos`,
    clearCompleted: sequences`clearCompleted`
  },
  ({ filter, activeTodoCount, hasCompletedTodos, clearCompleted }) => {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeTodoCount}</strong>{" "}
          {pluralize(activeTodoCount, "item")} left
        </span>
        <ul className="filters">
          <li>
            <a href="/" className={classNames({ selected: filter === "all" })}>
              All
            </a>
          </li>{" "}
          <li>
            <a
              href="/active"
              className={classNames({
                selected: filter === "active"
              })}
            >
              Active
            </a>
          </li>{" "}
          <li>
            <a
              href="/completed"
              className={classNames({
                selected: filter === "completed"
              })}
            >
              Completed
            </a>
          </li>
        </ul>
        {hasCompletedTodos ? (
          <button className="clear-completed" onClick={() => clearCompleted()}>
            Clear completed
          </button>
        ) : null}
      </footer>
    );
  }
);

export default TodoFooter;
