import { Icon } from '@iconify/react';

import TextInput from '../Component/Shared/TextInput';
import PasswordInput from '../Component/Shared/PasswordInput';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';
import { useCookies } from 'react-cookie';
import {Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';

const LoginComponent=()=>{
        const [email , setEmail] = useState(''); 
        const [password , setPassword] = useState(''); 

        const [cookie , setCookie] = useCookies(['token']);

        const navigate = useNavigate();


    const login = async () =>{

        const data = {email , password};
        const response = await makeUnauthenticatedPOSTRequest("/auth/login" , data);
       

        if(response && !response.error){
           
            const token = response.token;

            const date = new Date();
            date.setDate(date.getDate() + 30);
           setCookie("token" ,token , {path : "/"  , expires : date});

            alert(`Logged In Sucsessfully..`);
            
            navigate(`/home`);
        }else{
            alert(`${response.error}`);

        }

    }

  
    return(
      
        <div className="w-full h-full flex flex-col items-center ">

            <div className=" logo w-full border-b border-solid border-gray-300 flex justify-center p-5 ">
            <Icon icon="logos:spotify" width = "150" />  
            </div>

            <div className="inputRegion w-1/3 py-10 flex justify-center flex-col items-center">
            <div className='font-bold mb-6'>To continue, log in to spotify</div>
            <TextInput 
            label="Email address or username" 
            className="my-6" 
            placeholder="Email address or Username"
            value = {email}
            setValue={setEmail}
            />

            <PasswordInput 
            label="Password" 
            placeholder="Passsword"
            value = {password}
            setValue={setPassword}
            />
            
            <div className='w-full  flex justify-end my-8 '>
            <button className='bg-green-400 font-semibold  p-2 px-10 rounded-full ' onClick={(e)=>{
                 e.preventDefault();
                 login();
            }
            }>
                LOG IN 
            </button>
            </div>
             
             <div className='w-full border border-solid border-gray-300'></div>
             
             <div className='my-6 font-semibold text-lg'>Don't have an account?</div>

             <div className=' font-bold border border-gray-500 text-gray-500 w-full flex items-center justify-center py-2 rounded-full'> <Link to="/signup">SIGN UP FOR SPOTIFY</Link></div>
            </div>
           
        </div>
    
    )
     
    
}
export default LoginComponent ; 
