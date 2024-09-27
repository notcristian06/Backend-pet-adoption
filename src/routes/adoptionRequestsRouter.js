import express from "express";
import { crear, buscar, buscarID, actualizar, borrar } from "../drivers/adoptionRequestsController.js";

const routerAdoptionRequests = express.Router();

routerAdoptionRequests.get('/', (req, res) => {
    res.send('📋 Módulo de Solicitudes de Adopción: Aquí gestionamos todas las solicitudes de adopción, permitiendo crear, buscar, actualizar y eliminar registros para asegurar que cada mascota encuentre su hogar ideal.');

})

routerAdoptionRequests.post('/crear', (req, res) => {
    crear(req, res);
})

routerAdoptionRequests.get('/buscar', (req, res) => {
    buscar(req, res);
})

routerAdoptionRequests.get('/buscarid/:id', (req, res) => {
    buscarID(req, res);
});

routerAdoptionRequests.put('/actualizar/:id', (req, res) => {
    actualizar(req, res);
})

routerAdoptionRequests.delete('/borrar/:id', (req, res) => {
    borrar(req, res);
})

export {
    routerAdoptionRequests
}