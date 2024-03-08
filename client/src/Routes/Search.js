import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
import SingleCardSong from "../Component/Shared/SingleCardSong";

const SearchPage=()=>{
      
      const [isInputFocused ,setIsFocused] = useState(false);
      const [searchText ,setSearchText] = useState("");
      const [songData , setSongData ] = useState([]);
      const [result , setResult] = useState("");

      const searchSong= async(searchText)=>{
         const response =  await makeAuthenticatedGETRequest("/song/get/songname/" + searchText.toLowerCase());
               setSongData(response.data);
               console.log("Search resonse data ==> " , response.data);
      }
    
    return(
        <LoggedInContainer currActiveScreen={"search"}>
            <div className="w-full py-6">
                <div className={`${isInputFocused?"border border-white":""} w-1/3 text-sm bg-gray-700 flex rounded-full p-3 px-5 items-center`}>
                <Icon icon="ic:outline-search" color="white" className="text-lg" />
                <input 
                type="text"
                placeholder="What do you want to listen to ?"
                className="w-full px-2 bg-gray-700 focus:outline-none text-white"
                onFocus={()=>{setIsFocused(true)}}
                onBlur={()=>{setIsFocused(false)}}
                value={searchText}
                onChange={(e)=>{
                        setSearchText(e.target.value);
                }}
                onKeyDown={(e)=>{ let x = (e.key=== 'Enter') && ( searchSong(searchText) , setResult(searchText) );}}
                />
                </div>
                {/* show song div start */}
                {   
                   songData.length > 0 ?
                   <div className="pt-10 space-y-2">
                            <div className="text-white">Search results for <span className="font-bold">{result}</span></div>
                            { songData &&  songData.map((info)=>{
                                        return <SingleCardSong key={JSON.stringify(info)} info={info} playSound={()=>{}}/>                                          
                                    })}
                   </div> : <div className="pt-10 text-gray-400">
                            { !result ? "Nothing to show here... ": "No result found..."}
                   </div>
                }
                

            </div>
        </LoggedInContainer>
    )
}

export default SearchPage;