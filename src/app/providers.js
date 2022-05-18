import page from "page";

export const ids = {
  create: () => {
    return Date.now().toString();
  }
};
export const storage = {
  saveTodos: todos => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },
  getTodos: () => {
    return JSON.parse(localStorage.getItem("todos") || "{}");
  }
};
export const router = {
  initialize: routes => {
    Object.keys(routes).forEach(url => {
      page(url, ({ params }) => routes[url](params));
    });
    page.start();
  },
  openFilter: filter => {
    page("/" + filter);
  }
};
