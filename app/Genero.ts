import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"

export interface IGenero extends mongoose.Document { 
    nombre_del_anime:string;
    generos: string;

}
//Creamos nuestro esquema que contendra la informacion de los generos del anime
const GeneroSchema = new mongoose.Schema({
    nombre_del_anime: { type: String, required: true },
    generos: { type: String, required: true }
    
});

export const Genero = mongoose.model<IGenero>("Genero", GeneroSchema);
//Creamos la funcion que se llamara desde app.ts que se encargara de crear un nuevo documento con la informacion del genero que mas tarde se enlazara a su respectivo anime
export const CreateGeneros = async function(Name_Anime:string,generos: string){
    await connectMongoDB;

    const newOne = new Genero();
    newOne.generos=generos;
    newOne.nombre_del_anime=Name_Anime;

    newOne.save( (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newOne);
        }
    } );
}
//Funcion que se encargara de optener la informacion de todos los generos esta sera llamada por la anterior funcion
export function getGenero(_name_anime: string):Promise<any>{
    return new Promise<any>( resolve => {
        Genero.findOne({ nombre_del_anime: _name_anime}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}