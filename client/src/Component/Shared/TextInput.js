 const TextInput = ({label , placeholder , className , value , setValue , labelclassname}) =>{
    return(
        <div className={`w-full flex flex-col space-y-2 ${className} `} >
            <label className={`font-semibold ${labelclassname}`} htmlFor={label}>{label}</label>
           
           <input 
           className="border border-solid border-gray-300 rounded p-3" 
           type="text" 
           id={label} 
           placeholder={placeholder}
           value = {value}
           onChange={(e)=>{
                setValue(e.target.value);
           }}
            />
        </div>
    )
 }

 export default TextInput;