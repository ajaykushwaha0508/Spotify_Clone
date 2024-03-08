import { useEffect, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleCardSong from "../Component/Shared/SingleCardSong";

const LikedSongs=()=>{
    const [likedSongsData , setLikedSongsData] = useState([]);
    useEffect(()=>{
             const getData = async()=>{
                    const response = await makeAuthenticatedGETRequest("/song/get/likedSongs");
                    setLikedSongsData(response.data);
                    console.log("liked song response" , response );
                   
             }
             getData();
    }, [])
    
return (
    <LoggedInContainer currActiveScreen={"likedSongs"}>

                <div className='text-white pt-8 text-2xl font-semibold pb-4 pl-2'>Liked Songs</div>
                <div className='space-y-3 flex  flex-col-reverse'>    
                          { likedSongsData.likedSongs &&  likedSongsData.likedSongs.map((info , key)=>{
                            return <SingleCardSong key={key} info={info} playSound={()=>{}}/>                                          
                         })}                                                   
                </div>

    </LoggedInContainer>
)
}

export default LikedSongs;
