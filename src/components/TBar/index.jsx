import React from "react";
import { NavLink } from "react-router-dom";
import { PAGES } from "../../constants";
import { PAGES_ROUTE } from "../../pageRoutes";
const TBar = () => {
  const mainPage = PAGES.find((page) => page.route === PAGES_ROUTE.MAIN);

  return (
    <div className="toolbar disf flex_col">
      <nav className="navmenu" role="navigation">
        <ul className="simplemenu">
          <li>
            <NavLink to={mainPage.route} activeClassName="active">
              {mainPage.name}
            </NavLink>
            <ul className="sublevel">
              {PAGES.map(
                (page, index) =>
                  page.isMenu && (
                    <li key={index}>
                      <NavLink to={page.route} activeClassName="active">
                        {page.name}
                      </NavLink>
                    </li>
                  )
              )}
              <li>
                <a href="/logout">Выход</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default TBar;
