import { useFormattedDate } from '../hooks/useFormattedDate'

function Header() {
    const date = useFormattedDate({
        month: 'short',
        year: undefined
    });


    return (
        <header className="header">
            <h1>Overview</h1>
            <p>{date}</p>
        </header>
    )
}

export default Header