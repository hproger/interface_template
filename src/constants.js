import {
  Main,
  Users,
  Reports,
  // Rate,
  Directions,
  Numbers,
  Backups,
  Callers,
  System,
  ReportsNumbers,
  ReportsCallers
} from './components';

import _users from "./sources/img/users.jpg";
// import _load from "./sources/img/load.jpg";
import _directions from "./sources/img/directions.jpg";
import _numbers_pool from "./sources/img/numbers_pool.jpg";
import _database from "./sources/img/database.jpg";
import _schedule from "./sources/img/schedule.jpg";
import _system_monitor from "./sources/img/system_monitor.jpg";

export const PAGES_ROUTE = {
  MAIN: '/',
  USERS: '/users',
  RATES: '/rates',
  DIRECTIONS: '/directions',
  NUMBERS: '/numbers',
  BACKUPS: '/backups',
  REPORTS: '/reports',
  REPORTS_NUMBERS: '/reports/numbers',
  REPORTS_CALLERS: '/reports/callers',
  CALLERS: '/callers',
  SYSTEM: '/system',
};

export const PAGES = [
  { name: 'Главная', route: PAGES_ROUTE.MAIN, isMenu: false, icon: null, component: Main },
  { name: 'Пользователи', route: PAGES_ROUTE.USERS, isMenu: true, icon: _users, component: Users },
  // TODO предстоит переписать данный компонент
  // { name: 'Нагрузка', route: PAGES_ROUTE.RATES, isMenu: true, icon: _load, component: Rate },
  { name: 'Направления', route: PAGES_ROUTE.DIRECTIONS, isMenu: true, icon: _directions, component: Directions },
  { name: 'Группы номеров', route: PAGES_ROUTE.NUMBERS, isMenu: true, icon: _numbers_pool, component: Numbers },
  { name: 'Работа с БД', route: PAGES_ROUTE.BACKUPS, isMenu: true, icon: _database, component: Backups },
  { name: 'Отчёты', route: PAGES_ROUTE.REPORTS, isMenu: false, cicon: _users, omponent: Reports },
  { name: 'Отчёты по номерам', route: PAGES_ROUTE.REPORTS_NUMBERS, isMenu: false, icon: null, component: ReportsNumbers },
  { name: 'Отчёты по обзвонам', route: PAGES_ROUTE.REPORTS_CALLERS, isMenu: false, icon: null, component: ReportsCallers },
  { name: 'Обзвоны', route: PAGES_ROUTE.CALLERS, isMenu: true, icon: _schedule, component: Callers },
  { name: 'Состояние системы', route: PAGES_ROUTE.SYSTEM, isMenu: true, icon: _system_monitor, component: System },
];