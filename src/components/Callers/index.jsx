import React, { Component } from 'react'
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'
class Callers extends Component {
    render() {
        return (
            <div className="page_callers">
                <BreadcrumbsItem to='/callers'>Обзвоны</BreadcrumbsItem>
            </div>
        )
    }
}
export default Callers;