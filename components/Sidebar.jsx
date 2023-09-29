import {
  HomeIcon,
  SearchIcon,
  CollectionIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useGroove from "../hooks/useGroove";
import {playlistIdState} from "../atoms/playlistAtoms"

function Sidebar() {
  const grooveApi = useGroove();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId,setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (grooveApi.getAccessToken()) {
      grooveApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, grooveApi]);

  //console.log(playlists);
  

  return (
  <div className={`bg-[#2b1c19] text-rose-100 p-7 text-sm lg:text-lg h-screen hidden md:inline-flex`}>
      <div className="my-auto space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        
        <button
          className="flex items-center space-x-2
        hover:text-white"
        >
          <CollectionIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <button
          className="flex items-center space-x-2
        hover:text-white"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create a Playlist</p>
        </button>
        <button
          className="flex items-center space-x-2
        hover:text-white"
        >
          <HeartIcon className="h-5 w-5" />
          <p>Loved Songs</p>
        </button>
        <button
          className="flex items-center space-x-2
        hover:text-white"
        >
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>

        <div className="pt-7">
        {playlists.map((playlist) => (
          <h1
            key={playlist.id}
            onClick={()=> setPlaylistId(playlist.id)}
            className="hover:text-white cursor-pointer py-3 text-base font-extralight"
          >
            {playlist.name}
          </h1>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
