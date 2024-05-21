import React, { useContext } from 'react'
import { FaEye } from "react-icons/fa";
import {useState} from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';


const Login = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [data,setData] = useState({
    email : "",
    password : ""
});

const navigate = useNavigate()
const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

const handleOnChange = (e) =>{
    const { name , value } = e.target

    setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
    })
}

const handleSubmit = async(e) =>{
  e.preventDefault()

  const dataResponse = await fetch(SummaryApi.signIn.url,{
      method : SummaryApi.signIn.method,
      credentials : 'include',
      headers : {
          "content-type" : "application/json"
      },
      body : JSON.stringify(data)
  })

  const dataApi = await dataResponse.json()

  if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
      // fetchUserAddToCart()
  }

  if(dataApi.error){
      toast.error(dataApi.message)
  }

}


  return (
   <section id='login'>
    <div className='mx-auto container p-4'>

     <div className='bg-white p-5 w-full max-w-sm mx-auto'>
         <div className='w-20 h-20 mx-auto'>
            <img src='/signin.gif' alt='login icons'></img>
         </div>

         <form className='pt-6' onSubmit={handleSubmit}>
            <div className='grid pt-3'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input type='email' name='email' value ={data.email}placeholder='enter email' onChange={handleOnChange} className='w-full h-full outline-none bg-transparent'></input>
              </div>
              
            </div>
            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex cursor-pointer'>
                <input type={showPassword ? "text" : "password"} 
                placeholder='enter password'
                name='password'
                value={data.password}
                onChange={handleOnChange} 
                className='w-full h-full outline-none bg-transparent'>
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

            <button className='bg-red-600 text-white px-y py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
         </form>
         <p className='my-5'>Don't have an Account?<Link to={'/signup'} className='hover:text-red-600 text-red-800 hover:underline'> Signup</Link></p>

     </div>
    </div>
   </section>

  )
}

export default Login
