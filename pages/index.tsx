import Sidebar from '../components/Sidebar'
import Center from '../components/Center';
import Player from "../components/Player"
import Head from 'next/head';
import useSongInfo from '../hooks/useSongInfo';

const Home = () => {
  const songInfo=useSongInfo();
  return (
    <>
    <Head>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    </Head>
    <div className="bg-zinc-900 h-screen overflow-hidden">
      <main className="flex" >
        <Sidebar/>
        <Center/>
      </main>
      <div className={` ${songInfo?`block`:`hidden`} sticky bottom-2 w-11/12 sm:w-2/3 mx-auto`}>
        <Player/>
      </div>
    </div>
    </>
  )
}

export default Home
