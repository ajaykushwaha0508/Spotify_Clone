const mongoose = require('mongoose');

const LikedSong = new mongoose.Schema(
    {
        user : {
            type : mongoose.Types.ObjectId,
            ref : "spotifyUser"
        } , 

        likedSongs : [
            {
                type : mongoose.Types.ObjectId,
                ref : "song",
            }
        ]

    }
)

const likedSongModel = new mongoose.model("LikedSongByUser" , LikedSong);

module.exports  = likedSongModel;