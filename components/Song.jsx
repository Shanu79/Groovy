import { useRecoilState } from "recoil";
import useGroove from "../hooks/useGroove"
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom"

function Song({track}) {
    const grooveApi=useGroove();
    const [currentTrackId, setCurrentTrackId]=useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying]=useRecoilState(isPlayingState);

    const playSong=()=>{
        setCurrentTrackId(track.track.id);
        setIsPlaying(!isPlaying);
        grooveApi.play({
            uris:[track.track.uri],
        });
    }

  return (
        <div className=" hover:bg-slate-800 p-2 w-fit h-fit rounded-3xl" onClick={playSong}>
        <img
          className="w-44 sm:w-56 sm:h-56 mx-auto h-44 rounded-3xl shadow-3xl blur-none"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg lg:w-56 w-44 text-center truncate">{track.track.name}</h1>
            <p className="text-xs w-28 font-thin text-center  truncate">{track.track.artists[0].name.toUpperCase()}</p>
        </div>
    </div>
  )
}

export default Song
