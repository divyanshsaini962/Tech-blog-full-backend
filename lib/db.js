import mongoose from 'mongoose';


export async function connect(){
    try{
        mongoose.connect(process.env.MONGODB_URL);
        const connection = mongoose.connection;

        connection.on('connected', () =>{
            console.log('MongoDB conected succesfully')
        })
        connection.on('error' , (err)=>{
            console.log('MongoDB connection error. Please make sure')
            process.exit();
        })
    }catch(error){
        console.log('Something goes wrong!');
        console.log(error);
    }
}