'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import Input from './input'
import { useRouter } from 'next/navigation';

const initialState ={
  name:"",
  email:"",
  password:""
}
const signupForm = () => {
  const NextUrl = process.env.NEXTAUTH_URL;
  const [hydrated,setHydrated] = useState(false);
  const [state,setState] = useState(initialState);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const router = useRouter()
  useState(()=>{
    setHydrated(true)
  },[]);
  if(!hydrated){
    return null;
  }
  const handleSubmit = async(e)=>{
   e.preventDefault();
   const {name, email, password} = state;
   if(!name || !email || !password){
    setError("All fields are required");
    return;  
   }
  //  Regular expression pattern for a basic email validation
  const pattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
  if(!pattern.test(email)){
    setError("Please enter a valid email address.");
    return;
  }
  if(password.length <6){
    setError("Password must be at least 6 chaacter long.");
    return;
  }
  try{
   setIsLoading(true);
   const newUser ={
    name, email, password
   }

   const response = await fetch(`${NextUrl}/api/signup`,{
    headers:{
      "Content-Type":"application/json"
    },
    method:"POST",
    body:JSON.stringify(newUser)
  })
  if(response?.status === 201){
    setSuccess("Registration Successful");
    setTimeout(()=>{
     router.push("/login",{scroll:false});
    },1000);
  }else{
    setError("Error occured while registering")
  }
    }catch(error){
    console.log(error)
  }
  setIsLoading(false)
  };
  const handleChange =(event)=>{
   setError("");
   setState({...state,[event.target.name]:event.target.value})
  }
  return (
    <section className="container">
        <form onSubmit={handleSubmit} className='border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5'>
            <h2 className='text-center special-word'>Sign up</h2>
            <Input 
            label="Name" 
            type="text"
            name="name"
            onChange={handleChange}
            value={state.value}
            />
            <Input 
            label="Email" 
            type="text" 
            name="email"
            onChange={handleChange}
            value={state.email}
            />
            <Input 
            label="Password" 
            type="password" 
            name="password"
            onChange={handleChange}
            value={state.password}
            />

            {
              error && <div className='text-red-700'>{error}</div>
            }
            {
              success && <div className='text-green-700'>{success}</div>
            }

            <button type='submit' className='btn w-full bg-primeColor text-white px-5
             py-2 rounded-lg hover:opacity-90 '>
              {isLoading ? "Loading":" Sign up"}
             </button>
            <p className='text-center'>
                Already a user?{" "}
                <Link href={"/login"} className='text-primeColor'>Login</Link>
                </p>
        </form>
    </section>
  )
}

export default signupForm