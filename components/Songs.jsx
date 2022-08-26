import Song from './Song';
import { useRecoilValue } from "recoil"
import {playlistState} from '../atoms/playlistAtoms'

function Songs() {
    const playlist=useRecoilValue(playlistState)
  return (
    <div className="p-3 sm:px-7 sm:py-11 flex flex-wrap gap-4 space-y-7 sm:gap-11 justify-center text-slate-300">
      {playlist?.tracks.items.map((track)=>(
        <Song key={track.track.id}
            track={track}
        />
      ))}
    </div>
  )
}

export default Songs
