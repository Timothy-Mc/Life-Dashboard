import Layout from '../components/Layout'
import TaskPanel from '../components/TaskPanel/TaskPanel'
import HabitPanel from '../components/HabitPanel/HabitPanel'
import NotesPanel from '../components/NotesPanel/NotesPanel'
import Header from '../components/Header'

function Dashboard() {
  return (
    <>
      <Header />

      <Layout>
        <TaskPanel />
        <HabitPanel />
        <NotesPanel />
      </Layout>
    </>
  )
};

export default Dashboard