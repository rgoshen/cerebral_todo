import { state, props } from "cerebral";
import { set, when, toggle, unset } from "cerebral/factories";
import * as actions from "./actions";

export const initialize = actions.initialize;

export const changeNewTodoTitle = set(state`newTodoTitle`, props`title`);

export const addTodo = [
  actions.createId,
  actions.createTodo,
  set(state`newTodoTitle`, ""),
  when(state`filter`, filter => filter === "completed"),
  {
    true: actions.openActive,
    false: []
  }
];

export const toggleTodo = toggle(state`todos.${props`id`}.completed`);

export const removeTodo = unset(state`todos.${props`id`}`);

export const toggleAllTodos = actions.toggleAllTodos;

export const clearCompleted = actions.clearCompleted;

export const changeEditingTodoTitle = set(
  state`editingTodoTitle`,
  props`title`
);

export const saveEditingTodoTitle = actions.saveEditingTodoTitle;

export const editTodo = [
  set(state`editingTodoId`, props`id`),
  set(state`editingTodoTitle`, state`todos.${props`id`}.title`)
];

export const cancelEditingTodo = set(state`editingTodoId`, null);

export const changeFilter = set(state`filter`, props`filter`);
