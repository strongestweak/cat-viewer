import React from "react";
import Helmet from "react-helmet";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navigation from "./components/Navigation";
import "./styles/_global.scss";
import { text } from "./utils";

function App() {
  return (
    <Provider store={store}>
      <Helmet>
        <title>{text.title}</title>
      </Helmet>
      <Navigation />
    </Provider>
  );
}

export default App;
