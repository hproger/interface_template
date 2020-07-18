import { PAGES_ROUTE } from './pageRoutes';
import Main from './components/Main';
import Users from './components/Users';
import Rate from './components/Rate';
import Directions from './components/Directions';
import Numbers from './components/Numbers';
import Backups from './components/Backups';
import Reports from './components/Reports';
import ReportsNumbers from "./components/Reports/Numbers";
import ReportsCallers from "./components/Reports/Callers";
import Callers from "./components/Callers";
import System from "./components/System";

export const PAGES = [
  { name: 'Главная', route: PAGES_ROUTE.MAIN, component: Main },
  { name: 'Пользователи', route: PAGES_ROUTE.USERS, component: Users },
  { name: 'Нагрузка', route: PAGES_ROUTE.RATES, component: Rate },
  { name: 'Направления', route: PAGES_ROUTE.DIRECTIONS, component: Directions },
  { name: 'Группы номеров', route: PAGES_ROUTE.NUMBERS, component: Numbers },
  { name: 'Работа с БД', route: PAGES_ROUTE.BACKUPS, component: Backups },
  { name: 'Отчёты', route: PAGES_ROUTE.REPORTS, component: Reports },
  { name: 'Отчёты по номерам', route: PAGES_ROUTE.REPORTS_NUMBERS, component: ReportsNumbers },
  { name: 'Отчёты по обзвонам', route: PAGES_ROUTE.REPORTS_CALLERS, component: ReportsCallers },
  { name: 'Обзвоны', route: PAGES_ROUTE.CALLERS, component: Callers },
  { name: 'Состояние системы', route: PAGES_ROUTE.SYSTEM, component: System },
];