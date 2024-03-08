import { useEffect ,useState } from "react";
import LoggedInHomeContainer from "../containers/LoggedInContainer";
import { useParams } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleCardSong from "../Component/Shared/SingleCardSong";

const SinglePlaylistView = () =>{
    const [myPlaylist ,setMyPlaylist] = useState([]);
    const {playlistId}  = useParams();

       useEffect(()=>{

                const getData = async()=>{
                    const response = await makeAuthenticatedGETRequest(`/playlist/get/playlist/${playlistId}`);
                    console.log("single Playlist view response ==> " , response);
                    setMyPlaylist(response); 
                }
                getData();
       } , [])
             
    return(    <LoggedInHomeContainer currActiveScreen={"library"}>
                {  myPlaylist.songs &&  
                <div>
                <div className='text-white pt-8 text-2xl font-semibold pb-4 pl-2'>{myPlaylist.name}</div>
                <div className='space-y-3 flex  flex-col-reverse'>    
                           {  myPlaylist.songs.length > 0 ?

                                    myPlaylist.songs.map((info , key)=>{
                                    return <SingleCardSong key={key} info={info} playSound={()=>{}}/>                                          
                                    })
                                    : 
                                    <div  className="text-gray-400 text-md pl-2">Playlist Is Empty , Add Songs...</div>
                        
                          };                                               
                </div>
               </div>
                }
              </LoggedInHomeContainer>

)};

export default SinglePlaylistView;
