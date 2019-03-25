import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import {ThroughProvider} from 'react-through';

import './sources/css/styles.css';

import TBar from './components/TBar';
import Main from './components/Main';
import Users from './components/Users';
import Rate from './components/Rate';
import Directions from './components/Directions';
import Numbers from './components/Numbers';
import Backups from './components/Backups';
import Reports from './components/Reports';
import ReportsNumbers from './components/Reports/Numbers';
import ReportsCallers from './components/Reports/Callers';
import Callers from './components/Callers';

class App extends Component {
  render() {
    return (
      <ThroughProvider>
        <Router>
          <div className="container-fluid main_bg full_height">
            <div className="row disf full_height">
              <div className="col-md-2 left_col blue_bg padding_wrap disf">
                <TBar />
              </div>
              <div className="col-md-10 right_col padding_wrap disf flex_col">
                <div className="row panel_top">
                  <div className="col-sm-8 col-md-10 pt-left">
                    <div className="text-block">
                      {/* Добро пожаловать */}
                      <BreadcrumbsItem to='/'>Главная</BreadcrumbsItem>
                      <Breadcrumbs
                        separator={<b> ▶ </b>}
                        item={NavLink}
                        finalItem={'span'}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-2 pt-right">
                    <button className="link_btn">Выход</button>
                  </div>
                </div>
                <div className="row panel_content">
                  <div className="col-md-12">
                      <Route path='/' exact component={Main} />
                      <Route path='/users' component={Users} />
                      <Route path='/rates' component={Rate} />
                      <Route path='/directions' component={Directions} />
                      <Route path='/numbers' component={Numbers} />
                      <Route path='/backups' component={Backups} />
                      <Route path='/reports' component={Reports} />
                      <Route path='/reports/numbers' component={ReportsNumbers} />
                      <Route path='/reports/callers' component={ReportsCallers} />
                      <Route path='/callers' component={Callers} />
                  </div>
                </div>
                {/* <div className="row panel_bottom">
                  <div className="col-sm-8 col-md-10 pb-left">
                    <div className="status">Запускается...</div>
                  </div>
                  <div className="col-sm-4 col-md-2 pb-right">
                    <button className="link_btn back">◀ назад</button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </Router>
      </ThroughProvider>
    );
  }
}

export default App;
