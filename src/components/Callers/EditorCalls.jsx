import React, {Component} from 'react';
import moment from 'moment';
//import _ from 'lodash';

class EditorCalls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_call           : this.props.call ? this.props.call.id                 : null,
            name_call         : this.props.call ? this.props.call.name               : '',
            data              : {},
            timeZone_UTC      : 0,
            prefix            : '000',
            stopConditionRound: 1,
            stopConditionDate : moment().add(7, 'days').format('YYYY-MM-DD'),
            stopConditionTime : moment(0, "HH").add(7, 'days').format('HH:mm'),
            trunk_name        : this.props.trunk_name ? this.props.trunk_name        : '',     // name
            load_gain_name    : this.props.load_gain_name ? this.props.load_gain_name: '',     // name
            pool_from_name    : this.props.pool_from_name ? this.props.pool_from_name: '',     // name
            pool_to_name      : this.props.pool_to_name ? this.props.pool_to_name    : '',     // name
            help_info_from: 0,
            help_info_to: 0,
            help_info_time_call: 0,
            count_numbers: 0,
        }
    }
    
    componentWillReceiveProps = (nextProps) => {
        
        this.setState(prevState => {
            console.log('prevState',prevState)
            console.log('nextProps.call',nextProps.call)
            return {
                id_call            : nextProps.call ? nextProps.call.id                                                 : prevState.id_call,
                name_call          : nextProps.call ? nextProps.call.name                                               : prevState.name_call,
                data               : nextProps.call ? nextProps.call.data                                               : {},
                trunk_name         : (nextProps.trunk_name  ) ? nextProps.trunk_name            :  '',
                load_gain_name     : (nextProps.load_gain_name  ) ? nextProps.load_gain_name         :  '',
                pool_from_name     : (nextProps.pool_from_name ) ? nextProps.pool_from_name         : '',
                pool_to_name       : (nextProps.pool_to_name ) ? nextProps.pool_to_name             :  '',
                timeZone_UTC       : nextProps.call ? nextProps.call.data.timeZone_UTC                                  : (prevState.timeZone_UTC) ? prevState.timeZone_UTC                                   : 0,
                prefix             : nextProps.call ? nextProps.call.data.prefix                                        : (prevState.prefix) ? prevState.prefix                                               : '000',
                stopConditionRound : nextProps.call ? nextProps.call.data.stopConditionRound                            : (prevState.stopConditionRound) ? prevState.stopConditionRound                       : 1,
                stopConditionDate  : nextProps.call ? nextProps.call.data.stopConditionDate                             : (prevState.stopConditionDate) ? prevState.stopConditionDate                         : moment().add(7, 'days').format('YYYY-MM-DD'),
                stopConditionTime  : nextProps.call ? nextProps.call.data.stopConditionTime                             : (prevState.stopConditionTime) ? prevState.stopConditionTime                         : moment(0, "HH").add(7, 'days').format('HH:mm'),
                help_info_from     : (nextProps.help_info_from) ? nextProps.help_info_from          :  0,
                help_info_to       : (nextProps.help_info_to) ? nextProps.help_info_to              : 0,
                help_info_time_call: (nextProps.help_info_time_call) ? nextProps.help_info_time_call:  0,
                
            }
        },()=>{
            //console.log('this.state.trunk_name',this.state.trunk_name)
        });
    }
    lastDigitToWord = (digit) => {
        var lastFigure = parseInt(digit.toString().substr(digit.toString().length - 1, 1));
        if (lastFigure === 1) return 'день';
        if (lastFigure > 1 && lastFigure < 5) return 'дня';
        if (lastFigure >= 5) return 'дней';
    }
    handleInputChange = (event, prsInt = false) => {
        const target = event.target;
        const value = target.value ? ( prsInt ? parseInt( target.value.replace(/\D/, '') ) : target.value ) : (prsInt ? 1 : '');
        const name = target.name;
        this.setState({
          [name]: value
        });
    }
    handleResetState = () => {
        this.setState({
            id_call            : null,
            name_call          : '',
            data               : {},
            timeZone_UTC       : 0,
            prefix             : '000',
            stopConditionRound : 1,
            stopConditionDate  : '',
            stopConditionTime  : '',
            trunk_name         : '',
            load_gain_name     : '',
            pool_from_name     : '',
            pool_to_name       : '',
            help_info_from     : 0,
            help_info_to       : 0,
            help_info_time_call: 0,
        });
        this.props.handleHide();
    }
    blurPrefix = (event) => {
        let value = event.target.value;
        let lng = value.length;
        //console.log('lng',lng);
        switch (lng) {
            case 1:
                value = '00'+value;
                break;
            case 2:
                value = '0'+value;
                break;
            default:
                break;
        }
        this.setState({
            prefix: value
        });
    }
    render() {
        return(
            <div className="modal fade" id="editor-call">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={()=>this.handleResetState()} >&times;</button>
                            <h4 className="modal-title">▶ {this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-4 col-md-4">
                                    <div className="form-group">
                                        <label className="required">Название</label>
                                        <input type="text" className="form-control" name="name_call" placeholder="Название" value={this.state.name_call} onChange={(e)=>this.handleInputChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="required">Направление</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="trunk_name" readOnly={true} value={this.state.trunk_name} />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-th-list select-btn" data-toggle="modal" href='#modal-trunks' aria-hidden="true" onClick={()=>this.props.getListTrunks()}></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Часовой пояс</label>
                                        <select name="timeZone_UTC" className="form-control" value={this.state.timeZone_UTC} onChange={(e)=>this.handleInputChange(e)} >
                                            <option value="-12">UTC-12</option>
                                            <option value="-11">UTC-11</option>
                                            <option value="-10">UTC-10</option>
                                            <option value="-9">UTC-9</option>
                                            <option value="-8">UTC-8</option>
                                            <option value="-7">UTC-7</option>
                                            <option value="-6">UTC-6</option>
                                            <option value="-5">UTC-5</option>
                                            <option value="-4">UTC-4</option>
                                            <option value="-3">UTC-3</option>
                                            <option value="-2">UTC-2</option>
                                            <option value="-1">UTC-1</option>
                                            <option value="0">UTC+0</option>
                                            <option value="1">UTC+1</option>
                                            <option value="2">UTC+2</option>
                                            <option value="3">UTC+3</option>
                                            <option value="4">UTC+4</option>
                                            <option value="5">UTC+5</option>
                                            <option value="6">UTC+6</option>
                                            <option value="7">UTC+7</option>
                                            <option value="8">UTC+8</option>
                                            <option value="9">UTC+9</option>
                                            <option value="10">UTC+10</option>
                                            <option value="11">UTC+11</option>
                                            <option value="12">UTC+12</option>
                                            <option value="13">UTC+13</option>
                                            <option value="14">UTC+14</option>
                                        </select>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="required">Префикс</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="prefix"
                                            maxLength="3"
                                            placeholder="Префикс"
                                            value={this.state.prefix}
                                            onChange={(e)=>this.handleInputChange(e,true)} 
                                            onBlur={(e)=>this.blurPrefix(e)}
                                        />
                                    </div>
                                    <label> <h4>Остановить обзвон после</h4> </label>
                                    <div className="form-group">
                                        <span><b>Количество кругов</b></span>
                                        <input type="text" className="form-control" maxLength="3" name="stopConditionRound" placeholder="2" value={this.state.stopConditionRound} onChange={(e)=>this.handleInputChange(e,true)} />
                                    </div>
                                    <div className="form-group">
                                        <div><label>Дата и время</label></div>
                                        <input type="date" className="form-control" name="stopConditionDate" value={this.state.stopConditionDate} onChange={(e)=>this.handleInputChange(e)} />
                                        <input type="time" className="form-control" name="stopConditionTime" value={this.state.stopConditionTime} onChange={(e)=>this.handleInputChange(e)} />
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <div className="form-group">
                                        <label className="required">Нагрузка</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="load_gain" readOnly={true}  value={this.state.load_gain_name} />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-th-list select-btn" data-toggle="modal" href='#modal-load_gain' aria-hidden="true" onClick={()=>this.props.getListRate()}></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="required">Пул номеров "откуда"</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="pool_from_id" readOnly={true}  value={this.state.pool_from_name} />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-th-list select-btn" data-toggle="modal" href='#modal-pool_from' aria-hidden="true" onClick={()=>this.props.getListNumbers(true)}></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="required">Пул номеров "куда"</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="pool_to_id" readOnly={true} value={this.state.pool_to_name} />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-th-list select-btn" data-toggle="modal" href='#modal-pool_to' aria-hidden="true" onClick={()=>this.props.getListNumbers()}></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <h4>Справочная информация</h4>
                                    <p>Пул "куда": {this.state.help_info_to} шт. <br/>
                                       Пул "откуда": {this.state.help_info_from} шт. <br/>
                                       Время прозвона 1 круга: {Math.round(this.state.help_info_to/this.state.help_info_time_call)} {this.lastDigitToWord(Math.round(this.state.help_info_to/this.state.help_info_time_call))}.</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-primary" 
                                data-dismiss={ (this.state.name_call !== '' && this.state.trunk_name !== '' && this.state.load_gain_name !== '' && this.state.pool_from_name !== '' && this.state.pool_to_name !== '' && this.state.prefix !== '000') &&
                                    "modal"
                                }   
                                
                                onClick={()=> {
                                    if (this.state.name_call !== '' && this.state.trunk_name !== '' && this.state.load_gain_name !== '' && this.state.pool_from_name !== '' && this.state.pool_to_name !== '' && this.state.prefix !== '000') {
                                        this.props.handleSave({
                                            id  : this.state.id_call,
                                            name: this.state.name_call,
                                            data: {
                                                prefix            : this.state.prefix,
                                                timeZone_UTC      : this.state.timeZone_UTC,
                                                stopConditionRound: this.state.stopConditionRound,
                                                stopConditionDate : this.state.stopConditionDate,
                                                stopConditionTime : this.state.stopConditionTime,
                                            },
                                        })
                                    }
                                    else {
                                        alert('Вы не заполнили все обязательные поля!');
                                    }
                                }} >Сохранить</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>this.handleResetState()}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditorCalls;