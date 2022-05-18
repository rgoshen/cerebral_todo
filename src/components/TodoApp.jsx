import React from "react";
import { state, sequences } from "cerebral";
import { connect } from "@cerebral/react";

import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";

const TodoApp = connect(
  {
    newTodoTitle: state`newTodoTitle`,
    currentTodos: state`currentTodos`,
    editingTodoId: state`editingTodoId`,
    isAllTodosChecked: state`isAllTodosChecked`,
    changeNewTodoTitle: sequences`changeNewTodoTitle`,
    addTodo: sequences`addTodo`,
    toggleAllTodos: sequences`toggleAllTodos`
  },
  ({
    newTodoTitle,
    currentTodos,
    editingTodoId,
    isAllTodosChecked,
    changeNewTodoTitle,
    addTodo,
    toggleAllTodos
  }) => {
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={event =>
              changeNewTodoTitle({ title: event.currentTarget.value })
            }
            onKeyDown={event => {
              if (event.keyCode !== 13) return;
              addTodo();
            }}
            autoFocus={true}
          />
        </header>
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={() => toggleAllTodos()}
            checked={isAllTodosChecked}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {currentTodos.map(todo => {
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  isEditing={todo.id === editingTodoId}
                />
              );
            })}
          </ul>
        </section>
        <TodoFooter />
      </div>
    );
  }
);

export default TodoApp;
