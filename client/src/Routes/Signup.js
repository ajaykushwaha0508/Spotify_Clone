import { Icon } from '@iconify/react';

import TextInput from '../Component/Shared/TextInput';
import PasswordInput from '../Component/Shared/PasswordInput';
import {Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {useCookies} from 'react-cookie';

import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';
const SignupComponent=()=>{

    const [email , setEmail]               = useState('');
    const [confirmEmail , setConfirmEmail] = useState('');
    const [username , setUsername]         = useState('');
    const [password , setPassword]         = useState('');
    const [firstname , setFirstname]       = useState('');
    const [lastname , setLastname]         = useState('');

    const [cookie , setCookie] = useCookies(['token']);
    
    const navigate = useNavigate();
   
    

    const singUp = async () =>{
        if(email !== confirmEmail){
            alert("email and confirm email must be same ")
            return;
        }
        const data = {email ,confirmEmail , username ,password ,firstname , lastname};
        const response = await makeUnauthenticatedPOSTRequest("/auth/register" , data);

        if(response && !response.error){
          

            const token = response.token;

            const date = new Date();
            date.setDate(date.getDate() + 30);
           
           setCookie("token" ,token , {path : "/"  , expires : date});

            alert("successful");
            
            navigate("/home");
        }else{
          
            alert("failure");

        }

    }
  
    return(
      
        <div className="w-full h-full flex flex-col items-center ">

            <div className=" logo w-full border-b border-solid border-gray-300 flex justify-center p-5 ">
            <Icon icon="logos:spotify" width = "150" />  
            </div>

            <div className="inputRegion w-1/3 py-10 flex justify-center flex-col items-center">
            <div className='font-bold mb-6 text-2xl'>To continue, log in to spotify</div>

            <TextInput 
            label="Email Address" 
            className="my-6" 
            placeholder="Enter your email"
            value = {email}
            setValue={setEmail}
            />

            <TextInput 
            label="Confirm Email Address" 
            className="mb-6" 
            placeholder="Enter your email again "
            value = {confirmEmail}
            setValue={setConfirmEmail}
            />
            
            <TextInput 
            label="Username" 
            className="mb-6" 
            placeholder="Enter Your Username "
            value = {username}
            setValue={setUsername}
            />

            <PasswordInput 
            label="Password" 
            placeholder="Password"
            value={password}
            setValue={setPassword}
            />

            <div className="w-full flex justify-between items-center space-x-2">
            <TextInput 
            label="First Name" 
            className="my-6" 
            placeholder="Enter Your First Name"
            value = {firstname}
            setValue={setFirstname}
            />

            <TextInput 
            label="Last Name" 
            className="my-6" 
            placeholder="Enter Your Last Name"
            value={lastname}
            setValue={setLastname}
            />

            </div>

            
            <div className='w-full  flex justify-center my-8 '>
            <button className='bg-green-400 font-semibold  p-2 px-10 rounded-full ' onClick={(e)=>{
                e.preventDefault();
                singUp();
            }}>
                SIGN IN 
            </button>
            </div>
             
             <div className='w-full border border-solid border-gray-300'></div>
             
             <div className='my-6 font-semibold text-lg'>Already have an account?</div>

             <div className=' font-bold border border-gray-500 text-gray-500 w-full flex items-center justify-center py-2 rounded-full'> <Link to="/login">LOG IN INSTED</Link></div>
            </div>
           
        </div>
    
    )
     
    
}
export default SignupComponent ; 
