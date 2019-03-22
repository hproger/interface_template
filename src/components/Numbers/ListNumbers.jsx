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
                                <th>Группа</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.groups_numbers.map(({id, name, data}, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td className="name_pool">{name}</td>
                                    <td className="pool_btns_edit">
                                        <button type="button" className="btn btn-default" onClick={() => this.props.handleEdit({id, name, data})} data-toggle="modal" href='#editor-number' > 
                                            <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-default" onClick={() => this.props.handleCopy(i)}> 
                                            <span className="glyphicon glyphicon-copy" aria-hidden="true"></span>
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