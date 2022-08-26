import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
const Home = () => {
  return (
    <div className="bg-zinc-900 h-screen overflow-hidden">
      <main className="flex" >
        <Sidebar/>
        <Center/>
      </main>

      <div>{/* Player */}</div>
    </div>
  )
}

export default Home
