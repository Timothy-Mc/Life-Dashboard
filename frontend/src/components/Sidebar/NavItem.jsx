

function NavItem({ label, isActive, onClick }) {

    return (
        <li className="nav-item">
            <button 
                onClick={onClick}
                className={`nav-button ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}>
                {label}
            </button>
        </li>
    )
}

export default NavItem