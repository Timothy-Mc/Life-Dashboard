import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/SideBar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Habits from './pages/Habits'
import Notes from './pages/Notes'


function App() {
    return (
        <div className='app-container'>
            <Sidebar />

            <div className='main-content'>
                

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
