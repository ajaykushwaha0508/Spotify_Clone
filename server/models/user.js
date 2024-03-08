const mongoose = require("mongoose");

const user = new mongoose.Schema({


    firstname  : {
        type : String , 
        required : true,
    } , 
    lastname  : {
        type : String , 
        required : false,
    } ,
    email  : {
        type : String , 
        required : true,
    },
    password : {
        type : String , 
        required : true ,
        private : true
    } ,
    username  : {
        type : String , 
        required : true,
    },
    likedSongs  : {
        type : String , 
        default : "",
    },
    likedPlaylists  : {
        type : String , 
        default : "",
    },
    subscribedArtists  : {
        type : String , 
        default : "",
    }
});

const usermodel = mongoose.model("spotifyUser" ,user);
module.exports = usermodel; // export this model to use in other file   

