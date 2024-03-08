const mongoose = require("mongoose");

const song = new mongoose.Schema({
    

    name : {
        type : String ,
        required : true ,       
    },
    thumbnail : {
        type : String , // we paste the usl of thumbnail
        required : true ,
    },
    track :{
        type :String ,
        required : true
    } ,
    artist : {
        type : mongoose.Types.ObjectId , 
        ref : "spotifyUser", // using this we can use other model object id. so give the model name here
    }
});

const songmodel = mongoose.model("song" ,song);
module.exports = songmodel; // export this model to use in other file 

