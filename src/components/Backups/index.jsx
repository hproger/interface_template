import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import routes from '../../routes';
import axios from 'axios';
import './index.css';
class Backups extends Component {
    constructor() {
        super();
        this.state = {
            status: 0, // 0 - null, 1 - edit, 2 - add
        };
    }
    handleBackup = (dataBackup) => {
        axios
            .post(routes.rate.edit, {...dataBackup})
            .then(({ data }) => {
                console.log('Бэкап Архивной БД ', data);
                this.getListRate();
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    render() {
        return(
            <div className="page_backups">
                <BreadcrumbsItem to='/backups'>Работа с БД</BreadcrumbsItem>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div><span className="add_btn"><span className="glyphicon glyphicon-tasks" aria-hidden="true"></span> Экспорт базы номеров</span></div>
                        <div><span className="add_btn"><span className="glyphicon glyphicon-tasks" aria-hidden="true"></span> Импорт базы номеров</span></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Backups;