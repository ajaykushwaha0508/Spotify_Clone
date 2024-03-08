const mongoose = require("mongoose");

const playlist = new mongoose.Schema({
    name : {
        type : String ,
        required : true ,       
    },
    thumbnail : {
        type : String , // we paste the url of thumbnail
        required : true ,
    },
   owner : {
    type : mongoose.Types.ObjectId,
    ref : "spotifyUser",
   },
   songs: [
     {
        type : mongoose.Types.ObjectId ,
        ref : "song"
   } 
] ,
collaborators : [
    {
        type : mongoose.Types.ObjectId ,
        ref :"spotifyUser"
    }
]
    
});

const playlistmodel = mongoose.model("playlist" ,playlist);
module.exports = playlistmodel; // export this model to use in other file 

