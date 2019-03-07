import React, {Component} from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
class EditorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time_from: this.props.schedule ? this.props.schedule.time_from : '',
            time_to: this.props.schedule ? this.props.schedule.time_to : '',
            date_from: this.props.schedule ? this.props.schedule.date_from : '',
            date_to: this.props.schedule ? this.props.schedule.date_to : '',
            day_of_week_from: this.props.schedule ? this.props.schedule.day_of_week_from : 0,
            day_of_week_to: this.props.schedule ? this.props.schedule.day_of_week_to : 0
        }
    }
    componentWillReceiveProps = (nextProps) => {
        // this.setState({
        //     id: this.nextProps.schedule.id
        // });
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleResetState = () => {
        // this.setState({
        //     id: ''
        // });
        this.props.handleHide();
    }
    handlerSelect = (event) => {
        const target = event.target;
        const value = parseInt(target.value);
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    render() {
        return(
            <div className="editor_schedule">
                <BreadcrumbsItem to='/schedules/edit'>Редактирование</BreadcrumbsItem>
                <form method="POST">
                    <h5>▶ {this.props.title}</h5>
                    <div className="form-group row_inputs">
                        <label htmlFor="time_from" className="col-form-label">Время с</label>
                        <input type="time" className="form-control" id="time_from" name="time_from" value={this.state.time_from} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group row_inputs">
                        <label htmlFor="time_to" className="col-form-label">Время по</label>
                        <input type="time" className="form-control" id="time_to" name="time_to" value={this.state.time_to} onChange={this.handleInputChange} />
                    </div>
                    
                    <div className="form-group row_inputs">
                        <label htmlFor="date_from" className="col-form-label">Дата с</label>
                        <input type="date" className="form-control" id="date_from" name="date_from" value={this.state.date_from} onChange={this.handleInputChange} />
                    </div>
                    
                    <div className="form-group row_inputs">
                        <label htmlFor="date_to" className="col-form-label">Дата по</label>
                        <input type="date" className="form-control" id="date_to" name="date_to" value={this.state.date_to} onChange={this.handleInputChange} />
                    </div>
                    
                    <div className="form-group row_inputs">
                        <label className="col-form-label">Дни недели</label>
                        <select name="day_of_week_from" id="day_of_week_from" className="form-control" onChange={this.handlerSelect}>
                            <option value="0">Понедельник</option>
                            <option value="1">Вторник</option>
                            <option value="2">Среда</option>
                            <option value="3">Четверг</option>
                            <option value="4">Пятница</option>
                            <option value="5">Суббота</option>
                            <option value="6">Воскресенье</option>
                        </select>
                        <select name="day_of_week_to" id="day_of_week_to" className="form-control" onChange={this.handlerSelect}>
                            <option value="0">Понедельник</option>
                            <option value="1">Вторник</option>
                            <option value="2">Среда</option>
                            <option value="3">Четверг</option>
                            <option value="4">Пятница</option>
                            <option value="5">Суббота</option>
                            <option value="6">Воскресенье</option>
                        </select>
                    </div>
                    
                    <div className="form-group row">
                        <div className="col-sm-2 col-xs-2"><button type="button" className="btn btn-primary" onClick={()=>this.props.handleSave()} >Сохранить</button></div>
                        <div className="col-sm-2 col-xs-2"><button type="button" className="btn btn-primary" onClick={()=>this.handleResetState()} >Отмена</button></div>
                    </div>
                </form>
                
            </div>
        )
    }
}

export default EditorSchedule;