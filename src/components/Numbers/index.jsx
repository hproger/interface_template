import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import axios from 'axios';
import ListNumbers from './ListNumbers';
import EditorNumber from './EditorNumber';
import './index.css';

class Numbers extends Component {
    constructor() {
        super();
        this.state = {
            numbers: [
                {id: 1, number: '+7(495)1234565'},
                {id: 2, number: '+7(495)1234567'},
                {id: 3, number: '+7(495)1234568'},
                {id: 4, number: '+7(495)1234569'},
            ],
            number: {},
            status: 0, // 0 - null, 1 - edit, 2 - add
        };
    }
    getListNumbers = () => {
        console.log('Загружаем номера...');
        /*axios
            .get(routes.schedule.list)
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
        this.getListNumbers();
    }
    handleAddNumber = () => {
        this.setState({status: 2});
    }
    handleAddGroupNumbers = () => {
        this.setState({status: 2});
    }
    handleHide = () => {
        this.setState({status: 0});
    }
    handleEdit = (number) => {
        console.log(number);
        this.setState({
            status: 1,
            number
        });
    }
    handleRemove = (curID, curIndex) => {
        console.log('Удаляем ',curID);
        /*axios
            .post(routes.schedule.delete, {id:curID})
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
    handleSave = (number) => {
        if (this.state.status === 1) {
            /*axios
                .post(routes.schedule.edit, {id: user.id, name: user.name, login: user.login, pass: user.pass})
                .then(({ data }) => {
                    console.log('Отредактировали пользователя ', data);
                    this.getListUser();
                })
                .catch(function (error) {
                    console.log(error);
                });*/
        }
        else if (this.state.status === 2) {
            /*axios
                .post(routes.schedule.add, {name: user.name, login: user.login, pass: user.pass})
                .then(({ data }) => {
                    console.log('Добавился пользователь ', data);
                    this.state.users.push({id: parseInt(data.id), name: user.name, login: user.login, pass: user.pass});
                    this.setState({
                        users: this.state.users
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });*/
        }
        
    }
    render() {
        return(
            <div className="page_numbers">
                <BreadcrumbsItem to='/numbers'>Группы номеров</BreadcrumbsItem>
                <div className="row">
                    <div className="col-md-12">
                        <span className="add_btn" onClick={() => this.handleAddGroupNumbers()}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Добавить группу номеров
                        </span>
                        {/* <span className="add_btn" onClick={() => this.handleAddNumber()}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Добавить номер
                        </span>
                        <span className="del_btn" onClick={() => console.log('удаление ... ')}>
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;Удалить выделенные
                        </span>
                        <span className="del_all_btn" onClick={() => console.log('удаление всех номеров из списка... ')}>
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;Удалить все номера из списка
                        </span> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <ListNumbers 
                            numbers={this.state.numbers}
                            handleEdit={this.handleEdit}
                            handleRemove={this.handleRemove}
                        />
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <EditorNumber 
                            numberEl={this.state.number}
                            handleSave={this.handleSave}
                            handleHide={this.handleHide}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Numbers;