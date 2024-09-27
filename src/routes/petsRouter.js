import express from "express";
import {crear,buscar,buscarID,actualizar,borrar} from "../drivers/petsController.js";

const routerPets = express.Router();

routerPets.get('/', (req,res) =>{
    res.send('🦴 Módulo de Mascotas: Aquí gestionamos la información de las mascotas, incluyendo creación, búsqueda, actualización y eliminación de registros. ¡Ayúdanos a encontrarles un hogar!');

})

routerPets.post('/crear', (req,res) =>{
    crear(req,res);
})

routerPets.get('/buscar', (req,res) =>{
   buscar(req,res);
})

routerPets.get('/buscarId/:id', (req,res) =>{
    buscarID(req,res);
 })

 routerPets.put('/actualizar/:id', (req,res) =>{
   actualizar(req,res);
})

routerPets.delete('/borrar/:id', (req,res) =>{
    borrar(req,res);
})

export {
    routerPets
}