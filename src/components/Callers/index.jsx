import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import routes from '../../routes';
import axios from 'axios';
import _ from 'lodash';
import './index.css';
import ListCalls from './ListCalls';
import EditorCalls from './EditorCalls';
class Callers extends Component {
    constructor() {
        super();
        this.state = {
            calls              : [],
            call               : {},
            status             : 0,        // 0 - null, 1 - edit, 2 - add
            call_status        : 'stop',   // run / stop
            trunks             : [],
            trunksFiltered     : [],
            rates              : [],
            ratesFiltered      : [],
            numbers            : [],
            numbersFiltered    : [],
            filter_name_trunk  : "",
            filter_name_rate   : "",
            filter_name_number : "",
            trunk_id           : 0,        // id
            load_gain          : 0,        // id
            pool_from_id       : 0,        // id
            pool_to_id         : 0,        // id
            trunk_name         : '',       // name
            load_gain_name     : '',       // name
            pool_from_name     : '',       // name
            pool_to_name       : '',       // name
            help_info_from     : 0,
            help_info_to       : 0,
            help_info_time_call: 0,
        };
    }
    getListCalls = () => {
        axios
            .get(routes.calls.list)
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    calls: data.reverse()
                },()=>{
                    this.getListTrunks();
                    this.getListRate();
                    this.getListNumbers();
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentWillMount() {
        this.getListCalls();
        
    }
    handleHide = () => {
        this.setState({status: 0});
    }
    handleAddCall = () => {
        this.setState({
            status             : 2,
            filter_name_trunk  : "",
            filter_name_rate   : "",
            filter_name_number : "",
            trunk_id           : 0,    // id
            load_gain          : 0,    // id
            pool_from_id       : 0,    // id
            pool_to_id         : 0,    // id
            trunk_name         : '',   // name
            load_gain_name     : '',   // name
            pool_from_name     : '',   // name
            pool_to_name       : '',   // name
            help_info_from     : 0,
            help_info_to       : 0,
            help_info_time_call: 0,
        });
    }
    
    handleEdit = (call, view = false) => {
        this.setState({
            status: 1,
            call
        }, ()=>{
            
            let trunks  = _.cloneDeep(this.state.trunks);
            let rates   = _.cloneDeep(this.state.rates);
            let numbers = _.cloneDeep(this.state.numbers);
            this.filterGets_Rate_Number_Trunk(trunks,this.state.call.data.trunk_id,'trunk_id','trunk_name');
            this.filterGets_Rate_Number_Trunk(rates,this.state.call.data.load_gain_id,'load_gain_id','load_gain_name');
            this.filterGets_Rate_Number_Trunk(numbers,this.state.call.data.pool_from_id,'pool_from_id','pool_from_name');
            this.filterGets_Rate_Number_Trunk(numbers,this.state.call.data.pool_to_id,'pool_to_id','pool_to_name');
            /*this.getListRate(this.state.call.data.load_gain_id);
            this.getListNumbers(true,this.state.call.data.pool_from_id);
            this.getListNumbers(false,this.state.call.data.pool_to_id);*/
        });
    }
    filterGets_Rate_Number_Trunk = (updatedList, _id, str_id, str_name) => {
        
        
        updatedList = updatedList.filter(function(item){
            return parseInt(item.id) === parseInt(_id)
        });
        console.log('updatedList',updatedList)
        this.setState({
            [str_id]: updatedList[0].id,
            [str_name]: updatedList[0].name,
        },()=>{
            if(str_name === 'load_gain_name') {
                this.setState({
                    help_info_time_call: updatedList[0].data.average_day
                })
            }
            else if (str_name === 'pool_from_name') {
                this.setState({
                    help_info_from: updatedList[0].count_numbers
                })
            }
            else if (str_name === 'pool_to_name') {
                this.setState({
                    help_info_to: updatedList[0].count_numbers
                })
            }
        });
        
    }
    handleRemove = (curID, curIndex) => {
        console.log('curID',curID)
        console.log('curIndex',curIndex)
        axios
            .post(routes.calls.delete, {id:curID})
            .then(({ data }) => {
                if (data.result === 1) {
                    let tmpCalls = _.cloneDeep(this.state.calls);
                    tmpCalls.splice(curIndex,1);
                    this.setState({
                        calls: tmpCalls
                    });
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleSave = (call) => {
        let jsonString = (this.state.status === 1) ? {id: call.id, name: call.name, status: this.state.call_status, data: call.data} : (this.state.status === 2) ? {name: call.name, status: this.state.call_status, data: call.data} : null;
        let url = (this.state.status === 1) ? routes.calls.edit : (this.state.status === 2) ? routes.calls.add : null;
        jsonString.data.trunk_id = this.state.trunk_id;
        jsonString.data.load_gain_id = this.state.load_gain_id;
        jsonString.data.pool_from_id = this.state.pool_from_id;
        jsonString.data.pool_to_id = this.state.pool_to_id;
        console.log('jsonString',jsonString)
        if (url) {
            axios
                .post(url, jsonString)
                .then(({ data }) => {
                    console.log('Данные ', data);
                    this.getListCalls();
                    this.handleHide();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    
    handleChangeStatusCall = (id,index,status) => {
        let url = status === 'run' ? routes.calls.stop : routes.calls.run;
        axios
            .post(url, {id})
            .then(({ data }) => {
                if (data.result === 1) {
                    this.getListCalls();
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getListTrunks = () => {
        axios
            .get(routes.trunks.list)
            .then(({ data }) => {
                this.setState({
                    trunks: data,
                    trunksFiltered: data
                },()=>{
                    console.log('Направления',this.state.trunks)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getListRate = () => {
        console.log('Загружаем коэффициенты...');
        
        axios
            .get(routes.rate.list)
            .then(({ data }) => {
                this.setState({
                    rates: data,
                    ratesFiltered: data
                },()=>{
                    console.log('Нагрузка',this.state.rates);
                });
                
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    getListNumbers = () => {
        console.log('Загружаем номера...');
        
        axios
            .get(routes.pool.list)
            .then(({ data }) => {
                this.setState({
                    numbers: data,
                    numbersFiltered: data
                },()=>{
                    console.log('Пул номеров',this.state.numbers)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        
        
    }
    eventCDR = (getUrl) => {
        axios
            .get(routes.calls[getUrl])
            .then(({ data }) => {
				console.log("TCL: eventCDR -> data", data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    isEmpty = (object) => {
        return JSON.stringify(object) === "{}" || object === null;
    }
    lastDigitToWord = (digit) => {
        var lastFigure = parseInt(digit.toString().substr(digit.toString().length - 1, 1));
        if (lastFigure === 1) return 'день';
        if (lastFigure > 1 && lastFigure < 5) return 'дня';
        if (lastFigure >= 5) return 'дней';
    }
    filterList = (event,curArray) =>{
        let updatedList = this.state[curArray];
        updatedList = updatedList.filter(function(item){
            return item.name.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        this.setState({[event.target.name]: updatedList});
    }
    selectTableLine = (id, name, selector, help_data = null) => {
        let selectId = `${selector}_id`;
        let selectName = `${selector}_name`;
        let help_info = (selector === 'pool_from') ? 'help_info_from' : (selector === 'pool_to') ? 'help_info_to' : null;
        console.log('selector',selector)
        console.log('help_data',help_data)
        if (help_info !== null && help_data) {
            this.setState({
                [selectId]: parseInt(id),
                [selectName]: name,
                [help_info]: help_data,
            });
        }
        else if (selector === 'load_gain' && help_data){
            
            this.setState({
                [selectId]: parseInt(id),
                [selectName]: name,
                help_info_time_call: help_data.average_day,
            });
        }
        else {
            this.setState({
                [selectId]: parseInt(id),
                [selectName]: name,
            });
        }
    }
    render() {
        return (
            <div className="page_callers">
                <BreadcrumbsItem to='/callers'>Обзвоны</BreadcrumbsItem>
                <div className="row">
                    <div className="col-md-12">
                        <span className="add_btn" onClick={() => this.handleAddCall()} data-toggle="modal" href='#editor-call'>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Создать обзвон
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-8">
                        <ListCalls 
                            calls={this.state.calls}
                            handleEdit={this.handleEdit}
                            handleRemove={this.handleRemove}
                            handleChangeStatusCall={this.handleChangeStatusCall}
                            handleViewStatistic={this.handleViewStatistic}
                        />
                    </div>
                    <EditorCalls 
                        title={this.state.status === 1 ? "Редактирование обзвона" : "Новый обзвон"} 
                        calls={this.state.calls ? this.state.calls : null}
                        call={this.state.status === 1 ? this.state.call : null}
                        trunk_name={this.state.trunk_name ? this.state.trunk_name : ''}
                        load_gain_name={this.state.load_gain_name ? this.state.load_gain_name : ''}
                        pool_from_name={this.state.pool_from_name ? this.state.pool_from_name : ''}
                        pool_to_name={this.state.pool_to_name ? this.state.pool_to_name : ''}
                        handleSave={this.handleSave}
                        handleHide={this.handleHide}
                        help_info_from={this.state.help_info_from}
                        help_info_to={this.state.help_info_to}
                        help_info_time_call={this.state.help_info_time_call}
                        handleChangeStatusCall={this.handleChangeStatusCall}
                        getListTrunks={this.getListTrunks}
                        getListRate={this.getListRate}
                        getListNumbers={this.getListNumbers}
                        edited={this.state.status === 1 && true}
                    />
                    
                    <div className="modal fade" id="view-call-modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 className="modal-title">Статистика: {this.state.call.name}</h4>
                                </div>
                                <div className="modal-body">
                                { !this.isEmpty(this.state.call) &&
                                    <>
                                        <p><b>Название :</b> {this.state.call.name}</p>
                                        <p><b>Направление :</b> {this.state.trunk_name}</p>
                                        <p><b>Часовой пояс :</b> UTC{this.state.call.data.timeZone_UTC >= 0 ? '+'+this.state.call.data.timeZone_UTC : this.state.call.data.timeZone_UTC}</p>
                                        <p><b>Остановить обзвон после: <br/>(Дата/время - количество кругов) :</b> {this.state.call.data.stopConditionDate} / {this.state.call.data.stopConditionTime} - {this.state.call.data.stopConditionRound}</p>
                                        <p><b>Нагрузка :</b> {this.state.load_gain_name}</p>
                                        <p><b>Пул номеров "откуда" :</b> {this.state.pool_from_name}</p>
                                        <p><b>Пул номеров "куда" :</b> {this.state.pool_to_name}</p>
                                        <p><b>Справочная информация:</b></p>
                                        <p style={{paddingLeft: '15px'}}>Пул "куда": {this.state.help_info_to} шт. <br/>
                                        Пул "откуда": {this.state.help_info_from} шт. <br/>
                                        Время прозвона 1 круга: {Math.round(this.state.help_info_to/this.state.help_info_time_call)} {this.lastDigitToWord(Math.round(this.state.help_info_to/this.state.help_info_time_call))}.</p>
                                        
                                        <hr/>
                                        {/* <a href={routes.calls.getCDR}>Скачать CDR</a> <br/>
                                        <a href={routes.calls.deleteCDR}>Удалить CDR из базы</a> <br/>
                                        <a href={routes.calls.deleteStat}>Сбросить статистику</a> <br/> */}
                                        
                                        <button className="btn btn-primary" style={{display: "inline-block", marginRight: '10px'}} onClick={()=>this.eventCDR('getCDR')} >Скачать CDR</button> 
                                        <button className="btn btn-danger" style={{display: "inline-block", marginRight: '10px'}} onClick={()=>this.eventCDR('deleteCDR')} >Удалить CDR из базы</button> 
                                        <button className="btn btn-warning" style={{display: "inline-block", marginRight: '10px'}} onClick={()=>this.eventCDR('deleteStat')} >Сбросить статистику</button> 
                                        
                                        
                                    </>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal fade" id="modal-trunks">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 className="modal-title">Направления</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Название</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="trunksFiltered"
                                            placeholder="Фильтр по названию..." 
                                            onChange={(e)=>this.filterList(e,'trunks')}
                                        />
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>№</th>
                                                    <th>Название</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.trunksFiltered.map(({id,name}, i) => (
                                                    <tr data-dismiss="modal" key={id} onClick={()=>this.selectTableLine(id,name,'trunk')}>
                                                        <td>{i+1}</td>
                                                        <td>{name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="modal-load_gain">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 className="modal-title">Нагрузка</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Название</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="ratesFiltered"
                                            placeholder="Фильтр по названию..." 
                                            onChange={(e)=>this.filterList(e,'rates')}
                                        />
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>№</th>
                                                    <th>Название</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.ratesFiltered.map(({id,name,data}, i) => (
                                                    <tr data-dismiss="modal" key={id} onClick={()=>this.selectTableLine(id,name,'load_gain',data)}>
                                                        <td>{i+1}</td>
                                                        <td>{name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="modal-pool_from">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 className="modal-title">Пул номеров "откуда"</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Название</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="numbersFiltered"
                                            placeholder="Фильтр по названию..." 
                                            onChange={(e)=>this.filterList(e,'numbers')}
                                        />
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>№</th>
                                                    <th>Название</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.numbersFiltered.map(({id,name,count_numbers}, i) => (
                                                    <tr data-dismiss="modal" key={id} onClick={()=>this.selectTableLine(id,name,'pool_from',count_numbers)}>
                                                        <td>{i+1}</td>
                                                        <td>{name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="modal-pool_to">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 className="modal-title">Пул номеров "куда"</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Название</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="numbersFiltered"
                                            placeholder="Фильтр по названию..." 
                                            onChange={(e)=>this.filterList(e,'numbers')}
                                        />
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>№</th>
                                                    <th>Название</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.numbersFiltered.map(({id,name,count_numbers}, i) => (
                                                    <tr data-dismiss="modal" key={id} onClick={()=>this.selectTableLine(id,name,'pool_to',count_numbers)}>
                                                        <td>{i+1}</td>
                                                        <td>{name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Callers;