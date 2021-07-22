import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouteWrapper from "./components/RouteWrapper";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider resetCSS={true}>
      <Router>
        <RouteWrapper />
      </Router>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
