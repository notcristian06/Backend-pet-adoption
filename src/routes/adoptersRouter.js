import express from "express";
import { crear, buscar, buscarID, actualizar, borrar } from "../drivers/adoptersController.js";

const routerAdopters = express.Router();

routerAdopters.get('/', (req, res) => {
    res.send('🐾 Módulo de Adoptantes: Aquí gestionamos la información de los adoptantes, incluyendo creación, búsqueda, actualización y eliminación de registros. ¡Juntos, ayudamos a encontrar un hogar para cada mascota!');

})

routerAdopters.post('/crear', (req, res) => {
    crear(req, res);
})

routerAdopters.get('/buscar', (req, res) => {
    buscar(req, res);
})

routerAdopters.get('/buscarid/:id', (req, res) => {
    buscarID(req, res);
});

routerAdopters.put('/actualizar/:id', (req, res) => {
    actualizar(req, res);
})

routerAdopters.delete('/borrar/:id', (req, res) => {
    borrar(req, res);
})

export {
    routerAdopters
}