import SingleCardSong from '../Component/Shared/SingleCardSong';
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
import {useState , useEffect } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';

const MyMusic = ()=>{
    const [songData , setSongData] = useState([]);

    useEffect(()=>{
                   const getData= async()=>{
                       const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
                       setSongData(response.data);
                       console.log("mymusic response " ,response );
                   }
                   getData();
               } , [])

    return(
        <LoggedInContainer currActiveScreen={"mymusic"}>
            <div className='text-white pt-8 text-2xl font-semibold pb-4 pl-2'>My Songs</div>
                <div className='space-y-3 flex  flex-col-reverse'>    
                          { songData &&  songData.map((info , key)=>{
                            return <SingleCardSong key={key} info={info} playSound={()=>{}}/>                                          
                         })}                                                   
                </div>
        </LoggedInContainer>
    )
}

export default MyMusic;