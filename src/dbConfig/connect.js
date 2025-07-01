
export default function connect(){
      try {
         console.log(process.env.MONGODBURI);
         mongoose.connect(process.env.MONGODBURI);
         const connection=mongoose.connection;
         connection.on('save',()=>{ //event listeners in mongodb
            console.log("Mongodb connected successfully !!!");
         })
         connection.on('error',(err)=>{
            console.log("Mongodb connection failed : ",err.message);
         })
      } catch (error) {
         console.log("something went wrong !!!");
         console.log(error);
      }
}