import Song from './Song';
import { useRecoilValue } from "recoil"
import {playlistState} from '../atoms/playlistAtoms'

function Songs() {
    const playlist=useRecoilValue(playlistState)
    //console.log(playlist)
  return (
    <div className="text-[#ffb4a8] mx-auto sm:p-16 p-3">
      <div className="mt-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-9">
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
