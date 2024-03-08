import spotifyLogo from '../assets/images/spotify_logo_white.svg';
import IconText from '../Component/Shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../Component/Shared/TextWithHover';
import {Link} from 'react-router-dom';
import { Howl , Howler } from 'howler';
import {  useContext, useEffect, useState , useLayoutEffect, useRef } from 'react';
import songContext from '../contexts/songContext';
import CreatePlaylistModal from '../Modal/CreatePlaylistModal';
import AddToPlaylistModel from '../Modal/AddToPlaylistModel';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';
import {useParams} from 'react-router-dom';


const LoggedInContainer = ({children , currActiveScreen}) =>{
    const [createPlaylistModalOpen , setCreatePlaylistModalOpen ] = useState(false);
    const [addToPlaylistModelOpen , setAddToPlaylistModelOpen ] = useState(false);
    const {currentSong , setCurrentSong , isPaused , setIsPaused ,soundPlayed ,setSoundPlayed} = useContext(songContext);
    const firstUpdate = useRef(true);

  
    

    const ChangeSong=(songSrc)=>{
       
        if(soundPlayed){
           soundPlayed.stop(); // this is two stop prev song 
        }
        var sound = new Howl({
           src: [songSrc],
          html5: true
     });
     setSoundPlayed(sound);
     sound.play();
     setIsPaused(false);
    };

    useLayoutEffect(()=>{
        if(firstUpdate.current){
            firstUpdate.current = false;
            return;
        }

        if(!currentSong){
            return;
        }

        ChangeSong(currentSong.track);
    } , [currentSong && currentSong.track],[]
    );

    const addSongToPlaylist = async(playlistId) =>{
        const songId = currentSong._id;
        const payload =  {playlistId , songId};
        
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song" , payload);
        console.log("add song to playlist response ==>" , response);
        if(response){
            setAddToPlaylistModelOpen(false);
        }
    };

    const addSongToLikedSongs = async(songId) =>{
        const response = await makeAuthenticatedPOSTRequest("/song/liked/songs" , {songId});
        response.err ? alert("song alredy liked") : alert("song liked");
    }


    const playSound=()=>{
            if(!soundPlayed){
                return;
            }
            soundPlayed.play();
    }

    const pauseSound=()=>{
        soundPlayed.pause();
    }

    const togglePlayPause=()=>{
        if(isPaused){
            playSound();
            setIsPaused(false);
        }else{
            pauseSound();
            setIsPaused(true);
        }
    }

    return (
        
        <div className="h-full w-full bg-app-black ">
             { createPlaylistModalOpen && <CreatePlaylistModal closeModal={()=>{ setCreatePlaylistModalOpen(false)}} /> } 
             { addToPlaylistModelOpen && <AddToPlaylistModel addSongToPlaylist={addSongToPlaylist} closeModal={()=>{ setAddToPlaylistModelOpen(false)}} /> } 
            <div className={`${currentSong ?"h-9/10" : "h-full"} w-full flex` }>
           

                {/* left pannel  */}

                <div className="h-full bg-black w-1/5 pb-10 flex flex-col justify-between">
                    <div>
                  {/* this is logo */}
                  <div className="logoDiv p-6">
                    <img width={125} src={spotifyLogo} alt='Spotify logo'  />
                  </div>

                <div className='py-5'>
                  <IconText  
                  iconName={"bxs:home"} 
                  tragateLink={"/home"} 
                  displayText={"Home"}
                  active = { currActiveScreen === "home" }
                  /> 
                
                <IconText  
                iconName={"mdi:search"}  
                displayText={"Search"}
                active = { currActiveScreen === "search" }
                tragateLink={"/search"} 
                />
                
                <IconText  
                iconName={"icomoon-free:books"} 
                displayText={"Library"}
                active = { currActiveScreen === "library" }
                tragateLink={"/library"}
                />
                  
                <IconText  
                iconName={"material-symbols:library-music-rounded"} 
                tragateLink={"/mymusic"} 
                displayText={"My Music"}
                active = { currActiveScreen === "mymusic" }
                />

                </div>

                <div className='pt-5'>
                    <IconText  
                    iconName={"ic:baseline-add-box"} 
                    displayText={"Create Playlist"}
                    onClick={()=>{setCreatePlaylistModalOpen(true)}}
                    />
                    <IconText  
                    iconName={"mdi:heart-box"} 
                    displayText={"Liked Songs"}
                    tragateLink = {"/likedSongs"}
                    active = { currActiveScreen === "likedSongs" }
                    />
                </div>
                </div>
                
                <div className='border  flex mx-3 w-2/5 rounded-full items-center justify-center '>
                    <Icon icon="icon-park-outline:world" color='white' />
                    <div className='text-white ml-2 '>                       
                    English
                    </div>               
                </div>

                </div>
                
                
               
                {/* right pannel */}

                <div className=' w-4/5 h-full bg-app-black overflow-auto'>
                <div className="navbar   h-1/10 w-full bg-black flex justify-end items-center bg-opacity-30">
                        <div className='w-1/2 flex h-full felx'>
                            <div className='w-2/3 flex h-full justify-around items-center '>
                        <TextWithHover displayText={"Premium"}/>
                        <TextWithHover displayText={"Support"}/>
                        <TextWithHover displayText={"Download"}/>
                        <div className='h-1/2 border-r border-white '></div>
                           </div>
                        <div className='w-1/3 flex justify-around h-full items-center'>
                        <TextWithHover targetLink={"/uploadsong"} displayText={"Upload Song"}/> 
                        <div className='cursor-pointer bg-white font-semibold h-10 w-10 flex items-center justify-center rounded-full'>
                         <Link to="/login">AK</Link>   
                        </div>
                        </div>
                        </div>
                    </div>

                    <div className="content p-8 pt-0 overflow-auto ">
                        {children}
                    </div>

                </div>

                </div>
                {/* this div is a playing song  */}
                {
                    currentSong &&
                   
                    <div className='h-1/10 w-full bg-black bg-opacity-30 text-white flex items-center px-4'>
                   
                    <div className='w-1/4  flex items-center'>
                        <img 
                        src= {currentSong.thumbnail}
                        alt ="currentPlayingSongImg"
                        className='w-14 h-14 rounded '
                        />
                        <div className='pl-4'>
                            <div className='text-sm hover:underline cursor-pointer'>{currentSong.name}</div>
                            <div className='text-xs text-gray-500 hover:underline cursor-pointer'>{currentSong.artist.firstname + " " + currentSong.artist.lastname}</div>
                        </div>
                    </div>
                    <div className='w-2/4 flex justify-center flex-col items-center'>
                        
                        <div className='flex w-1/3 justify-between items-center'>
                        {/* this is the contols  */}
                        <Icon icon="ph:shuffle-light"fontSize={30} 
                        className='cursor-pointer text-gray-500 hover:text-white'
                        />
                        <Icon icon="ic:outline-skip-previous"fontSize={30} 
                        className='cursor-pointer text-gray-500 hover:text-white'
                        />
                        <Icon icon={isPaused ? "icon-park-solid:play":"zondicons:pause-solid"} fontSize={45} 
                        className='cursor-pointer text-gray-500 hover:text-white'
                        onClick={()=>{togglePlayPause()}}
                        />
                        <Icon icon="ic:outline-skip-next"fontSize={30} 
                        className='cursor-pointer text-gray-500 hover:text-white'
                        />
                        <Icon icon="mynaui:repeat"fontSize={30} 
                        className='cursor-pointer text-gray-500 hover:text-white'
                        />
                        </div>

                      <div>
                            {/* this is porgress bar  */}
                        </div> 

                    </div>
                    <div className='w-1/4 flex justify-end items-center pr-2 space-x-2 '>
                    <Icon icon="material-symbols:playlist-add"
                    fontSize={30} 
                    className='cursor-pointer text-gray-500 hover:text-white'
                    onClick={()=> {setAddToPlaylistModelOpen(true)}}
                    />

                    <Icon icon="ph:heart"
                    fontSize={25} 
                    className='cursor-pointer text-gray-500 hover:text-white'
                    onClick={()=>{addSongToLikedSongs(currentSong._id)}}
                    />

                    </div>

                </div>
                }
                
        </div>
    ) 
};


export default LoggedInContainer;