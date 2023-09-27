import Sidebar from '../components/Sidebar'
import Center from '../components/Center';
import Player from "../components/Player"

const Home = () => {
  return (
    <div className="bg-zinc-900 h-screen overflow-hidden">
      <main className="flex" >
        <Sidebar/>
        <Center/>
      </main>
      <div className='sticky bottom-2'>
        <Player/>
      </div>
    </div>
  )
}

export default Home
