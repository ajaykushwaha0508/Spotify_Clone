const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require('../models/playlist.js');
const User = require("../models/user.js");
const Song = require("../models/song.js");


router.post("/create" , passport.authenticate('jwt' , {session : false}), async(req , res)=>{
    console.log("in create playlist");
    const currentuser = req.user;
    console.log(currentuser);
    const {name ,thumbnail , songs} = req.body;
    if(!name || !thumbnail  || !songs){
        return res.status(301).json({err : "Insufficient data "});
    }

    const playlistdata = {
        name ,
        thumbnail,
        songs,
        owner : currentuser._id,
        collaborators : []
    }

    const playlist = await Playlist.create(playlistdata);
    return res.status(200).json(playlist);
});

// get a palylist by id 
// we will get the playlist id as a parameter ans we will return the playlis having songs 

router.get('/get/playlist/:playlistId' , passport.authenticate('jwt' , {session : false}) ,async(req , res)=>{
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findOne({_id : playlistId})
    .populate({
        path : "songs" , 
        populate : {
            path : "artist"
        }
    });

    if(!playlist){
        return res.status(301).json({err : "invalid  id"});
    }

    return res.status(200).json(playlist); 
});

//get all plylists made by me 
router.get("/get/me" ,passport.authenticate('jwt' , {session : false}) , async(req , res)=>{
    const artistId  = req.user._id;

    const playlists = await Playlist.find({owner : artistId}).populate("owner");
    return res.status(200).json({data : playlists});
});


//get all plylists made by an artist 
router.get("/get/artist/:artistId" ,passport.authenticate('jwt' , {session : false}) , async(req , res)=>{
      const artistId  = req.params.artistId;
      
        // verify aertist id is valid or not 
      const artist = await User.findOne({_id : artistId});

      if(!artist){
         return res.status(304).json({err : "invalid artist id "});
      }

      const playlists = await Playlist.find({owner : artistId});
      return res.status(200).json({data : playlists});
});

// add a song to a plylist 
    router.post('/add/song' , passport.authenticate("jwt" , {session : false}) , async(req , res)=>{

        const currentuser = req.user;
        console.log(currentuser);
        const {playlistId , songId} = req.body;

        //s1 get playlist if valid 
        const playlist = await Playlist.findOne({_id : playlistId});
        if(!playlist){
            console.log("playlist validation ")
            return res.status(304).json({err : "playlist does not exist"});
        }
        //s2 : check if current user is own the playlist or in the collaborator
       console.log(playlist.owner);
       console.log(currentuser._id);

        if(!playlist.owner.equals(currentuser._id) && !playlist.collaborators.includes(currentuser._id)){
            console.log("playlist member validation ")
            return res.status(304).json({err : "not allowed"});
        } 

        //s3 : check song is valid or not 
        const song = await Song.findOne({_id: songId });
        if(!song){
            console.log("playlist song validation ")
            return res.status(304).json({err :  "song does not exist "});
        }

        playlist.songs.push(songId);
        await playlist.save(); // to save the changes 

        return res.status(200).json(playlist);
    });



module.exports = router;