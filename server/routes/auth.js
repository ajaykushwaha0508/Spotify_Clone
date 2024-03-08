const express = require("express");

const router = express.Router();
const User = require("../models/user.js");

const bcrypt = require("bcrypt");

const {getToken} = require('../utils/helpers.js'); 



router.post('/register' , async(req ,res)=>{
    

    //this  code is run whem the /resister api is called as post request .
    
    //my req.body will be of the format {email , password , firstname , lastname , username}
    const {email , password , firstname , lastname , username} = req.body;

    //step : 2 does a user with this email already exist? if yes then throw a error 
    const user = await User.findOne({email : email});

    if(user){
        // status code is by default 200
        console.log(user); 
        return res
        .status(403).json({error : "A user with this email already exists"});
    }
    // this is a valid request 


    //step : 3 create a new user in a db 
    // step 3.1 : we dont store passwords in plain text . 
    // xyz : we convert this pain text password  into  hash. 
    
    const hashedPassword = await bcrypt.hash(password , 10);
    const  newUserData = {email , password : hashedPassword , firstname , lastname , username} ; 
    console.log(newUserData);
    const newUser = await User.create(newUserData);

    //step 4: we want to create a token to return to the user
    const token  = await getToken(email , newUser);
     
    //step 5 :  return the result to the user 
    const userToReturn = {...newUser.toJSON() , token};
    delete userToReturn.password;

    return res.status(200).json(userToReturn);


});



router.post("/login" , async(req , res)=>{

    //step 1 : get email and password sent by user from req.body
    const {email , password} = req.body;
    console.log(email , password);
    //step 2 : check if a user with the given email alredy exist . if not credential are invalid . 
    const user = await  User.findOne({email : email});
    console.log("this is user data " , user);
    if(!user){
        return res.status(403).json({error : "You don't have an account.."});
    }
    //step 3 : if the user exists , check if the password is correct . if not , the credentials are invalid   
    // this is a tricky step . why ? because we have stored the orignal password in a hash password 
    // i can't do this : if (password === user.password)
    // bcrypt.compare enabled us to compare 1 password in  plaintext(password from req.body) to a hash password 
    const isPasswordValid = await bcrypt.compare(password , user.password);
    
    if(!isPasswordValid){
        return res.status(403).json({error : "Password is not valid.."});
    }
    //step 4 :  if the credential are correct , return a token to the user.
    const token = await getToken(user.email , user);
    const userToReturn = {...user.toJSON() , token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});

module.exports = router;
