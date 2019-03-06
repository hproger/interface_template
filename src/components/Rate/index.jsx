import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import routes from '../../routes';
import axios from 'axios';
import ListRate from './ListRate';
import EditorRate from './EditorRate';

import './index.css';
class Rate extends Component {
    constructor() {
        super();
        this.state = {
            rates: [
                {id: 1, name: 'Нагрузка равномерная 1'},
                {id: 2, name: 'Нагрузка равномерная 2'},
                {id: 3, name: 'Нагрузка равномерная 3'},
                {id: 4, name: 'Нагрузка равномерная 4'},
            ],
            status: 0, // 0 - null, 1 - edit, 2 - add
            rateUser: {}
        };
    }
    getListRate = () => {
        console.log('Загружаем коэффициенты...');
       /* axios
            .get(routes.rate.list)
            .then(({ data }) => {
                this.setState({
                    users: data
                });
            })
            .catch(function (error) {
                console.log(error);
            });*/
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
        /*axios
            .post(routes.rate.delete, {id:curID})
            .then(({ data }) => {
                console.log('Пришёл ответ на удаление ', data);
                if (data.result === 1) {
                    delete this.state.users[curIndex];
                    this.setState({
                        users: this.state.users
                    });
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });*/
    }
    handleSave = (rateUser) => {
        /*if (this.state.statusUser === 1) {
            axios
                .post(routes.rate.edit, {id: user.id, name: user.name, login: user.login, pass: user.pass})
                .then(({ data }) => {
                    console.log('Отредактировали пользователя ', data);
                    this.getListUser();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else if (this.state.statusUser === 2) {
            axios
                .post(routes.rate.add, {name: user.name, login: user.login, pass: user.pass})
                .then(({ data }) => {
                    console.log('Добавился пользователь ', data);
                    this.state.users.push({id: parseInt(data.id), name: user.name, login: user.login, pass: user.pass});
                    this.setState({
                        users: this.state.users
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }*/
        
    }
    render() {
        return(
            <div className="page_rates">
                <BreadcrumbsItem to='/rates'>Коэффициенты</BreadcrumbsItem>
                <div className="row">
                    <div className="col-md-12">
                        <span className="add_btn" onClick={() => this.handleAddRate()}>
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
                        rateUser={this.state.status === 1 ? this.state.rateUser : null}
                        handleSave={this.handleSave}
                        handleHide={this.handleHide}
                    />
                </div>
            </div>
        )
    }
}

export default Rate;