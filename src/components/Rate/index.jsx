import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import routes from '../../routes';
import axios from 'axios';
import _ from 'lodash';
import ListRate from './ListRate';
import EditorRate from './EditorRate';

import './index.css';
class Rate extends Component {
    constructor() {
        super();
        this.state = {
            rates: [
                // {id: 1, name: 'Нагрузка равномерная 1'},
                // {id: 2, name: 'Нагрузка равномерная 2'},
                // {id: 3, name: 'Нагрузка равномерная 3'},
                // {id: 4, name: 'Нагрузка равномерная 4'},
            ],
            status: 0, // 0 - null, 1 - edit, 2 - add
            rateUser: null
        };
    }
    getListRate = () => {
        console.log('Загружаем коэффициенты...');
        axios
            .get(routes.rate.list)
            .then(({ data }) => {
                this.setState({
                    rates: data,
                    rateUser: null
                });
                console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentWillMount() {
        this.getListRate();
    }
    handleAddRate = () => {
        this.setState({status: 2});
    }
    handleHide = () => {
        this.setState({status: 0});
    }
    handleEdit = (rateUser) => {
        console.log(rateUser);
        this.setState({
            status: 1,
            rateUser
        });
    }
    handleRemove = (curID, curIndex) => {
        console.log('Удаляем ',curID);
        axios
            .post(routes.rate.delete, {id:curID})
            .then(({ data }) => {
                console.log('Пришёл ответ на удаление ', data);
                if (data.result === 1) {
                    let tmpRates = this.state.rates;
                    tmpRates.splice(curIndex,1);
                    this.setState({
                        rates: tmpRates
                    });
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleSave = (rateUser) => {
        if (this.state.status === 1) {
            axios
                .post(routes.rate.edit, {id: rateUser.id, name: rateUser.name, average_day: rateUser.average_day, data: rateUser.data})
                .then(({ data }) => {
                    console.log('Отредактировали коэффициент ', data);
                    this.getListRate();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else if (this.state.status === 2) {
            axios
                .post(routes.rate.add, {name: rateUser.name, average_day: rateUser.average_day, data: rateUser.data})
                .then(({ data }) => {
                    if (data.result === 1) {
                        console.log('Добавился коэффициент ', data);
                        let tmpRates = this.state.rates;
                        tmpRates.push({id: parseInt(data.id), name: rateUser.name, data: rateUser.data});
                        this.setState({
                            rates: tmpRates
                        })
                    }
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    }
    render() {
        return(
            <div className="page_rates">
                <BreadcrumbsItem to='/rates'>Коэффициенты</BreadcrumbsItem>
                <div className="row">
                    <div className="col-md-12">
                        <span className="add_btn" data-toggle="modal" data-target='#editor-rate' onClick={() => this.handleAddRate()}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Добавить нагрузку
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <ListRate rates={this.state.rates} handleEdit={this.handleEdit} handleRemove={this.handleRemove} />
                    </div>
                    <EditorRate 
                        title="Редактирование графика нагрузки"
                        rateUser={this.state.status === 1 ? _.cloneDeep(this.state.rateUser) : null}
                        handleSave={this.handleSave}
                        handleHide={this.handleHide}
                    />
                </div>
            </div>
        )
    }
}

export default Rate;