import { useContext } from "react";
import songContext from '../../contexts/songContext';

const SingleCardSong = ({info , playSound}) =>{
    const {currentSong , setCurrentSong } = useContext(songContext);

    return (
        <div className="flex  hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm " onClick={()=>{setCurrentSong(info)}}>
            <div className="h-12 w-12 bg-cover bg-center" 
            style={{
                backgroundImage : `url(${info.thumbnail})`
                }}>
            </div>

            <div className="flex  w-full ">
                <div className="flex justify-center flex-col text-white pl-4 w-5/6">
                  <div className="hover:underline cursor-pointer">{info.name}</div>
                  <div className="hover:underline cursor-pointer text-xs text-gray-400">{info.artist.firstname + " " + info.artist.lastname}</div>
                </div>
                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                        <div>3:44</div>     
                </div>
                   
            </div>
        </div>
    )
}

export default SingleCardSong;