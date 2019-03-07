import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import axios from 'axios';
import ListSchedule from './ListSchedule';
import EditorSchedule from './EditorSchedule';
import './index.css';
class Schedule extends Component {
    constructor() {
        super();
        this.state = {
            schedules: [
                {id: 1, name: 'Алексей', date: '16.08.2019', day_of_week: 3, time: '01:30'},
                {id: 2, name: 'Михаил', date: '24.07.2019', day_of_week: 0, time: '01:21'},
                {id: 3, name: 'Дмитрий', date: '12.10.2019', day_of_week: 4, time: '01:12'},
                {id: 4, name: 'Василий', date: '20.10.2019', day_of_week: 5, time: '01:50'},
            ],
            schedule: {},
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
        this.setState({status: 2});
    }
    handleHide = () => {
        this.setState({status: 0});
    }
    handleEdit = (schedule) => {
        console.log(schedule);
        this.setState({
            status: 1
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
    handleSave = (schedule) => {
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
                    {this.state.status === 0 &&
                        <ListSchedule 
                            schedules={this.state.schedules}
                            handleEdit={this.handleEdit}
                            handleRemove={this.handleRemove}
                        />
                    }
                    {this.state.status !== 0 &&
                        <EditorSchedule 
                            title="Редактирование расписания"
                            handleSave={this.handleSave}
                            handleHide={this.handleHide}
                        />
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default Schedule;