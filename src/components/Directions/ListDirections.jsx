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
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.directions.map(({id, name}, i) => (
                                <tr key={id}>
                                    <td>{i+1}</td>
                                    <td>{name}</td>
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