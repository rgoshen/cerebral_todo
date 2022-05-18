import { state, props, sequences } from "cerebral";

export const initialize = ({ store, get, storage, router }) => {
  store.set("todos", storage.getTodos());

  router.initialize({
    "/": () => get(sequences`changeFilter`)({ filter: "all" }),
    "/active": () => get(sequences`changeFilter`)({ filter: "active" }),
    "/completed": () => get(sequences`changeFilter`)({ filter: "completed" })
  });
};

export const createId = ({ ids }) => ({ id: ids.create() });

export const clearCompleted = ({ store, get }) => {
  const todos = get(state`todos`);
  Object.values(todos).forEach(todo => {
    if (todo.completed) {
      store.unset(`todos.${todo.id}`);
    }
  });
};

export const toggleAllTodos = ({ store, get }) => {
  const isAllChecked = get(state`isAllTodosChecked`);
  const todos = get(state`currentTodos`);

  todos.forEach(todo => {
    store.set(`todos.${todo.id}.completed`, !isAllChecked);
  });
};

export const createTodo = ({ store, get }) => {
  const id = get(props`id`);
  store.set(`todos.${id}`, {
    id,
    title: get(state`newTodoTitle`),
    completed: false
  });
};

export const openActive = ({ router }) => router.openFilter("active");

export const saveEditingTodoTitle = ({ store, get }) => {
  if (get(state`editingTodoTitle`)) {
    const editingTodoId = get(state`editingTodoId`);
    const editingTodoTitle = get(state`editingTodoTitle`);
    store.set(`todos.${editingTodoId}.title`, editingTodoTitle);
    store.set("editingTodoId", null);
  }
};
