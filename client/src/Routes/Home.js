import spotifyLogo from '../assets/images/spotify_logo_white.svg';
import IconText from '../Component/Shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../Component/Shared/TextWithHover';
import {Link} from 'react-router-dom';

const focusData = [
    {
     title : "Peaceful Piano" ,
     description: "Relax and indulge with beautiful piano pieces" ,
     imgUrl :  "https://images.unsplash.com/photo-1682687982046-e5e46906bc6e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"   
    },
    {
     title:"Deep Focus" ,
     description:"Keep calm and focus on this music", 
     imgUrl : "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"   
    } ,
    {
     title:"Instrmantel Study" ,
     description:"Foucs with soft study music in the background",
     imgUrl : "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdHJ1bWVudHxlbnwwfHwwfHx8MA%3D%3D"          
    },
    {
     title:"Focus Flow" ,
     description:"Up tempo instrumental hip hop beats", 
     imgUrl : "https://plus.unsplash.com/premium_photo-1661767552224-ef72bb6b671f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN0dWR5fGVufDB8fDB8fHww"           
    },
    {
     title:"Beats to think to ", 
     description:"Focus with deep techno and tech house", 
     imgUrl : "https://images.unsplash.com/photo-1616709062048-788acece6a51?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXRzfGVufDB8fDB8fHww"
    }          
 ];

 const Sound_of_india = [
   
   {
    title:"Deep Focus" ,
    description:"Keep calm and focus on this music", 
    imgUrl : "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"   
   } ,
   {
    title : "Peaceful Piano" ,
    description: "Relax and indulge with beautiful piano pieces" ,
    imgUrl :  "https://images.unsplash.com/photo-1682687982046-e5e46906bc6e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"   
   },
   
   {
    title:"Focus Flow" ,
    description:"Up tempo instrumental hip hop beats", 
    imgUrl : "https://plus.unsplash.com/premium_photo-1661767552224-ef72bb6b671f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN0dWR5fGVufDB8fDB8fHww"           
   },
   {
    title:"Instrmantel Study" ,
    description:"Foucs with soft study music in the background",
    imgUrl : "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdHJ1bWVudHxlbnwwfHwwfHx8MA%3D%3D"          
   },
   {
    title:"Beats to think to ", 
    description:"Focus with deep techno and tech house", 
    imgUrl : "https://images.unsplash.com/photo-1616709062048-788acece6a51?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXRzfGVufDB8fDB8fHww"
   } 

 ];

const Home = () =>{
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
                    <IconText active iconName={"bxs:home"} displayText={"Home"}/>
                    <IconText  iconName={"mdi:search"} displayText={"Search"}/>
                    <IconText  iconName={"icomoon-free:books"} displayText={"Library"}/>
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
                            <div className='w-3/5 flex h-full justify-around items-center '>
                        <TextWithHover displayText={"Premium"}/>
                        <TextWithHover displayText={"Support"}/>
                        <TextWithHover displayText={"Download"}/>
                        <div className='h-1/2 border-r border-white '></div>
                           </div>
                        <div className='w-2/5 flex justify-around h-full items-center'>
                        <TextWithHover displayText={"Sign up"}/>
                        <div className='cursor-pointer bg-white font-semibold h-2/3 px-8 flex items-center justify-center rounded-full'>
                         <Link to="/login">Log in</Link>   
                        </div>
                        </div>
                        </div>
                    </div>

                    <div className="content p-8 pt-0 overflow-auto ">
                        <PlaylistView titleText={"Focus"} cardData={focusData}/>
                        <PlaylistView titleText={"Song Playlists"} cardData={Sound_of_india}/>
                        <PlaylistView titleText={"Sound of India"} cardData={focusData}/>
                    </div>

                </div>
        </div>
    ) 
};




const PlaylistView = ({titleText , cardData})=>{
    return(
        <div className="text-white mt-8">
        <div className='text-2xl font-semibold mb-5'>{titleText}</div>
        <div className='w-ful flex justify-between space-x-3'>
            {
                cardData.map((item)=>{
                        return <Card title={item.title} description={item.description} imgUrl={item.imgUrl} />
                })
            }           
        </div>
        </div>
    )
};
const Card=({title , description ,imgUrl})=>{
    return (
        <div className='bg-black bg-opacity-40 rounded-lg w-1/5 p-4'>
            <div className='pb-4 pt-2'>
                <img className='w-full rounded-md' src={imgUrl} alt="Song Img"/>
            </div>
            <div className='text-white  font-semibold py-3'>{title}</div>
            <div className=' text-gray-500 text-sm'>{description}</div>
        </div>
    )
}

export default Home;