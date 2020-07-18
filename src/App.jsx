import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { ThroughProvider } from "react-through";
import TBar from "./components/TBar";
import "./sources/css/styles.css";
import { PAGES } from "./constants";

const App = () => {
  return (
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
                  {PAGES.map((page, index) => (
                    <Route
                      key={index}
                      path={page.route}
                      exact
                      component={page.component}
                    />
                  ))}
                  <Redirect to="/" />
                </div>
                <div id="preloader">
                  <div className="sk-folding-cube">
                    <div className="sk-cube sk-cube-1"></div>
                    <div className="sk-cube sk-cube-2"></div>
                    <div className="sk-cube sk-cube-3"></div>
                    <div className="sk-cube sk-cube-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </ThroughProvider>
  );
};

export default App;
