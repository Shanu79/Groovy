import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtoms";
import useGroove from "../hooks/useGroove";
import { SearchIcon } from "@heroicons/react/outline";
import Songs from "./Songs"

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
    <div className="w-full h-screen overflow-y-scroll">
      <header className="py-5 px-3">
        <div className="flex text-slate-200">
          <h1 className="text-5xl pt-3 font-Kaushan text-slate-300">Groovy</h1>
          <div className="flex ml-auto items-center gap-7">
          <button className="flex text-lg font-light space-x-2 hover:text-slate-50">
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

      <div className="pt-11 pl-11 pb-3">
      <h1 className="text-slate-300 text-4xl sm:text-5xl">{playlist?.name}</h1>
      </div>

      <Songs/>
    </div>
  );
}

export default Center;
