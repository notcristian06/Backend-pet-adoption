import express from "express";
import { routerPets } from "./routes/petsRouter.js";
import { routerAdopters } from "./routes/adoptersRouter.js";
import { routerAdoptionRequests } from "./routes/adoptionRequestsRouter.js";
import {db} from "./database/conexion.js";

//Crear instancia de Express
const app = express();

//Middleware JSON
app.use(express.json());

//Verificar Conexion Base Datos
db.authenticate().then(()=>{
    console.log(`Conexion a Base de datos correcta`);
}).catch(err=>{
    console.log(`Conexion a Base de datos incorrecta ${err}`);
});


//Definir Rutas
app.get('/', (req, res) => {
    res.send(`
        <h1>🌟 Bienvenido a Tail Tails Rescue 🌟</h1>
        <p>Tu destino para encontrar a tu nuevo mejor amigo.</p>
        <p>En Tail Tails Rescue, nos dedicamos a rescatar y reubicar mascotas necesitadas. Nuestro compromiso es encontrar hogares amorosos para todos los animales de todas las razas y edades. Cada uno de nuestros amigos peludos tiene una historia única y un corazón lleno de amor esperando ser compartido.</p>
    `);
    
});

//Llamar rutas de Mascotas
app.use("/mascotas",routerPets);

//Llamar rutas de Adoptantes
app.use("/adoptantes",routerAdopters);

//Llamar rutas de Solicitud de Adopcion
app.use("/solicitudes",routerAdoptionRequests);

//Puerto de Servidor
const PORT=4000;

db.sync().then(()=>{
    //Abri servicio e iniciar el Servidor
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en el puerto ${PORT}`);
    })

}).catch(err=>{
    console.log(`Error al Sincronizar base de datos ${err}`);
});