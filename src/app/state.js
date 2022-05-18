import { state } from "cerebral";

export default {
  todos: {},
  newTodoTitle: "",
  filter: "all",
  editingTodoId: null,
  editingTodoTitle: "",
  currentTodos: get => {
    return Object.values(get(state`todos`)).filter(todo => {
      switch (get(state`filter`)) {
        case "active":
          return !todo.completed;
        case "completed":
          return todo.completed;
        default:
          return true;
      }
    });
  },
  activeTodoCount: get =>
    Object.values(get(state`todos`)).filter(todo => !todo.completed).length,
  hasCompletedTodos: get =>
    Object.values(get(state`todos`)).some(todo => todo.completed),
  isAllTodosChecked: get => {
    const currentTodos = get(state`currentTodos`);

    return Boolean(
      currentTodos.length &&
        Object.values(currentTodos).every(todo => todo.completed)
    );
  }
};
