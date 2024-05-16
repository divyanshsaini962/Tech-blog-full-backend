'use client'
import React,{useState} from 'react'
import { useSession } from 'next-auth/react';
import Input from '@/Components/input'
import { useRouter } from 'next/navigation';
import TextArea from '@/Components/TextArea';
import Image from 'next/image'
import demoImg from '@/public/img/dem_img.jpg'



const initialState ={
  title:"",
  description:"",
  excerpt:"",
  quote:"",
  category:"Songbirds",
  photo:""
}

 const CreateBlog = () => {
 const CLOUD_NAME="dv34vio38"
 const UPLOAD_PRESET="NEXTJS_BLOG_WEBSITE"

  const [state,setState] = useState(initialState);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const router = useRouter();
  const {data:session,status} = useSession();
  // console.log(session)

  if(status === "loading"){
    return <p>loading...</p>
  }
  if(status === "unauthenticated"){
    return <p>Access denied</p>
  }

  const handleChange =(event)=>{
   setError("")
   const{name,value,type,files} = event.target;
   if(type==='file'){
    setState({...state,[name]:files[0]});
   }else{
    setState({...state,[name]:value})
   }
   };
   const handleSubmit = async(e)=>{
    e.preventDefault(); 
    const {title,category,description,excerpt,quote,photo}=state;
    if(!title || !description || !category || !excerpt || !quote){
      setError("Please fill out all required fields.");
      return;
    }
    if(photo){
      const maxSize = 5 * 1024 * 1024;
      if(photo.size > maxSize){
        setError('File size is too large . Please select a file under 5MB.');
        return;
      }
    }
    if(title.length < 4){
      setError("Title must be at least 4 charcters long");
      return;
    }
    if(description.length<20){
      setError("Description must be at least 20 character long.")
      return;
    }
    if(excerpt.length<10){
      setError("Excerpt must be at least 10 character long.")
      return;
    }
    if(quote.length < 6){
      setError("Quote must be at least 6 character long.")
      return;
    }
    try{
      setIsLoading(true);
      setError("");
      setSuccess("");
      const image = await uploadImage();
      const newBlog ={
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        authorId: session?.user?._id // Added optional chaining
      }
      const response = await fetch("http://localhost:3000/api/blog",{
        headers:{
          "Content-Type":"application/json", 
          Authorization:`Bearer ${session?.user?.accessToken}`
        },
        method:"POST",
        body:JSON.stringify(newBlog)
      })
      if(response?.status === 201){
        setSuccess("Blog created successfully .");
        setTimeout(()=>{
          router.refresh();
          router.push("/blog")
        },1500)
      }else{
        setError("Error occurred while creating blog.")
      }
    }catch(error){
     console.log(error)
     setError("Error occurred while creating blog.")
    }
   }
   const uploadImage = async () => {
    if (!state.photo) return;

    const formData = new FormData();
    formData.append("file", state.photo);
    formData.append("upload_preset", UPLOAD_PRESET);
    try{
     const res = await fetch(`https://api.cloudinary.com/v1_1/${
      CLOUD_NAME}/image/upload`,{
        method:"POST",
        body:formData,
      });
      const data = await res.json();
      const image = {
        id:data["public_id"],
        url:data['secure_url']
      }
      return image;
    }catch(error){
     console.log(error)
    }
   }
  return (
    <section className='container max-w-3xl'>
      <h2 className='mb-5'>
         <span className='special-word'>Create</span> Blog
      </h2>
      <form onSubmit={handleSubmit} action="space-y-5">
      <Input 
            title="Name" 
            type="text"
            name="title"
            placeholder="write you title here...."
            onChange={handleChange}
            value={state.title}
            />
      <TextArea 
            label="Description" 
            rows="4"
            name="description"
            placeholder="write you Description here...."
            onChange={handleChange}
            value={state.description}
            />
      <TextArea 
            label="Excerpt" 
            rows="2"
            name="excerpt"
            placeholder="write you excerpt here...."
            onChange={handleChange}
            value={state.excerpt}
            />
      <TextArea 
            label="Quote" 
            rows="2"
            name="quote"
            placeholder="write you quote here...."
            onChange={handleChange}
            value={state.quote}
            />
      <div>
        <label className='block'>select an options</label>
        <select 
        name="category"
        onChange={handleChange}
        value={state.category}
        className='block rounded-lg w-full p-3 bg-primeColorLight'
        >
        <option value="Songbirds">Songbirds</option>
        <option value="Waterfowl">Waterfowl</option>
        <option value="parrots">Parrots</option>
        <option value="Seabirds">Seabirds</option>
        <option value="Gamebirds">Gamebirds</option>
        </select>
      </div>
      <div>
        <label className='block mb-2 text-sm font-mediam'>
          Upload Image
        </label>
        <input onChange={handleChange} id='photo' type="file" name='photo' accept='image/*'/>
        {state.photo && (
          <div>
            <Image
             src={URL.createObjectURL(state.photo)}
             priority
             alt="Sample image"
             width={0}
             height={0}
             sizes="100vw"
             className="w-32 mt-5"
            />
          </div>
        )}
        
      </div>
      {
              error && <div className='text-red-700'>{error}</div>
            }
            {
              success && <div className='text-green-700'>{success}</div>
            }

            <button type='submit' className='btn bg-primeColor text-white px-5
             py-2 rounded-lg hover:opacity-90 '>
              {isLoading ? "Loading":"Create"}
             </button>
      </form>

    </section>
  )
}

export default CreateBlog