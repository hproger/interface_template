import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { NavLink } from "react-router-dom";
import { PAGES } from "../../constants";

const Main = () => {
  return (
    <div className="page_main">
      <BreadcrumbsItem to="/">Добро пожаловать</BreadcrumbsItem>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                {PAGES.map(
                  (page, index) =>
                    page.isMenu && (
                      <div key={index} className="col-md-3">
                        <div className="category_block">
                          <NavLink to={page.route} className="category_img">
                            <img src={page.icon} alt={page.name} />
                          </NavLink>
                          <div className="category_title">{page.name}</div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
