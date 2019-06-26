import React, {Component} from 'react';
class ListDirections extends Component {
    
    render() {
        return(
            <div className="list_directions">
                
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Название линии соединения</th>
                                <th>Значение</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.directions.map(({id, name, value}, i) => (
                                <tr key={id}>
                                    <td>{i+1}</td>
                                    <td>{name}</td>
                                    <td>{value}</td>
                                    <td>
                                        <button type="button" className="btn btn-default" onClick={() => this.props.handleEdit({id,name,value})}> 
                                            <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                        </button>
                                        
                                        <button type="button" className="btn btn-default" onClick={() => this.props.handleRemove(id, i)}>
                                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                        </button> 
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

export default ListDirections;