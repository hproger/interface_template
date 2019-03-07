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
                                <li><NavLink to="/schedules" activeClassName="active">Расписания</NavLink></li>
                                <li><NavLink to="/rates" activeClassName="active">Коэффициенты</NavLink></li>
                                <li><NavLink to="/directions" activeClassName="active">Направления</NavLink></li>
                                <li><NavLink to="/numbers" activeClassName="active">Номера</NavLink></li>
                                {/* <li>
                                    <a href="#" >Номера <b className="caret"></b></a>
                                    <ul className="sublevel ">
                                        <li>
                                            <a href="#" >Ручной ввод номера <b className="caret"></b></a>
                                            <ul className="sublevel ">
                                            <li><a href="#">Один номер</a></li>
                                            <li><a href="#">Последовательность номеров</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" >Импорт номеров <b className="caret"></b></a>
                                            <ul className="sublevel ">
                                            <li><a href="#">Импорт номеров из файла *.csv</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Группы номеров</a>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="#">Работа с БД</a></li> */}
                            </ul>
                        </li>
                        {/* <li>
                            <a href="#">Отчёты</a>
                            <ul className="sublevel">
                            <li><a href="#">Номера</a></li>
                            <li><a href="#">Обзвоны</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Обзвоны</a>
                        </li> */}
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