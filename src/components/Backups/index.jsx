import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import routes from '../../routes';
import axios from 'axios';
import FileSaver from 'file-saver';
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
    exportALL = () => {
        axios
            .get(routes.pool.exportALL)
            .then(({ data }) => {
                console.log(data);
                let curDate = new Date(),
                    curYear = curDate.getFullYear(),
                    curMonth = (curDate.getMonth()+1 < 10) ? '0'+(curDate.getMonth()+1) : curDate.getMonth()+1,
                    curDay = (curDate.getDate() < 10) ? '0'+curDate.getDate() : curDate.getDate();

                var blob = new Blob([JSON.stringify(data.data)], {type: "text/plain;charset=utf-8"});
                FileSaver.saveAs(blob, `${curYear}.${curMonth}.${curDay} база номеров.txt`);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    importAllMerge = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => { 
            const file = e.target.files[0]; 
            if (file) {
                const reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function (evt) {
                    axios
                        .post(routes.pool.importAllMerge, {djson:evt.target.result})
                        .then(({ data }) => {
                            console.log(data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                reader.onerror = function (evt) {
                    alert('Ошибка чтения файла');
                }
            }
        }
        input.click();
    }
    render() {
        return(
            <div className="page_backups">
                <BreadcrumbsItem to='/backups'>Работа с БД</BreadcrumbsItem>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div><span className="add_btn" onClick={()=>this.exportALL()}><span className="glyphicon glyphicon-tasks" aria-hidden="true"></span> Экспорт базы номеров</span></div>
                        <div><span className="add_btn" onClick={()=>this.importAllMerge()}><span className="glyphicon glyphicon-tasks" aria-hidden="true"></span> Импорт базы номеров</span></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Backups;