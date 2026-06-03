import { useState } from 'react'
import Header from './components/Header'
import Layout from './components/Layout'
import TaskPanel from './components/TaskPanel/TaskPanel'
import HabitPanel from './components/HabitPanel/HabitPanel'
import NotesPanel from './components/NotesPanel/NotesPanel'


// import './App.css'

function App() {
  const [date] = useState(new Date().toLocaleDateString('en-AU', {
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
    }));

  return (
    <>
      <Header date={date} />

      <Layout>
        <TaskPanel />
        <HabitPanel />
        <NotesPanel />
      </Layout>
    </>
  )
}

export default App
