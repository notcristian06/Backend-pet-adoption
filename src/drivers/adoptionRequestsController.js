import { adoptionRequests } from "../models/adoptionrequestsModel.js"; // Asegúrate de que la ruta sea correcta
import { pets } from "../models/petsModel.js"; // Importa también el modelo de mascotas
import { adopters } from "../models/adoptersModel.js"; // Importa el modelo de adoptantes


const crear = async (req, res) => {
    try {
        // Validar que pet_id y adopter_id existan en el cuerpo de la solicitud
        if (!req.body.pet_id) {
            return res.status(400).send({
                mensaje: "La mascota debe existir."
            });
        }

        if (!req.body.adopter_id) {
            return res.status(400).send({
                mensaje: "El adoptante debe existir."
            });
        }

        // Buscar el nombre de la mascota en la tabla pets
        const pet = await pets.findOne({ where: { id: req.body.pet_id } });
        if (!pet) {
            return res.status(404).send({
                mensaje: "La mascota no existe en la base de datos."
            });
        }

        // Buscar el nombre del adoptante en la tabla adopters
        const adopter = await adopters.findOne({ where: { id: req.body.adopter_id } });
        if (!adopter) {
            return res.status(404).send({
                mensaje: "El adoptante no existe en la base de datos."
            });
        }

        // Crear el objeto dataset con los nombres obtenidos de la base de datos
        const dataset = {
            pet_id: req.body.pet_id,
            adopter_id: req.body.adopter_id,
            request_date: req.body.request_date || new Date(),  // Usa la fecha actual si no se proporciona
            status: req.body.status || 'Pending',  // Estado por defecto
            name_pet: pet.name,  // Obtener el nombre de la mascota desde la base de datos
            name_adopter: adopter.first_name + ' ' + adopter.last_name,  // Obtener el nombre completo del adoptante
            comments: req.body.comments || ''  // Si hay comentarios, los agrega, si no, los deja vacíos
        };

        // Usar Sequelize para crear el recurso en la base de datos
        const resultado = await adoptionRequests.create(dataset);
        return res.status(201).json({
            mensaje: "Registro de Solicitud de Adopción creado con éxito",
            data: resultado
        });
    } catch (err) {
        return res.status(500).json({
            mensaje: `Error al crear la Solicitud de Adopción: ${err.message}`
        });
    }
};




//Funcion Buscar Solicitud de Adopcion
const buscar = (req, res) => {
    adoptionRequests.findAll().then((resultado) => {
        res.status(200).json(resultado);

    }).catch((err) => {

        res.status(500).json({
            mensaje: `No se encontraron registros ::: ${err}`

        });

    });
}




//Funcion BuscarId Solicitud de Adopcion
const buscarID = (req, res) => {
    const id = req.params.id;
    if (id == null) {
        res.status(400).json({
            mensaje: "El id no puede estar vacio"
        });
        return;
    } else {

        adoptionRequests.findByPk(id).then((resultado) => {
            res.status(200).json(resultado);

        }).catch((err) => {

            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`

            });

        });

    }


}



//Funcion Actualizar Solicitud de Adopcion

const actualizar = (req, res) => {
    const id = req.params.id
    if (!req.body.pet_id && !req.body.adopter_id) {
        res.status(400).json({
            mensaje: "No se encontraron Datos para Actualizar."
        });
        return;
    } else {
        const pet_id = req.body.pet_id;
        const adopter_id = req.body.adopter_id;
        const request_date = req.body.request_date;
        const status = req.body.status;
        const name_pet = req.body.name_pet;
        const name_adopter = req.body.name_adopter;
        const comments = req.body.comments;


        adoptionRequests.update({ pet_id , adopter_id, request_date, status, name_pet, name_adopter, comments },
            { where: { id } }).then((resultado) => {
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro actualizado."
                });
            }).catch((err) => {
                res.status(500).json({
                    tipo: 'error',
                    mensaje: `Error al actualizar registro. ::: ${err}`
                });

            });
    }

}

// Función Borrar Solicitud de Adopcion
const borrar = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            mensaje: "El id no puede estar vacío."
        });
        return;
    }

    adoptionRequests.destroy({ where: { id } })
        .then((resultado) => {
            if (resultado === 1) {
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro de Solicitud de Adopcion eliminado con éxito."
                });
            } else {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "Solicitud de Adopcion no encontrado."
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al Eliminar registro. ::: ${err}`
            });
        });
};

export { crear, buscar, buscarID, actualizar, borrar };
