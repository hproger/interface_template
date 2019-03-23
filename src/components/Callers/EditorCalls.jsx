import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';

class EditorCalls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_call: this.props.call ? this.props.call.name : '',
            data: {},
            timeZone_UTC: 0,
            prefix: '000',
            stopСonditionRound: 0,
            stopСonditionDate: moment().format('YYYY-MM-DD'),
            stopСonditionTime: moment().format('HH:mm'),
            trunk_name: this.props.trunk_name ? this.props.trunk_name : '', // name
            load_gain_name: this.props.load_gain_name ? this.props.load_gain_name : '', // name
            pool_from_name: this.props.pool_from_name ? this.props.pool_from_name : '', // name
            pool_to_name: this.props.pool_to_name ? this.props.pool_to_name : '', // name
            
        }
    }
    
    componentWillReceiveProps = (nextProps) => {
        this.setState(prevState => {
            return {
                name_call: nextProps.call ? nextProps.call.name : prevState.name_call,
                data: nextProps.call ? nextProps.call.data : {},
                trunk_name: nextProps.trunk_name ? nextProps.trunk_name : '',
                load_gain_name: nextProps.load_gain_name ? nextProps.load_gain_name : '',
                pool_from_name: nextProps.pool_from_name ? nextProps.pool_from_name : '',
                pool_to_name: nextProps.pool_to_name ? nextProps.pool_to_name : '',
            }
        });
    }
    handleInputChange = (event, prsInt = false) => {
        const target = event.target;
        const value = target.value ? ( prsInt ? parseInt( target.value.replace(/\D/, '') ) : target.value ) : (prsInt ? 0 : '');
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleResetState = () => {
        this.setState({
            name_call: '',
            data: {},
            timeZone_UTC: 0,
            prefix: '000',
            stopСonditionRound: 0,
            stopСonditionDate: '',
            stopСonditionTime: '',
            trunk_name: '',
            load_gain_name: '',
            pool_from_name: '',
            pool_to_name: '',
        });
        this.props.handleHide();
    }
    blurPrefix = (event) => {
        let value = event.target.value;
        let lng = value.length;
        console.log('lng',lng);
        switch (lng) {
            case 1:
                value = '00'+value;
                break;
            case 2:
                value = '0'+value;
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
                                        <label>Название</label>
                                        <input type="text" className="form-control" name="name_call" placeholder="Название" value={this.state.name_call} onChange={(e)=>this.handleInputChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Направление</label>
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
                                        <label>Префикс</label>
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
                                        <input type="text" className="form-control" maxLength="3" name="stopСonditionRound" placeholder="2" value={this.state.stopСonditionRound} onChange={(e)=>this.handleInputChange(e,true)} />
                                    </div>
                                    <div className="form-group">
                                        <div><label>Дата и время</label></div>
                                        <input type="date" className="form-control" name="stopСonditionDate" value={this.state.stopСonditionDate} onChange={(e)=>this.handleInputChange(e)} />
                                        <input type="time" className="form-control" name="stopСonditionTime" value={this.state.stopСonditionTime} onChange={(e)=>this.handleInputChange(e)} />
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <div className="form-group">
                                        <label>Нагрузка</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="load_gain" readOnly={true}  value={this.state.load_gain_name} />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-th-list select-btn" data-toggle="modal" href='#modal-load_gain' aria-hidden="true" onClick={()=>this.props.getListRate()}></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Пул номеров "откуда"</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="pool_from_id" readOnly={true}  value={this.state.pool_from_name} />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-th-list select-btn" data-toggle="modal" href='#modal-pool_from' aria-hidden="true" onClick={()=>this.props.getListNumbers(true)}></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Пул номеров "куда"</label>
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
                                    <p>Номеров в пуле прозвона: 300 000 шт. <br/>
                                        Время прозвона 1 круга: 20 дней.</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-primary" 
                                data-dismiss="modal"
                                onClick={()=>this.props.handleSave({
                                    name:this.state.name_call,
                                    data: {
                                        prefix: this.state.prefix,
                                        timeZone_UTC: this.state.timeZone_UTC,
                                        stopСonditionRound: this.state.stopСonditionRound,
                                        stopСonditionDate: this.state.stopСonditionDate,
                                        stopСonditionTime: this.state.stopСonditionTime,
                                    },
                                })} >Сохранить</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>this.handleResetState()}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditorCalls;