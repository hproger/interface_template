import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch,
} from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { ThroughProvider } from "react-through";
import TBar from "./components/TBar";
import "./sources/css/styles.css";
import { PAGES } from "./constants";
import { Preloader } from "./components";

const App = () => (
  <ThroughProvider>
    <Router>
      <div className="container-fluid main_bg full_height">
        <div className="row disf full_height">
          <div className="col-md-2 left_col blue_bg padding_wrap disf">
            <TBar />
          </div>
          <div className="col-md-10 right_col padding_wrap disf flex_col">
            <div className="row panel_top">
              <div className="col-sm-8 col-md-10 pt-left">
                <div className="text-block">
                  {/* Добро пожаловать */}
                  <BreadcrumbsItem to="/">Главная</BreadcrumbsItem>
                  <Breadcrumbs
                    separator={<b> ▶ </b>}
                    item={NavLink}
                    finalItem={"span"}
                  />
                </div>
              </div>
            </div>
            <div className="row panel_content">
              <div className="col-md-12">
                <Switch>
                  {PAGES.map((page, index) => (
                    <Route
                      key={index}
                      path={page.route}
                      exact
                      component={page.component}
                    />
                  ))}
                  <Redirect to="/" />
                </Switch>
              </div>
              <Preloader />
            </div>
          </div>
        </div>
      </div>
    </Router>
  </ThroughProvider>
);

export default App;
