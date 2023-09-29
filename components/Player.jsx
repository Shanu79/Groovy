import React, { useEffect, useState } from 'react';
import useGroove from '../hooks/useGroove';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import Image from 'next/image';
import arrowIcon from "../public/images/play_arrow.svg";
import nextIcon from "../public/images/skip_next.svg";
import pauseIcon from "../public/images/pause.svg";

const Player = () => {
    const spotifyApi = useGroove();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();
    //console.log(songInfo?.album)

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("Now Playing: ", data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            //fetch the song info
            fetchCurrentSong();
            setVolume(70);
        }
    }, [currentTrackIdState, spotifyApi, session]);

    const handlePlayPause= ()=>{
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data.body.is_playing)
            {
                spotifyApi.pause();
                setIsPlaying(false);
            }
            else
            {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }


    // function padTo2Digits(num) {
    //     return num.toString().padStart(2, '0');
    // }

    // function convertMsToTime(milliseconds) {
    //     let seconds = Math.floor(milliseconds / 1000);
    //     let minutes = Math.floor(seconds / 60);

    //     seconds = seconds % 60;
    //     minutes = minutes % 60;

    //     return `${padTo2Digits(minutes)}:${padTo2Digits(
    //         seconds,
    //     )}`;
    // }

    // const res = convertMsToTime(songInfo?.duration_ms)

    return (
        <div className='bg-[#5a403c] flex p-3 rounded-3xl gap-1'>
            <div className='w-16 sm:w-20'>
                <img className='md:inline rounded-2xl' src={songInfo?.album.images?.[0]?.url} alt='' />
            </div>
            <div className='w-full flex flex-col justify-between px-1'>
                <div className='flex justify-between'>
                    <div className='text-rose-100 w-full'>
                        <h3 className='text-lg sm:text-2xl'>{songInfo?.name}</h3>
                        <p className='font-light text-xs sm:text-sm'>{songInfo?.artists?.[0]?.name}</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className='bg-[#f8dcd8] hover:bg-[#ffb4a8] w-[4.5rem] h-10 sm:w-24 sm:h-12 rounded-full flex justify-center items-center hover:cursor-pointer'
                        onClick={handlePlayPause}>
                            {isPlaying ? (
                                <Image src={pauseIcon} />
                            ) : (
                                <Image src={arrowIcon} />
                            )}
                            {/* {console.log(isPlaying)} */}
                        </div>
                        <div className='bg-[#c5afad] hover:bg-[#ab7870] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex justify-center items-center hover:cursor-pointer'><Image src={nextIcon} /></div>
                    </div>
                </div>
                <div className='flex gap-8 mb-[0.125rem] sm:mb-1'>
                    <div className='bg-white h-[0.125rem] sm:h-1 w-full my-auto'></div>
                </div>
            </div>
        </div>
    )
}

export default Player