import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtoms";
import useGroove from "../hooks/useGroove";
import { SearchIcon } from "@heroicons/react/outline";
import Songs from "./Songs";

function Center() {
  const { data: session } = useSession();
  const grooveApi = useGroove();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(
    () => {
      grooveApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log("error", err));
    },
    [grooveApi,
    playlistId]
  );
  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#2b1c19] p-7">
      <header className="py-5 px-3 ">
        <div className="flex text-[#f8dcd8]">
          <h1 className="text-5xl pt-3 font-Kaushan text-[#f8dcd8]">Groovy</h1>
          <div className="flex ml-auto items-center gap-7">
          <button className="flex text-lg font-light space-x-2 text-[#ffb4a8] hover:text-[#f8dcd8]">
            <SearchIcon className="h-7 w-7" />
            {<p className="hidden sm:block">Search for your Groove</p>}
          </button>
          <img
            className="rounded-full w-11 h-11 opacity-90 hover:opacity-75"
            src={session?.user.image}
            alt="user"
            onClick={signOut}
          />
          </div>
          {/* <h1 className=''>{session?.user.name}</h1> */}
        </div>
      </header>

      <div className="bg-[#1d100e] rounded-3xl mb-24">
      <h1 className="text-[#ffb4a8] text-4xl sm:text-5xl pt-11 px-7 sm:pt-16 sm:px-24">{playlist?.name}</h1>
      <Songs/>
      </div>
    </div>
  );
}

export default Center;
