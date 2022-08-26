import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

const grooveApi=new SpotifyWebApi({
    clientId:process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
})

const useGroove = () => {
    const {data: session,status}=useSession();
    
    useEffect(()=>{
        if(session)
        {
            if(session.error==="RefreshAcessTokenError") {
                signIn();
            }
            
            grooveApi.setAccessToken(session.user.accessToken)
        }
    },[session]);

    return grooveApi;
}

export default useGroove;
