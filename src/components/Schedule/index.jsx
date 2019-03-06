import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import axios from 'axios';
import ListSchedule from './ListSchedule';
import EditorSchedule from './EditorSchedule';

class Schedule extends Component {
    constructor() {
        super();
        this.state = {
            schedules: [],
            status: 0, // 0 - null, 1 - edit, 2 - add
        };
    }
    getListSchedule = () => {
        console.log('Загружаем расписания...');
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
        this.getListSchedule();
    }
    handleAddSchedule = () => {
        //this.setState({statusUser: 2});
    }
    handleHide = () => {
        //this.setState({statusUser: 0});
    }
    handleEdit = (schedule) => {
        console.log(schedule);
        /*this.setState({
            statusUser: 1,
            editingUser: user
        });*/
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
    handleSave = (schedule) => {
        if (this.state.statusUser === 1) {
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
        else if (this.state.statusUser === 2) {
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
            <div className="page_schedules">
                <BreadcrumbsItem to='/schedules'>Расписания</BreadcrumbsItem>
                <div className="row">
                    <div className="col-md-12">
                        <span className="add_btn" onClick={() => this.handleAddSchedule()}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Добавить расписание
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <ListSchedule 
                            schedules={this.state.schedules}
                            handleEdit={this.handleEdit}
                            handleRemove={this.handleRemove}
                        />
                        {/* <EditorSchedule 
                            title="Редактирование расписания"
                            handleSave={this.handleSave}
                        /> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Schedule;