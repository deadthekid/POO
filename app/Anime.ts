import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"
import {IGenero,getGenero} from "./Genero"

export interface IAnime extends mongoose.Document { 
    Name_Anime: string;
    Episode_Number: Number;
    Descripcion: string;
    Genero:IGenero
}
//Creamos nuestro esquema que contendra la informacion del anime
const AnimeSchema = new mongoose.Schema({
    Name_Anime: { type: String, required: true },
    Episode_Number: {type: Number, required: true},
    Descripcion: { type: String, required: false },
    Genero: { type: mongoose.Schema.Types.ObjectId, ref: "Genero" }
});

export const Anime = mongoose.model<IAnime>("Anime", AnimeSchema);



//Creamos la funcion que se llamara desde app.ts que se encargara de crear un nuevo documento con la informacion del anime
export const CreateAnime = async function(NameAnime:string,EpisodeNumber: Number,Descripcion: string){
    //Primero aseguramos nuestra conexion con la base de datos
    await connectMongoDB;
    //Optenemos nuestro genero en funcion del nombre del anime
    const gen:any = await getGenero(NameAnime);

    //Realizamos la percistencia de nuestros datos del anime en nuestra MongoDB
    const A = new Anime();
    A.Name_Anime=NameAnime;
    A.Episode_Number=EpisodeNumber;
    A.Descripcion=Descripcion;
    A.Genero=gen;
    //Funcion para realizar nuestra percistencia en la MongoDB
    A.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(A);
        }
    });
}


