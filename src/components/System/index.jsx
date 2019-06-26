import React, {Component} from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import routes from '../../routes';
import axios from 'axios';
class System extends Component {
  constructor(props){
    super(props);
    this.state = {
      list_errors: []
    }

  }
  preloader = (init = true) => {
    let preloader = document.getElementById('preloader');
    /*let body = document.getElementsByTagName('body')[0];*/
    console.log(preloader)
    if (init) {
      preloader.style.zIndex = 999;
      preloader.style.opacity = 1;
      /*body.style.overflow = 'hidden';*/
    }
    else {
      preloader.style.opacity = 0;
      preloader.style.zIndex = -999;
      /*body.style.overflow = '';*/
    }
  }
  getListErrors = () => {
    axios
    .get(routes.errors.list)
    .then(({ data }) => {
        console.log('error_list',data)
        this.setState({
          list_errors: data.reverse().slice(0,100)
        },()=>{
          this.preloader(false)
        });
    })
    .catch(function (error) {
        console.log(error);
        this.preloader(false)
    });
  }
  componentDidMount() {
    this.preloader();
    this.getListErrors();  
  }
  handleRemove = (id) => {
    this.preloader();
    axios
    .get(routes.errors.delete+"?id="+id)
    .then(({ data }) => {
        console.log('status remove error id='+id,data);
        this.getListErrors();
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  handleChangeStatus = (id) => {
    this.preloader();
    axios
    .post(routes.errors.edit, {id: id, status: "closed"})
    .then(({ data }) => {
        console.log('status edited error id='+id,data);
        this.getListErrors();
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  removeErrors = () => {
    console.log('удаляются ошибки');
    axios
    .get(routes.errors.deleteall)
    .then(({ data }) => {
        this.getListErrors();
    })
    .catch(function (error) {
        console.log(error);
    });
  }
    render() {
      return (
        <div className="page_main">
            <BreadcrumbsItem to='/system'>Состояние системы</BreadcrumbsItem>
            <div className="row">
              <div className="col-md-10">Сообщения об ошибках</div>
              <div className="col-md-2 text-right"> 
                <button type="button" className="btn btn-danger" onClick={()=>this.removeErrors()}>Удалить все ошибки</button>
              </div>
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
                          {item.status === 'new' && <button className="btn btn-sm btn-warning" onClick={()=>this.handleChangeStatus(item.id)}>просмотрено</button> }
                            
                            <button className="btn btn-sm btn-default" onClick={()=>this.handleRemove(item.id)}> 
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
  
  export default System;