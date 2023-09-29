import { useRecoilState } from "recoil";
import useGroove from "../hooks/useGroove"
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom"

function Song({track}) {
    const grooveApi=useGroove();
    const [currentTrackId, setCurrentTrackId]=useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying]=useRecoilState(isPlayingState);
    //console.log(track);
    const playSong=()=>{
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        grooveApi.play({
            uris:[track.track.uri],
        });
    }

  return (
        <div className="hover:shadow-2xl hover:cursor-pointer mx-auto p-1 hover:shadow-[#6f251b] hover:bg-[#6f251b] rounded-3xl hover:scale-105" onClick={playSong}>
        <div className="w-fit">
        <img
          className="mx-auto rounded-3xl shadow-3xl blur-none"
          src={track.track.album.images[0].url}
          alt=""
        />
        </div>
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl w-20 md:w-32 lg:w-56 text-center text-[#f8dcd8] truncate ...">{track.track.name}</h1>
            <p className="text-xs font-thin text-center text-[#ffb4a8] truncate">{track.track.artists[0].name.toUpperCase()}</p>
        </div>
    </div>
  )
}

export default Song
