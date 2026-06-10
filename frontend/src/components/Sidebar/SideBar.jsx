import { NavLink } from 'react-router-dom'


function SideBar() {
    return (
        <aside className='sidebar'>
            <div className="sidebar-brand">Life Dashboard</div>

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

            {/* <div className="sidebar-footer">Profile</div> */}
        </aside>
    )
}

export default SideBar