import React from 'react';
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useGroove from "../hooks/useGroove";
import {playlistIdState} from "../atoms/playlistAtoms"

const Playlists = () => {
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
  return (
    <div className="flex pt-7 px-7 sm:pt-16 sm:px-24 gap-4 text-base font-extralight overflow-x-auto overflow-y-hidden">
        {playlists.map((playlist) => (
          <span
            key={playlist.id}
            onClick={()=> setPlaylistId(playlist.id)}
            className="hover:text-[#f8dcd8] cursor-pointer text-[#ffb4a8] min-w-fit bg-[#2b1c19] rounded-full hover:bg-[#3c2723] p-3"
          >
          {playlist.name}
          </span>
        ))}
    </div>
  )
}

export default Playlists