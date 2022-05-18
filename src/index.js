import React from "react";
import { render } from "react-dom";
import { Container } from "@cerebral/react";
import TodoApp from "./components/TodoApp";
import app from "./app";
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

render(
  <Container app={app}>
    <TodoApp />
  </Container>,
  document.querySelector("#app")
);
