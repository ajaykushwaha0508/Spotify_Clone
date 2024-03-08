import TextInput from "../Component/Shared/TextInput";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
const CreatePlaylistModal=({closeModal})=>{

    const [playlistName , setPlaylistName] = useState("");
    const [playlistThumbnail , setPlaylistThumbnail] = useState("");
    
    const createPlaylist = async ()=> {
        
        const response = await  makeAuthenticatedPOSTRequest(
            "/playlist/create" ,
            {name : playlistName , thumbnail : playlistThumbnail ,songs : [] }
        )
        if(response._id){
            alert("Playlist Created..");
            closeModal();
        }
        console.log("create playlist response ==> " , response);
    }

    return(
         <div className="absolute h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}  >
            <div className="w-1/3 bg-app-black rounded-md p-4  " onClick={(e)=>{e.stopPropagation()}}>
                <div className="text-white text-lg font-semibold mb-5">Create Playlist</div>

                <div className="space-y-4 flex flex-col justify-center items-center">

                <TextInput
                           label="Name" 
                           labelclassname="text-white"
                           placeholder="Playlist Name "
                           value = {playlistName}
                           setValue={setPlaylistName}
                />
 
                <TextInput
                           label="Thumbnail" 
                           labelclassname="text-white"
                           placeholder="Thumbnail"
                           value = {playlistThumbnail}
                           setValue={setPlaylistThumbnail}
                />

                <div className="bg-white cursor-pointer w-1/3 font-semibold py-3 mt-4 flex justify-center items-center rounded" onClick={createPlaylist}>Create</div>

                </div>
            </div>
         </div>
    )
}

export default CreatePlaylistModal;