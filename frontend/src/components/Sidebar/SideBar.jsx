import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext';
import { useFormattedDate } from '../../hooks/useFormattedDate'

function SideBar() {
    const { dark, setDark } = useTheme();

    const date = useFormattedDate();


    return (
        <aside className='sidebar'>
            <div className="sidebar-title">
                <h2>Life Dashboard</h2>
                <p>{date}</p>
            </div>

            <ul className='sidebar-links'>
                <li>
                    <NavLink to="/" className="nav-button">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/tasks" className="nav-button">Tasks</NavLink>
                </li>
                <li>
                    <NavLink to="/habits" className="nav-button">Habits</NavLink>
                </li>
                <li>
                    <NavLink to="/notes" className="nav-button">Notes</NavLink>
                </li>
            </ul>

            <div className="sidebar-footer">
                <button
                    type="button"
                    className='nav-button'
                    onClick={() => setDark(!dark)}
                >
                    <span>{dark ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
                </button>

            </div>

        </aside>
    )
}

export default SideBar