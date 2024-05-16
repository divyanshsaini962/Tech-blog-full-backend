import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='justify-center container h-screen flex flex-col gap-5 items-center'>
       <h2>Not Found</h2>
       <p>Could not requested resource </p>
       <Link href={"/"}>Return Home</Link>
    </div>
  )
}

export default NotFound