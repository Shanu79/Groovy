import React, { useEffect, useState } from 'react';
import useGroove from '../hooks/useGroove';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';

const Player = () => {
    const spotifyApi=useGroove();
    const { data: session, status }=useSession();
    const [currentTrackId, setCurrentTrackId]=useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying]=useRecoilState(isPlayingState);
    const [volume, setVolume]=useState(50);

    const songInfo=useSongInfo();
    //console.log(songInfo?.album)

    const fetchCurrentSong=()=>{
        if(!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("Now Playing: ",data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    useEffect(()=>{
        if(spotifyApi.getAccessToken() && !currentTrackId)
        {
            //fetch the song info
            fetchCurrentSong();
            setVolume(70);
        }
    },[currentTrackIdState, spotifyApi, session]);

  return (
    <div className='bg-[#5a403c] flex w-11/12 mx-auto rounded-3xl p-3'>
        <img className='hidden md:inline w- w-20 h-20 rounded-2xl' src={songInfo?.album.images?.[0]?.url} alt=''/>
        <div className='text-rose-100'>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
    </div>
  )
}

export default Player