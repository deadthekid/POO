import mongoose = require("mongoose");
import { resolve } from "dns";

//Solo se encarga de hacer la conexion con nuestra MongoDB
//PDT: asignar uri de nuestra MongoDB 

const uri: string = "mongodb+srv://deadthekid:Hebermeza@77@deadthekid-akwvq.azure.mongodb.net/Anime?retryWrites=true&w=majority";

export const connectMongoDB  = new Promise<void>(resolve => {
    mongoose.connect(uri,{ useNewUrlParser:true, useUnifiedTopology: true }, (err: any) => {
        if(err){
            console.log(err.message);
        }else{
            console.log("Conexion exitosa");
        }
        resolve();
    });
});


