import React from 'react'
import SignupForm from '@/Components/signupForm'
import { getServerSession } from 'next-auth'
import {redirect} from 'next/navigation'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'

 export const Signup = async() => {
  const session =await getServerSession(authOptions)
  if(session) redirect("/blog")
  return (
   <div>
     <SignupForm/>
   </div>
  )
}

export default Signup