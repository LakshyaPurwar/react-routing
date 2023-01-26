import classes from './MainNavigation.module.css';
import { Link, NavLink } from 'react-router-dom'
function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink className={({isActive})=>( isActive? classes.active : undefined)} to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/events' className={({isActive})=>(isActive?classes.active : undefined)}>Events</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
