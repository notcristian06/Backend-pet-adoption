import { adoptionRequests } from "../models/adoptionrequestsModel.js"; // Asegúrate de que la ruta sea correcta
import { pets } from "../models/petsModel.js"; // Importa también el modelo de mascotas
import { adopters } from "../models/adoptersModel.js"; // Importa el modelo de adoptantes


const crear = (req, res) => {

    //validar
    if (!req.body.pet_id) {
        res.status(400).send({
            mensaje: "La mascota debe existir."
        });
        return;
    }

    const dataset = {
        pet_id: req.body.pet_id,
        adopter_id: req.body.adopter_id,
        request_date: req.body.request_date || new Date(),  // Usa la fecha actual si no se proporciona
        status: req.body.status || 'Pending'

    }

    //usar sequelize para crear el recurso en la base de datos

    adoptionRequests.create(dataset).then((resultado) => {
        res.status(200).json({
            mensaje: "Registro de Solicitud de Adopción Creado con Exito"

        });


    }).catch((err) => {
        res.status(500).json({
            mensaje: `Registro de Solicitud de Adopción No Creado ::: ${err}`
        });

    });


}



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


        adoptionRequests.update({ pet_id , adopter_id, request_date, status },
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
