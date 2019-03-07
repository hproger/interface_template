import React, {Component} from 'react';
class ListNumbers extends Component {
  
    render() {
        return(
            <div className="list_numbers">
                
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Номер</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.numbers.map(({id, number}, i) => (
                                <tr key={id}>
                                    <td>{i+1}</td>
                                    <td>{number}</td>
                                    <td>
                                        <button type="button" className="btn btn-default" onClick={() => this.props.handleEdit({id, number})}> 
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

export default ListNumbers;