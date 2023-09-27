import { useRecoilState } from "recoil";
import useGroove from './useGroove';
import {currentTrackIdState} from "../atoms/songAtom";
import { useEffect, useState } from "react";

const useSongInfo = () => {
    const spotifyApi=useGroove();
    const [currentIdTrack, setCurrentIdTrack]=useRecoilState(currentTrackIdState);
    const [songInfo,setSongInfo]=useState(null);

    useEffect(()=>{
        const fetchSongInfo= async () => {
            if(currentIdTrack)
            {
                 const trackInfo=await fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                 {
                    headers:{
                        Authorization:`Bearer ${spotifyApi.getAccessToken()}`,
                    }
                 }).then(res => res.json());

                 setSongInfo(trackInfo);
            }
        }

        fetchSongInfo();
    },[currentIdTrack,spotifyApi]);

    return songInfo;
}

export default useSongInfo