import React, {Component} from 'react';
class ListCalls extends Component {
    
    render() {
        return(
            <div className="list_calls">
                
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Обзвон</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.calls.map(({id,name,status,data}, i) => (
                                <tr key={id} style={{pointerEvents: status !== 'stop' && 'none', background: status !== 'stop' && 'rgba(0,0,0,.2)' }}>
                                    <td>{i+1}</td>
                                    <td>{name}</td>
                                    <td style={{maxWidth: '25px'}}>
                                        <button 
                                            style={{pointerEvents: 'all' }}
                                            className={"reset-btn status-btn active-status_"+status}
                                            onClick={() => this.props.handleChangeStatusCall(id, i, status)}>
                                        </button>
                                    </td>
                                    <td style={{maxWidth: '150px'}}>
                                        <button type="button" className="btn btn-default" onClick={() => this.props.handleEdit({id,name,status,data})} data-toggle="modal" href='#editor-call'> 
                                            <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-default" onClick={() => this.props.handleRemove(id, i)}>
                                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                        </button> 
                                        <button type="button" className="btn btn-default" onClick={() => this.props.handleViewStatistic(id, i)}>
                                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
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

export default ListCalls;