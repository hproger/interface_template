import React, {Component} from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import {NavLink} from 'react-router-dom';

import _users from '../../sources/img/users.jpg';
import _load from '../../sources/img/load.jpg';
import _directions from '../../sources/img/directions.jpg';
import _numbers_pool from '../../sources/img/numbers_pool.jpg';
import _database from '../../sources/img/database.jpg';
import _schedule from '../../sources/img/schedule.jpg';
import _system_monitor from '../../sources/img/system_monitor.jpg';

class Main extends Component {
  
    render() {
      return (
        <div className="page_main">
          <BreadcrumbsItem to='/'>Добро пожаловать</BreadcrumbsItem>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="category_block">
                          <NavLink to="/users" className="category_img"><img src={_users} alt="Пользователи"/></NavLink>
                          <div className="category_title">Пользователи</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="category_block">
                          <NavLink to="/rates" className="category_img"><img src={_load} alt="Нагрузка"/></NavLink>
                          <div className="category_title">Нагрузка</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="category_block">
                          <NavLink to="/directions" className="category_img"><img src={_directions} alt="Направления"/></NavLink>
                          <div className="category_title">Направления</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="category_block">
                          <NavLink to="/numbers" className="category_img"><img src={_numbers_pool} alt="Группы номеров"/></NavLink>
                          <div className="category_title">Группы номеров</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="category_block">
                          <NavLink to="/backups" className="category_img"><img src={_database} alt="Работа с БД"/></NavLink>
                          <div className="category_title">Работа с БД</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="category_block">
                          <NavLink to="/callers" className="category_img"><img src={_schedule} alt="Обзвоны"/></NavLink>
                          <div className="category_title">Обзвоны</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="category_block">
                          <NavLink to="/system" className="category_img"><img src={_system_monitor} alt="Состояние системы"/></NavLink>
                          <div className="category_title">Состояние системы</div>
                        </div>
                      </div>
                      <div className="col-md-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      );
    }
  }
  
  export default Main;