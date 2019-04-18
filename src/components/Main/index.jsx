import React, {Component} from 'react';
import routes from '../../routes';
import axios from 'axios';
class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      list_errors: []
    }

  }
  getListErrors = () => {
    axios
    .get(routes.errors.list)
    .then(({ data }) => {
        console.log('error_list',data)
        this.setState({
          list_errors: data.reverse()
        });
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  componentWillMount() {
    this.getListErrors();  
  }
    render() {
      return (
        <div className="page_main">
            <div className="row">
              <div className="col-md-12">Сообщения об ошибках</div>
            </div>
            <div className="row" style={{backgroundColor: "white"}}>
              <div className="col-md-12">
                
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Текст</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list_errors.map((item,i)=>(
                        <tr key={item.id} style={{backgroundColor: item.status === 'new' ? 'pink' : 'transparent'}}>
                          <td className="err-col err-col_1">{i+1}</td>
                          <td className="err-col err-col_2">{item.time}</td>
                          <td className="err-col err-col_3">{item.error_text}</td>
                          <td className="err-col err-col_4"> 
                          {item.status === 'new' && <button className="btn btn-sm btn-warning">просмотрено</button> }
                            
                            <button className="btn btn-sm btn-default"> 
                              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                             </button>
                            
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
              </div>
            </div>
        </div>
      );
    }
  }
  
  export default Main;