import React, { FunctionComponent } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "../../pages/Home";
import routes from "./routes";
import CatDetails from "../../pages/CatDetails";

interface OwnProps {
  // Add some types here
  temp?: any;
}

type Props = OwnProps;

const Index: FunctionComponent<Props> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.catDetails} element={<CatDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
