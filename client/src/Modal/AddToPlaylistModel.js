import { useState , useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";


const AddToPlaylistModel = ({closeModal ,addSongToPlaylist}) =>{

    const [myPlaylists , setPlaylists] = useState([]);

    useEffect(()=>{
        const getData = async() =>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            console.log("Library response ==> " , response);
            console.log(response);
            setPlaylists(response.data);
        } 
        getData(); 
    } ,[])

    return( 
    <div className="absolute h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}  >
            
            <div className="w-1/3 bg-app-black rounded-md p-4  " onClick={(e)=>{e.stopPropagation()}}>
                 <div className="text-white text-lg font-semibold mb-5">Select Playlist</div>

                <div className="space-y-4 flex flex-col justify-center items-center">
                    {
                        myPlaylists.map((item)=>{
                            return <PlaylistComponent addSongToPlaylist={addSongToPlaylist} info={item}/>;
                        })
                    }
                    
                </div>

    </div>

    </div>
)};

const PlaylistComponent = ({info ,addSongToPlaylist})=>{
    return (
        <div className="flex w-full bg-app-black items-center hover:bg-gray-400 hover:bg-opacity-20 p-2 cursor-pointer " onClick={()=>{addSongToPlaylist(info._id)} }>
            <div><img src={info.thumbnail} className="w-10 h-10 rounded-sm" /></div>
            <div className="text-white font-semibold text-md pl-3 hover:underline">{info.name}</div>
        </div>
    )
}

export default AddToPlaylistModel;