import express from "express";
import { crear, buscar, buscarID, actualizar, borrar } from "../drivers/adoptersController.js";

const routerAdopters = express.Router();

routerAdopters.get('/', (req, res) => {
    res.send('Hola sitio de mascotas');
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