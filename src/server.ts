import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";



let server : Server;
const PORT = 3000;

async function main(){
    try {
        await mongoose.connect(`mongodb+srv://Library_management:Abdullah3201@cluster0.h2l9h.mongodb.net/Library_management?appName=Cluster0`);
        console.log('connected to databa');


        server = app.listen(PORT, ()=>{
            console.log(`server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main()