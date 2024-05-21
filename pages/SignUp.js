import React from 'react'
import { FaEye } from "react-icons/fa";
import {useState} from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const Login = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const [data,setData] = useState({
    email : "",
    password : "",
    name:"",
    confirmPassword:"",
    profilePic:""
});

const navigate = useNavigate();
// const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

const handleOnChange = (e) =>{
    const { name , value } = e.target

    setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
    })
}

const handleUploadPic = async(e) =>{
  const file = e.target.files[0]
  
  const imagePic = await imageTobase64(file)
  
  setData((preve)=>{
    return{
      ...preve,
      profilePic : imagePic
    }
  })

}

const handleSubmit = async(e) =>{
  e.preventDefault()

  if(data.password === data.confirmPassword){

    const dataResponse = await fetch(SummaryApi.signUP.url,{
        method : SummaryApi.signUP.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }

  }else{
    toast.error("Please check password and confirm password")
  }

}



  return (
   <section id='signup'>
    <div className='mx-auto container p-4'>

     <div className='bg-white p-5 w-full max-w-sm mx-auto'>
         <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
          <div>
            <img src={data.profilePic || '/signin.gif'} alt='login icons' />
          </div>
           <form>
            <label>
              <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full cursor-pointer'>
               Upload Photo
              </div>
              <input type='file' className='hidden' onChange={handleUploadPic}></input>
            </label> 
           </form>
            
         </div>
            
  
         <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
         <div className='grid pt-3'>
              <label>Name:</label>
              <div className='bg-slate-100 p-2'>
                <input type='text' name='name' value ={data.name}placeholder='Enter your name' onChange={handleOnChange} className='w-full h-full outline-none bg-transparent' required></input>
              </div>
            </div>

            <div className='grid pt-3'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input type='email' name='email' value ={data.email}placeholder='Enter email' onChange={handleOnChange} className='w-full h-full outline-none bg-transparent' required></input>
              </div>
            </div>

            <div className='grid pt-3'>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex cursor-pointer'>
                <input type={showPassword ? "text" : "password"} 
                placeholder='Enter password'
                name='password'
                value={data.password}
                onChange={handleOnChange} 
                className='w-full h-full outline-none bg-transparent' required>
                </input>
                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash/>
                      )
                      :
                      (
                        <FaEye/>
                      )
                      
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className='grid pt-3'>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex cursor-pointer'>
                <input type={showConfirmPassword ? "text" : "password"} 
                placeholder='Enter confirm password'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleOnChange} 
                className='w-full h-full outline-none bg-transparent' required>
                </input>
                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                  <span>
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash/>
                      )
                      :
                      (
                        <FaEye/>
                      )
                      
                    }
                  </span>
                </div>
              </div>
            </div>
            <button className='bg-red-600 text-white px-y py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>SignUp</button>
         </form>
         <p className='my-5'>Already have account?<Link to={'/login'} className='hover:text-red-600 text-red-800 hover:underline'> Login</Link></p>

     </div>
    </div>
   </section>

  )
}

export default Login
