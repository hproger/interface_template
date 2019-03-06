import React, {Component} from 'react';
const WEEK_DAY = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];

class EditorRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            min_in_month: 0, // минут в месяц
            call_max: 0,
            call_min: 0,
            uniform_load_day: 0, // нагрузка равномерная в день / мин
            uniform_load_hour: 0, // в час / мин
            incom_call: 0, // среднее время исходящего звонка сек
            
            select_interface: 0, // активный интерфейс 0 - простой, 1 - расширенный

            titleRate: this.props.rateUser ? this.props.rateUser.name : '',

            load_gain: 1,

            call_load: [
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10]
            ],
            call_min_time: [
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10]
            ],
            call_max_time: [
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10],
                [0, 10, 2, 10, 4, 10, 6, 10, 8, 10, 10, 11, 10, 13, 10, 15, 10, 17, 10, 19, 10, 21, 15, 10]
            ],
        }
    }
    
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            titleRate: nextProps.rateUser ? nextProps.rateUser.name : ''
        });
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleInputMinMonth = (event) => {
        const target = event.target;
        const value = target.value ? parseFloat(target.value) : 0;
    
        this.setState({
          min_in_month: value,
          uniform_load_day: value/30,
          uniform_load_hour: (value/30)/24
        });
    }
    handleInputCallMax = (event) => {
        const target = event.target;
        const value = target.value ? parseFloat(target.value) : 0;
        const ic = ((value - this.state.call_min)/2)+this.state.call_min;
        this.setState({
          call_max: value,
          incom_call: ic
        });
    }
    handleInputCallMin = (event) => {
        const target = event.target;
        const value = target.value ? parseFloat(target.value) : 0;
        const ic = ((this.state.call_max - value)/2)+value;
        this.setState({
          call_min: value,
          incom_call: ic
        });
    }
    handleResetState = () => {
        this.setState({
            rate: 0,
            name: ''
        });
        this.props.handleHide();
    }
    checkActive = (event, direction) => {
        if (direction == 'row') {
            console.log('Горизонтально');
            if (event.target.checked) {
                console.log('Включили');
            }
            else {
                console.log('Выключили');
            }
        }
        else {
            console.log('Вертикально');
            if (event.target.checked) {
                console.log('Включили');
            }
            else {
                console.log('Выключили');
            }
        }

    }
    handlerSelectInterface = (event) => {
        const target = event.target;
        const value = parseInt(target.value);
        this.setState({
            select_interface: value
        });
    }
    render() {
        return(
            <div className="modal fade" id="editor-rate">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">▶ {this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                        <div className="editor_rateUser">
                            <form method="POST">
                                <div className="form-group row_inputs jcsb">
                                    <div className="item-col">
                                        <label htmlFor="titleRate" className="col-form-label">Имя</label>
                                        <input type="text" className="form-control" id="titleRate" name="titleRate" placeholder="Нагрузка равномерная" value={this.state.titleRate} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="item-col">
                                        
                                        <select name="_selectInterface" id="input_selectInterface" className="form-control" onChange={this.handlerSelectInterface}>
                                            <option value="0">Простой интерфейс</option>
                                            <option value="1">Расширенный интерфейс</option>
                                        </select>
                                        
                                    </div>
                                </div>
                                
                                    <div className="simple-interface form-group" style={{ display: this.state.select_interface && 'none' }}>
                                        <div className="row_inputs">
                                            <div className="item-col">
                                                <label htmlFor="min_in_month" className="col-form-label">Минут в месяц</label>
                                                <input type="text" className="form-control" id="min_in_month" name="min_in_month" placeholder="300" value={this.state.min_in_month} onChange={this.handleInputMinMonth} /> мин.                                     
                                            </div>
                                            
                                        </div>
                                        <div className="row_inputs">
                                            <div className="item-col">
                                                <label htmlFor="call_max" className="col-form-label">Звонок макс.</label>
                                                <input type="text" className="form-control" id="call_max" name="call_max" placeholder="300" value={this.state.call_max} onChange={this.handleInputCallMax} /> сек.
                                            </div>
                                            <div className="item-col">
                                                <label htmlFor="call_min" className="col-form-label">Звонок мин.</label>
                                                <input type="text" className="form-control" id="call_min" name="call_min" placeholder="25" value={this.state.call_min} onChange={this.handleInputCallMin} /> сек.
                                            </div>
                                        </div>
                                        <div className="output_data">
                                            <div className="title">Расчёт</div>
                                            <div className="table_odata">
                                                <div className="uniform_load">
                                                    <div className="title_uload">Нагрузка равномерная</div>
                                                    <div className="day_uload">В день {this.state.uniform_load_day} мин.</div>
                                                    <div className="hour_uload">В час {this.state.uniform_load_hour} мин.</div>
                                                </div>
                                                <div className="incoming_call">
                                                    <div className="title_icall">Исходящий звонок</div>
                                                    <div className="average_icall">
                                                        <span>Среднее время {this.state.incom_call} сек.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="extended-inter" style={{ display: !this.state.select_interface && 'none' }}>
                                    
                                    <div className="panel panel-default">
                                          <div className="panel-heading">
                                                <h3 className="panel-title">Мин/макс время звонка</h3>
                                          </div>
                                          <div className="panel-body">
                                            <h5>Минимальное время</h5>
                                            <div className="table-responsive grid-rate">
                                                <table className="table table-hover">
                                                    <tbody>
                                                        {this.state.call_load.map((val_load, index)=>(
                                                            <tr key={index}>
                                                                <td>
                                                                    <span className="grid-label vertical">{WEEK_DAY[index]}</span>
                                                                    <input type="checkbox" onChange={event => this.checkActive(event, 'row')} />
                                                                </td>
                                                                {val_load.map((val, ind)=>(
                                                                    <td key={'col'+ind}>
                                                                        
                                                                        <input type="text" name="" id="input" className="form-control" defaultValue={val} />
                                                                        
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                        
                                                        <tr>
                                                            <td></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">00<br/>01</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">01<br/>02</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">02<br/>03</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">03<br/>04</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">04<br/>05</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">05<br/>06</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">06<br/>07</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">07<br/>08</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">08<br/>09</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">09<br/>10</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">10<br/>11</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">11<br/>12</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">12<br/>13</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">13<br/>14</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">14<br/>15</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">15<br/>16</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">16<br/>17</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">17<br/>18</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">18<br/>19</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">19<br/>20</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">20<br/>21</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">21<br/>22</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">22<br/>23</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">23<br/>24</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="table-responsive grid-rate">
                                                <h5>Максимальное время</h5>
                                                <table className="table table-hover">
                                                    <tbody>
                                                        {this.state.call_load.map((val_load, index)=>(
                                                            <tr key={index}>
                                                                <td>
                                                                    <span className="grid-label vertical">{WEEK_DAY[index]}</span>
                                                                    <input type="checkbox" onChange={event => this.checkActive(event, 'row')} />
                                                                </td>
                                                                {val_load.map((val, ind)=>(
                                                                    <td key={'col'+ind}>
                                                                        
                                                                        <input type="text" name="" id="input" className="form-control" defaultValue={val} />
                                                                        
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                        
                                                        <tr>
                                                            <td></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">00<br/>01</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">01<br/>02</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">02<br/>03</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">03<br/>04</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">04<br/>05</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">05<br/>06</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">06<br/>07</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">07<br/>08</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">08<br/>09</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">09<br/>10</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">10<br/>11</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">11<br/>12</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">12<br/>13</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">13<br/>14</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">14<br/>15</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">15<br/>16</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">16<br/>17</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">17<br/>18</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">18<br/>19</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">19<br/>20</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">20<br/>21</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">21<br/>22</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">22<br/>23</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">23<br/>24</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                          </div>
                                    </div>
                                    
                                    <div className="panel panel-default">
                                          <div className="panel-heading">
                                                <h3 className="panel-title">Нагрузка</h3>
                                          </div>
                                          <div className="panel-body">
                                            <div className="table-responsive grid-rate">
                                                    <table className="table table-hover">
                                                        <tbody>
                                                            {this.state.call_load.map((val_load, index)=>(
                                                                <tr key={index}>
                                                                    <td>
                                                                        <span className="grid-label vertical">{WEEK_DAY[index]}</span>
                                                                        <input type="checkbox" onChange={event => this.checkActive(event, 'row')} />
                                                                    </td>
                                                                    {val_load.map((val, ind)=>(
                                                                        <td key={'col'+ind}>
                                                                            
                                                                            <input type="text" name="" id="input" className="form-control" defaultValue={val} />
                                                                            
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                            
                                                            <tr>
                                                                <td></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">00<br/>01</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">01<br/>02</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">02<br/>03</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">03<br/>04</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">04<br/>05</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">05<br/>06</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">06<br/>07</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">07<br/>08</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">08<br/>09</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">09<br/>10</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">10<br/>11</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">11<br/>12</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">12<br/>13</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">13<br/>14</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">14<br/>15</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">15<br/>16</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">16<br/>17</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">17<br/>18</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">18<br/>19</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">19<br/>20</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">20<br/>21</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">21<br/>22</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">22<br/>23</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">23<br/>24</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row_inputs">
                                                    <div className="item-col">
                                                        <label htmlFor="load_gain" className="col-form-label">Коэффициент усиления</label>
                                                        <input type="text" className="form-control" id="load_gain" name="load_gain" placeholder="1" value={this.state.load_gain} onChange={this.handleInputMinMonth} />
                                                    </div>
                                                </div>
                                                <div className="info-text">
                                                    <div className="average-min">
                                                        Среднее, минут в месяц
                                                    </div>
                                                    <div className="call_in_day">
                                                        Звонков в день
                                                    </div>
                                                    <div className="call_same_time">
                                                        Одновременных звонков
                                                    </div>
                                                </div>
                                          </div>
                                    </div>
                                    
                                        
                                    </div>
                                
                                
                                
                                {/* <div className="form-group row">
                                    <div className="col-sm-6 col-xs-6"><button type="button" className="btn btn-primary" onClick={()=>this.props.handleSave({id:this.props.rateUser.id, name:this.state.name, login:this.state.rate})} >Сохранить</button></div>
                                    <div className="col-sm-6 col-xs-6"><button type="button" className="btn btn-primary"  >Отмена</button></div>
                                </div> */}
                            </form>
                            
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"onClick={()=>this.props.handleSave({id:this.props.rateUser.id, name:this.state.name, login:this.state.rate})} >Сохранить</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>this.handleResetState()}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default EditorRate;