import express from "express";
import cors from "cors"; // Importa cors
import { routerPets } from "./routes/petsRouter.js";
import { routerAdopters } from "./routes/adoptersRouter.js";
import { routerAdoptionRequests } from "./routes/adoptionRequestsRouter.js";
import { db } from "./database/conexion.js";

// Crear instancia de Express
const app = express();

// Middleware CORS
app.use(cors()); // Habilita CORS

// Middleware JSON
app.use(express.json());

// Verificar Conexión Base de Datos
db.authenticate().then(() => {
    console.log(`Conexión a Base de datos correcta`);
}).catch(err => {
    console.log(`Conexión a Base de datos incorrecta ${err}`);
});

// Definir Rutas
app.get('/', (req, res) => {
    res.send(`
        <h1>🌟 Bienvenido a Tail Tails Rescue 🌟</h1>
        <p>Tu destino para encontrar a tu nuevo mejor amigo.</p>
        <p>En Tail Tails Rescue, nos dedicamos a rescatar y reubicar mascotas necesitadas. Nuestro compromiso es encontrar hogares amorosos para todos los animales de todas las razas y edades. Cada uno de nuestros amigos peludos tiene una historia única y un corazón lleno de amor esperando ser compartido.</p>
    `);
});

// Llamar rutas de Mascotas
app.use("/mascotas", routerPets);

// Llamar rutas de Adoptantes
app.use("/adoptantes", routerAdopters);

// Llamar rutas de Solicitud de Adopción
app.use("/solicitudes", routerAdoptionRequests);

// Puerto de Servidor
const PORT = 4000;

db.sync().then(() => {
    // Abrir servicio e iniciar el Servidor
    app.listen(PORT, () => {
        console.log(`Servidor Inicializado en el puerto ${PORT}`);
    });
}).catch(err => {
    console.log(`Error al Sincronizar base de datos ${err}`);
});
