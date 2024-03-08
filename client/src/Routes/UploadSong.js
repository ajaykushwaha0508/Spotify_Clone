import spotifyLogo from '../assets/images/spotify_logo_white.svg';
import IconText from '../Component/Shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../Component/Shared/TextWithHover';
import {Link , useNavigate} from 'react-router-dom';
import TextInput from '../Component/Shared/TextInput'
import CloudinaryUpload from '../Component/Shared/CloudinaryUpload';
import {useState} from 'react';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper.js';

const UploadSong = () =>{

    const [name , setname] = useState('');
    const [thumbnail , setThumbnail] = useState('');
    const [songUrl , setSongUrl ] = useState('');
    const [uploadedSongFileName , setUploadedSongFileName] = useState('');
    
    const navigate = useNavigate(); 

    const submitSong= async()=>{
        const data = { name : name.toLowerCase()  , thumbnail , track : songUrl};
        
        const response = await makeAuthenticatedPOSTRequest("/song/create" , data);
        console.log(response);

        if(response.error){
            alert("Could not create song");
            return;
        }
        alert("success");
        navigate("/mymusic");
    }

    
    return (
        
        <div className="h-full w-full flex flex-row ">
                {/* left pannel  */}

                <div className="h-full bg-black w-1/5 pb-10 flex flex-col justify-between">
                    <div>
                  {/* this is logo */}
                  <div className="logoDiv p-6">
                    <img width={125} src={spotifyLogo} alt='Spotify logo'  />
                  </div>

                <div className='py-5'>
                  <Link to="/home"><IconText active iconName={"bxs:home"} displayText={"Home"}/></Link>  
                    <IconText  iconName={"mdi:search"} displayText={"Search"}/>
                    <IconText  iconName={"icomoon-free:books"} displayText={"Library"}/>
                    <IconText  iconName={"material-symbols:library-music-rounded"} displayText={"My Music"}/>
                </div>

                <div className='pt-5'>
                    <IconText  iconName={"ic:baseline-add-box"} displayText={"Create Playlist"}/>
                    <IconText  iconName={"mdi:heart-box"} displayText={"Liked Songs"}/>
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
                        <TextWithHover active displayText={"Upload Song"}/>
                        <div className='cursor-pointer bg-white font-semibold h-10 w-10 flex items-center justify-center rounded-full'>
                         <Link to="/login">AK</Link>   
                        </div>
                        </div>
                        </div>
                    </div>
                     {/* below navbar  */}
                    <div className="content p-8 pt-0 overflow-auto ">
                       <div className='text-white my-8 font-semibold text-2xl'>Upload Your Music</div>
                       <div className='flex w-2/3 space-x-3 '>
                           <div className='w-1/2'>
                           <TextInput
                           label="Name" 
                           labelclassname="text-white"
                           placeholder="Name"
                           value = {name}
                           setValue={setname}
                            />
                           </div>
                           <div className='w-1/2'>
                           <TextInput
                           label="Thumbnail"   
                           labelclassname="text-white"
                           placeholder="Thumbnail"  
                           value = {thumbnail}
                           setValue = {setThumbnail}
                           />
                           </div>
                       </div> 
                           <div className='py-5'>
                            {   
                               uploadedSongFileName ?
                               <div className=" w-1/3 rounded-full p-2 bg-white">{uploadedSongFileName.substring(0 , 35)}...</div>
                               :
                               <CloudinaryUpload 
                               setUrl={setSongUrl} 
                               setName={setUploadedSongFileName}
                                />
                            }
                            
                           </div>

                           {
                            uploadedSongFileName && name && thumbnail &&
                             <div className="bg-white font-semibold text-lg p-2 cursor-pointer rounded-full w-40 flex justify-center align-center" onClick={submitSong} >
                             Submit Song
                             </div>
                           }
                           

                         
                    </div>

                </div>
        </div>
    ) 
};

export default UploadSong;