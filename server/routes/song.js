const express = require("express");
const router = express.Router();

const passport = require("passport");
const Song = require("../models/song.js");
const User = require("../models/user.js");
const likedSongModel = require("../models/likedSongs.js");

router.post("/create" ,passport.authenticate("jwt" ,{session : false}), async(req ,res)=>{
       console.log("in song create body");
       const{name , thumbnail , track} = req.body;
       if(!name || !thumbnail || !track){
        return res.status(301).json({error : "insufficient details to create song"});
       }
        
       const artist = req.user._id; // this user is added in req by passport.authenticated()
       console.log(artist);
       const songDetails = {name ,thumbnail , track , artist};
       const createSong = await Song.create(songDetails);
       return res.status(200).json(createSong);

});

//! get route to get all songs i have published 
router.get("/get/mysongs" , passport.authenticate("jwt" , {session : false} ), async (req , res)=>{  
    const song = await Song.find({artist : req.user._id}).populate("artist"); // so here we have to use model name not the collection name
    return res.status(200).json({data : song});
});


//!get route to get all songs any artist has published 
//i will send the artist id and  i want to see all songs that artist has published. 
router.get("/get/artist/:artistId" ,passport.authenticate('jwt' , {session : false}) ,async (req ,res)=>{
   const {artistId} = req.params;
  
   // check that artist is exist or not 
   const song_artist = await User.findOne({_id : artistId});
   console.log("this is artist  : " , song_artist);
   if(!song_artist){
    console.log("no artist");
     return res.status(301).json({err: "Artist does not exist"});
   }

   // if artist exist then find the songs
   const songs = await Song.find({artist : artistId});
   return res.status(200).json({data : songs});
   
}
);

//!get route to get a single song by name 
router.get("/get/songname/:songname" , passport.authenticate("jwt" ,{session: false}) , async(req ,res)=>{
         const {songname} = req.params;
        console.log(songname);          
         //this api find the  exact name song  matching not the similer.  
         const songs = await Song.find({name : songname }).populate("artist");
         return res.status(200).json({data : songs});

});

//! add songs liked by user .
router.post("/liked/songs", passport.authenticate("jwt" ,{session : false}),async(req , res)=>{
       
              const user = req.user._id;
              const {songId} =  req.body;
             
              const data = {user ,likedSongs : songId};
              const isUser = await likedSongModel.findOne({user : user});

              
              if(isUser){
                    
                    // check that song alreay present or not. 
                    if(isUser.likedSongs.find((ele)=> ele== songId)){
                      return res.status(301).json({err : "Song Already Exist.."});
                    }

                      isUser.likedSongs.push(songId);
                      await isUser.save();
                      return res.status(200).json(isUser);
              }else{
                const response = await likedSongModel.create(data);
                return res.status(200).json(response);  
              }
                      
} )

//get all liked songs 
router.get("/get/likedSongs" , passport.authenticate("jwt" ,{session: false}) , async(req , res)=>{
      const user = req.user._id;
      const response = await likedSongModel.findOne({user : user}).populate({
        path : "likedSongs",
        populate : {
              path : "artist"
        }
      });
      return res.status(200).json({data : response});
} )

module.exports = router;