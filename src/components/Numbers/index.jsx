import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import axios from 'axios';
import _ from 'lodash';
import ListNumbers from './ListNumbers';
import EditorNumber from './EditorNumber';
import routes from '../../routes';
import './index.css';

class Numbers extends Component {
    constructor() {
        super();
        this.state = {
            groups_numbers: [],
            group: {},
            status: 0, // 0 - null, 1 - edit, 2 - add
        };
    }
    getListNumbers = () => {
        console.log('Загружаем номера...');
        axios
            .get(routes.pool.list)
            .then(({ data }) => {
                this.setState({
                    groups_numbers: data
                },()=>{
                    console.log(this.state.groups_numbers)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentWillMount() {
        this.getListNumbers();
    }
    handleAdd = () => {
        this.setState({
            group: {},
            status: 2,
        });
    }
    handleEdit = (group) => {
        console.log(group);
        this.setState({
            group,
            status: 1, 
        });
    }
    handleCopy = (group_line_ID) => {
        console.log('Копируем group_numbers_line ',group_line_ID+1);
        const maxCount = this.state.groups_numbers.length-1;
        let curGroupNumbers = _.cloneDeep(this.state.groups_numbers);
        let newGroupNumbers = _.cloneDeep(curGroupNumbers.slice(group_line_ID,group_line_ID+1));
        
        const id = parseInt(curGroupNumbers[maxCount].id);
        
        newGroupNumbers[0].id = id+1;
        curGroupNumbers.push(newGroupNumbers[0]);
        this.setState({
            groups_numbers: curGroupNumbers,
            status: 2
        },()=>{
            this.handleSave(newGroupNumbers[0])
        })
    }
    handleRemove = (curID, curIndex) => {
        console.log('Удаляем ',curID);
        axios
            .post(routes.pool.delete, {id:curID})
            .then(({ data }) => {
                console.log('Пришёл ответ на удаление ', data);
                if (data.result === 1) {
                    let tmpUsers = this.state.groups_numbers;
                    tmpUsers.splice(curIndex,1);
                    this.setState({
                        groups_numbers: tmpUsers
                    });
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleSave = (group) => {
        if (this.state.status === 1) {
            let count_numbers = this.calcCountNumbers(group);
            console.log('count_numbers',count_numbers)
            axios
                .post(routes.pool.edit, {id: group.id, name: group.name, count_numbers, data: group.data})
                .then(({ data }) => {
                    console.log('Отредактировали пул номеров ', data);
                    this.getListNumbers();
                    this.setState({
                          group: {}
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else if (this.state.status === 2) {
            console.log('group.name ',group.name)
            console.log('group.data ',group.data)
            let count_numbers = this.calcCountNumbers(group);
            console.log('count_numbers',count_numbers)
            axios
                .post(routes.pool.add, {name: group.name, count_numbers, data: group.data})
                .then(({ data }) => {
                    console.log('Новый пул номеров ', data);
                    //let newGroupsNumbers = [...this.state.groups_numbers, {id: parseInt(data.id), name: group.name, data: group.data}];
                    this.getListNumbers();
                    this.setState({
                        group: {}
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    }
    calcCountNumbers = (group) => {
        let count_numbers = 0;
        for (let i = 0; i < group.data.length; i++) {
            const element = group.data[i];
            let type = element.type,
                till = element.till,
                from = element.from,
                digits = element.digits,
                count_zero = 0;
            if (type === 'pool') {
                                    
                count_zero = digits - till.toString().length;
                for (let index = 1; index < count_zero; index++) {
                    till += '0'
                }
                count_zero = digits - from.toString().length;
                for (let index = 1; index < count_zero; index++) {
                    from += '0'
                }
                count_numbers += parseInt(till)-parseInt(from);
            }
            else {
                count_numbers += 1;
            }
            
        }
        return count_numbers;
    }
    render() {
        return(
            <div className="page_numbers">
                <BreadcrumbsItem to='/numbers'>Группы номеров</BreadcrumbsItem>
                <div className="row">
                    <div className="col-md-12">
                        <span className="add_btn" data-toggle="modal" href='#editor-number' onClick={()=>this.handleAdd()}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Добавить группу номеров
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <ListNumbers 
                            groups_numbers={this.state.groups_numbers}
                            handleEdit={this.handleEdit}
                            handleCopy={this.handleCopy}
                            handleRemove={this.handleRemove}
                        />
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <EditorNumber 
                            group={this.state.group}
                            handleSave={this.handleSave}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Numbers;