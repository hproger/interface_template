import React, {Component} from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
class EditorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time_1: '',
            time_2: '',
            date_1: '',
            date_2: ''
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
    
    render() {
        return(
            <div className="editor_schedule">
                <BreadcrumbsItem to='/schedules/edit'>Редактирование</BreadcrumbsItem>
                <form method="POST">
                    <h5>▶ {this.props.title}</h5>
                    <div className="form-group row">
                        <label htmlFor="time_1" className="col-sm-1 col-form-label">Время с</label>
                        <div className="col-sm-2">
                            <input type="time" className="form-control" id="time_1" name="time_1" value={this.state.time_1} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="time_2" className="col-sm-1 col-form-label">Время по</label>
                        <div className="col-sm-2">
                            <input type="time" className="form-control" id="time_2" name="time_2" value={this.state.time_2} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="date_1" className="col-sm-1 col-form-label">Дата с</label>
                        <div className="col-sm-2">
                            <input type="date" className="form-control" id="date_1" name="date_1" value={this.state.date_1} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="date_2" className="col-sm-1 col-form-label">Дата по</label>
                        <div className="col-sm-2">
                            <input type="date" className="form-control" id="date_2" name="date_2" value={this.state.date_2} onChange={this.handleInputChange} />
                        </div>
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