const express = require('express');
const mongoose = require("mongoose");
const path = require('path');//D
const cors =  require("cors");
const app = express();

const port =  8000;
const  _dirname = path.resolve(); //D

app.use(cors());
app.use(express.json());  // using this one line every req.body that is come form the front end will automatically conert into the json 

// routers
const authRoutes = require("./routes/auth.js");
const songRoutes = require("./routes/song.js");
const playlistRoutes = require("./routes/playlist.js");
//jwt requirement 
const User = require("./models/user.js");

const passport = require("passport");
const  JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

require("dotenv").config();




//connet to mongodb 
mongoose.connect(`${process.env.MONGO_DB}` 
, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then((x)=>{
    console.log("connected to db");
}).catch((err)=> {
    console.log("Error while connecting to mongo " , err);
});


//passport jwt
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // here we get bearerToken 
opts.secretOrKey = 'thiskeyissupposetosecrete';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.use("/auth" , authRoutes);
app.use("/song" , songRoutes);
app.use("/playlist" , playlistRoutes);

app.get("/spotify" , (req ,res)=>{
    res.send("This is a spotify clone");
})

app.get("/list" , (req ,res)=>{
    res.send("This is a list of songs");
});

app.use(express.static(path.join(_dirname , "/client/build"))); //D
app.get("*" , (req , res)=>{
    res.sendFile(path.join(_dirname , "client" , "build" , "index.html")); //D
})

app.listen( port , ()=>{
    console.log("The server is running in port" , port);
});