import React, {Component} from 'react';
class ListSchedule extends Component {
  
    render() {
        return(
            <div className="list_schedules">
                
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Имя</th>
                                <th>Дата</th>
                                <th>День недели</th>
                                <th>Время</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.schedules.map(({id, name, date, day_of_week, time}, i) => (
                                <tr key={id}>
                                    <td>{i+1}</td>
                                    <td>{name}</td>
                                    <td>{date}</td>
                                    <td>{day_of_week}</td>
                                    <td>{time}</td>
                                    <td>
                                        <button type="button" className="btn btn-default" onClick={() => this.props.handleEdit({id, name, date, day_of_week, time})}> 
                                            <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                        </button>
                                        
                                        {/* <button type="button" className="btn btn-default" onClick={() => this.props.handleRemove(id, i)}>
                                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                        </button>  */}
                                    </td>
                                </tr>
                            ))}                           
                           
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListSchedule;