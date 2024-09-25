import express from "express";
import {crear,buscar,buscarID,actualizar,borrar} from "../drivers/petsController.js";

const routerPets = express.Router();

routerPets.get('/', (req,res) =>{
    res.send('Hola sitio de mascotas');
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