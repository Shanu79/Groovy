import Song from './Song';
import { useRecoilValue } from "recoil"
import {playlistState} from '../atoms/playlistAtoms'

function Songs() {
    const playlist=useRecoilValue(playlistState)
    //console.log(playlist)
  return (
    <div className="text-[#ffb4a8] mx-auto sm:p-9 p-3">
      <div className=" grid grid-cols-2 lg:grid-cols-4 gap-11">
      {playlist?.tracks.items.map((track)=>(
        <Song key={track.track.id}
            track={track}
        />
      ))}
      </div>
    </div>
  )
}

export default Songs
