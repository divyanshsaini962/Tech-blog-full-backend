import Image from "next/image";
import Parrot from '../public/img/Parrot.png';

export default function Home() {
  return (
    <div className="container flex flex-col md:flex-row gap-5 h-[calc(100vh-4rem)]">
     <div className="basis-full flex flex-col justify-center md:basis-2/3">
      <p className="special-word text-xs ">Protect All the Birds</p>
      <h1 className="pb-5 ">The World's <span className="special-word">Rarest</span> <br />Birds</h1>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore a veniam nam molestias optio fugit quaerat, delectus aliquam, 
        tempore deleniti eius et cum consequuntur. Pariatur exercitationem debitis blanditiis quae corporis quis assumenda 
        ratione, repellendus est temporibus illum commodi animi vero aliquid eaque nam voluptatum culpa.</p>
     </div>
     <div className="md:block basis-1/3">
      <Image src={Parrot} alt="bird" sizes="100vw" className="w-full h-auto"/> 
     </div>
    </div>
  );
}
