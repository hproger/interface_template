import React, { Component } from 'react'
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'
class Reports extends Component {
    render() {
        return (
            <div className="page_reports">
                <BreadcrumbsItem to='/reports'>Отчёты</BreadcrumbsItem>
            </div>
        )
    }
}
export default Reports;