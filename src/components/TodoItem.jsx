import React from "react";
import { state, props, sequences } from "cerebral";
import { connect } from "@cerebral/react";
import classNames from "classnames";

const TodoItem = connect(
  {
    todo: state`todos.${props`id`}`,
    editingTodoTitle: state`editingTodoTitle`,
    toggleTodo: sequences`toggleTodo`,
    editTodo: sequences`editTodo`,
    removeTodo: sequences`removeTodo`,
    changeEditingTodoTitle: sequences`changeEditingTodoTitle`,
    saveEditingTodoTitle: sequences`saveEditingTodoTitle`,
    cancelEditingTodo: sequences`cancelEditingTodo`
  },
  ({
    isEditing,
    todo,
    editingTodoTitle,
    toggleTodo,
    editTodo,
    removeTodo,
    changeEditingTodoTitle,
    saveEditingTodoTitle,
    cancelEditingTodo
  }) => {
    return (
      <li
        className={classNames({
          completed: todo.completed,
          editing: isEditing
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo({ id: todo.id })}
          />
          <label onDoubleClick={() => editTodo({ id: todo.id })}>
            {todo.title}
          </label>
          <button
            className="destroy"
            onClick={() => removeTodo({ id: todo.id })}
          />
        </div>
        {isEditing ? (
          <input
            className="edit"
            value={editingTodoTitle}
            onBlur={() => saveEditingTodoTitle()}
            onChange={event =>
              changeEditingTodoTitle({ title: event.target.value })
            }
            onKeyDown={event => {
              if (event.keyCode === 27) {
                cancelEditingTodo();
              } else if (event.keyCode === 13) {
                saveEditingTodoTitle();
              }
            }}
          />
        ) : null}
      </li>
    );
  }
);

export default TodoItem;
