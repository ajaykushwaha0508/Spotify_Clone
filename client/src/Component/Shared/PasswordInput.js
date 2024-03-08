const PasswordInput =({label , placeholder , value ,setValue})=>{
    return(
        <div className="w-full flex flex-col space-y-2 " >
            <label className="font-semibold" for={label}>{label}</label>
           <input 
           className="border border-solid border-gray-300 rounded p-2" 
           type="password" 
           id="name" 
           placeholder={placeholder}
           value={value}
            onChange={(e) =>{
                setValue(e.target.value);
            }}
           />
        </div>
    )
}

export default PasswordInput;