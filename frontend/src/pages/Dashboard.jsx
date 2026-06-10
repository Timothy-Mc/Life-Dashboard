import Layout from '../components/Layout'
import TaskPanel from '../components/TaskPanel/TaskPanel'
import HabitPanel from '../components/HabitPanel/HabitPanel'
import NotesPanel from '../components/NotesPanel/NotesPanel'

function Dashboard() {
  return (
    <Layout>
      <TaskPanel />
      <HabitPanel />
      <NotesPanel />
    </Layout>
  )
}

export default Dashboard