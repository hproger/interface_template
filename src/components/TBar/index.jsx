import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
class TBar extends Component {
    render() {
        return(
            <div className="toolbar disf flex_col">
                <nav className="navmenu" role="navigation">
                    <ul className="simplemenu">
                        <li>
                            <NavLink to="/" activeClassName="active">Управление</NavLink>
                            <ul className="sublevel">
                                <li><NavLink to="/users" activeClassName="active">Пользователи</NavLink></li>
                                <li><NavLink to="/rates" activeClassName="active">Нагрузка</NavLink></li>
                                <li><NavLink to="/directions" activeClassName="active">Направления</NavLink></li>
                                <li><NavLink to="/numbers" activeClassName="active">Группы номеров</NavLink></li>
                                <li><NavLink to="/backups" activeClassName="active">Работа с БД</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/reports" activeClassName="active">Отчёты</NavLink>
                            <ul className="sublevel">
                                <li><NavLink to="/reports/numbers" activeClassName="active">Номера</NavLink></li>
                                <li><NavLink to="/reports/callers" activeClassName="active">Обзвоны</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/callers" activeClassName="active">Обзвоны</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="program-status">
                    <div className="title">Статус программы</div>
                    <div className="icon">▶</div>
                </div>
            </div>
        )
    }
}
export default TBar;