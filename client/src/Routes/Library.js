import { useEffect, useState } from "react"
import LoggedInContainer from "../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../utils/serverHelper"
import { useNavigate } from "react-router-dom";

const Library =()=>{
    const [myPlaylists , setPlaylists] = useState([]);

    useEffect(()=>{
        const getData = async() =>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            console.log("Library response ==> " , response);
            setPlaylists(response.data);
        } 
        getData(); 
    } ,[])

    return <LoggedInContainer currActiveScreen={"library"}>
           <div className="text-white pt-10  text-2xl font-semibold">My Playlists</div>
           <div className="mt-4 grid grid-cols-5 gap-5">
            {
                myPlaylists.map((item)=>{
                    return <Card imgUrl={item.thumbnail} playlistId={item._id}   title={item.name} description={""} key={JSON.stringify(item) 
                      
                    } />
                })
            }
           </div>
          </LoggedInContainer>
}



const Card=({title , description ,imgUrl ,playlistId})=>{
    const navigate = useNavigate();

    return (
        <div className='bg-black bg-opacity-40 rounded-lg w-full p-4 cursor-pointer' onClick={()=>{navigate("/playlist/" + playlistId)}}>
            <div className='pb-4 pt-2'>
                <img className='w-full  rounded-md' src={imgUrl} alt="Song Img"/>
            </div>
            <div className='text-white  font-semibold py-3'>{title}</div>
            <div className=' text-gray-500 text-sm'>{description}</div>
        </div>
    )
}

export default Library;