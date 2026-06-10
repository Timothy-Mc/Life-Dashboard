import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar/SideBar'

// Pages
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Habits from './pages/Habits'
import Notes from './pages/Notes'

// import './App.css'

function App() {
    const [date] = useState(new Date().toLocaleDateString('en-AU', {
            day: 'numeric', 
            month: 'long', 
            year: 'numeric'
        }));

    return (
        <div className='app-container'>
            <Sidebar />

            <div className='main-content'>
                <Header date={date} />

                <div className='page-content'>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/tasks' element={<Tasks />} />
                        <Route path='/habits' element={<Habits />} />
                        <Route path='/notes' element={<Notes />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
