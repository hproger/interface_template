import React, { Component } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
class Numbers extends Component {
  render() {
    return (
      <div className="page_report_numbers">
        <BreadcrumbsItem to="/reports/numbers">Номера</BreadcrumbsItem>
      </div>
    );
  }
}
export default Numbers;
