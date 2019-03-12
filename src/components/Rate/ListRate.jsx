import React, {Component} from 'react';
class ListRate extends Component {
    render() {
        return(
            <div className="list_rates">
                
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Имя</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.rates.map(({id,name,data}, i) => (
                                <tr key={id}>
                                    <td>{i+1}</td>
                                    <td>{name}</td>
                                    <td>
                                        <button type="button" className="btn btn-default" data-toggle="modal" data-target='#editor-rate' onClick={() => this.props.handleEdit({id,name,data})}> 
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

export default ListRate;