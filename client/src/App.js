
import './output.css';
import {BrowserRouter , Routes , Route , Navigate} from 'react-router-dom'
import  LoginComponent from './Routes/login.js';
import SignupComponent from './Routes/Signup.js';
import HomeComponent from './Routes/Home.js';
import {useCookies} from 'react-cookie';
import LoggedInHome from './Routes/LoggedInHome.js';
import MyMusic from './Routes/MyMusic.js';
import UploadSong from './Routes/UploadSong.js';
import songContext  from './contexts/songContext.js'; // context 
import { useState } from 'react';
import SearchPage from './Routes/Search.js';
import LibraryPage from './Routes/Library.js';
import SinglePlaylistView from './Routes/SinglePlaylistView.js';
import LikedSongsPage from './Routes/likedSongs.js';

function App() {
       
       const [soundPlayed , setSoundPlayed] = useState(null);
       const [isPaused , setIsPaused] = useState(true);
       const [currentSong , setCurrentSong] = useState(null);
       const [cookie , setCookie]  = useCookies(['token']);
       

  return (
    <div className="w-screen h-screen font-poppins ">
            
             <BrowserRouter>
             {
               cookie.token ? 
               (

              <songContext.Provider value={{currentSong , setCurrentSong , isPaused ,setIsPaused , soundPlayed ,setSoundPlayed}}>
              <Routes>

              <Route path="/home" element={<LoggedInHome/>}/>
              <Route path="/uploadsong" element={<UploadSong/>}/>
              <Route path="/mymusic" element={<MyMusic/>}/>
              <Route path="/search" element={<SearchPage/>}/>
              <Route path="/library" element={<LibraryPage/>}/>
              <Route path="/playlist/:playlistId" element={<SinglePlaylistView />}/>
              <Route path="/likedSongs" element={<LikedSongsPage />}/>
              <Route path="*" element={<Navigate to="/home"/>}/>

              </Routes> 
              </songContext.Provider>
             
             ) 
             : 
             (
             <Routes>
             <Route path="/login" element={<LoginComponent/>}/>
             <Route path="/signup" element={<SignupComponent/>}/>
             <Route path="/home" element={<HomeComponent/>}/>
             <Route path="*" element={<Navigate to="/login"/>}/>
             </Routes>            
             )
             }
             </BrowserRouter>
    </div>
  );
}

export default App;
