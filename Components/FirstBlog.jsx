import React from 'react'
import Image from 'next/image'
import demoImg from'@/public/img/laptop.jpg'
import Link from 'next/link'
import { AiTwotoneCalendar } from 'react-icons/ai'
import moment from 'moment'
import Profile from '@/public/img/profile.jpg'

const FirstBlog = ({firstBlog}) => {
    const timeStr = firstBlog?.createAt;
    const time = moment(timeStr);
    const formattedTime =time.format("MMMM DD YYYY");

  return (
     <section>
        <Link href={`/blog/${firstBlog?._id}`}>
            <div className='flex flex-col md:flex-row items-center gap-8'>
                <div className='w-full lg:w-2/5'>
                    <Image  
                    src={firstBlog?.image ? firstBlog.image?.url:demoImg} 
                    alt='first blog img' 
                    width={0} 
                    height={0} 
                    sizes='100vw' 
                    className='w-full rounded-lg'
                    />    
                </div>
                <div className='w-full lg:w-3/5 space-y-5'>
                    <div className='flex items-center gap-3 text-xs'>
                        <p className='text-primeColor '>{firstBlog?.category}</p>
                        <p className='flex items-center gap-1 text-paragraphColor'>
                          <AiTwotoneCalendar />
                          {formattedTime}
                        </p>

                    </div>
                    <div className='space-y-2'>
                       <h2>{firstBlog?.title}</h2>
                       <p className='text-sm text-paragraphColor'>
                        {firstBlog?.excerpt}
                       </p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Image src={firstBlog?.authorId?.avatar?.url ? firstBlog?.authorId?.avatar?.url:Profile}
                         alt='picture of the author' width={0} height={0} sizes='100vw' 
                         className='w-10 h-10 rounded-full' />
                         <div className='text-xs'>
                          <h3>{firstBlog?.authorId?.name}</h3>
                          <p className='text-paragraphColor'>{firstBlog?.authorId?.designation}</p>
                         </div>
                    </div>

                </div>
            </div>
        </Link>
        
     </section>
  )
}

export default FirstBlog