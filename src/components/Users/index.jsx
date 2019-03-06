import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import routes from '../../routes';
import axios from 'axios';
import ListUsers from './ListUsers';
import EditorUser from './EditorUser';
class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            status: 0, // 0 - null, 1 - edit, 2 - add
            editingUser: {}
        };
    }
    /**
     * GET /users/list
     * POST /users/add
     * POST /users/edit
     * POST /users/delete
     */
    getListUser = () => {
        axios
            .get(routes.users.list)
            .then(({ data }) => {
                this.setState({
                    users: data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentWillMount() {
        this.getListUser();
    }
    handleAddUser = () => {
        this.setState({status: 2});
    }
    handleHide = () => {
        this.setState({status: 0});
    }
    handleEdit = (user) => {
        //console.log(user);
        this.setState({
            status: 1,
            editingUser: user
        });
    }
    handleRemove = (curID, curIndex) => {
        console.log('Удаляем ',curID);
        axios
            .post(routes.users.delete, {id:curID})
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
            });
    }
    handleSave = (user) => {
        if (this.state.status === 1) {
            axios
                .post(routes.users.edit, {id: user.id, name: user.name, login: user.login, pass: user.pass})
                .then(({ data }) => {
                    console.log('Отредактировали пользователя ', data);
                    this.getListUser();
                    this.handleHide();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else if (this.state.status === 2) {
            axios
                .post(routes.users.add, {name: user.name, login: user.login, pass: user.pass})
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
        }
        
    }
    render() {
        return(
            <div className="page_users">
                <BreadcrumbsItem to='/users'>Пользователи</BreadcrumbsItem>
                <div className="row">
                    <div className="col-md-12">
                        <span className="add_btn" onClick={() => this.handleAddUser()}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Добавить пользователя
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className={this.state.status === 0 ? "col-md-12 col-sm-12" : "col-md-6 col-sm-6"}>
                        <ListUsers users={this.state.users} handleEdit={this.handleEdit} handleRemove={this.handleRemove} />
                    </div>
                    { this.state.status > 0 &&
                        <div className="col-md-6 col-sm-6">
                            <EditorUser 
                                title={this.state.status === 1 ? "Редактирование пользователя" : "Новый пользователь"} 
                                user={this.state.status === 1 ? this.state.editingUser : null}
                                handleSave={this.handleSave}
                                handleHide={this.handleHide}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Users;