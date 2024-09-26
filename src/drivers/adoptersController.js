import { adopters } from "../models/adoptersModel.js";

//Funcion Crear Adoptantes

const crear = (req, res) => {

    //validar
    if (!req.body.first_name) {
        res.status(400).send({
            mensaje: "El nombre no puede estar vacio."
        });
        return;
    }

    const dataset = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        citizenship_card: req.body.citizenship_card,
        address: req.body.address,
        city: req.body.city

    }

    //usar sequelize para crear el recurso en la base de datos

    adopters.create(dataset).then((resultado) => {
        res.status(200).json({
            mensaje: "Registro de Adoptante Creado con Exito"

        });


    }).catch((err) => {
        res.status(500).json({
            mensaje: `Registro de Adoptante No Creado ::: ${err}`
        });

    });


}

//Funcion Buscar Adoptantes
const buscar = (req, res) => {
    adopters.findAll().then((resultado) => {
        res.status(200).json(resultado);

    }).catch((err) => {

        res.status(500).json({
            mensaje: `No se encontraron registros ::: ${err}`

        });

    });
}




//Funcion BuscarId Adoptantes
const buscarID = (req, res) => {
    const id = req.params.id;
    if (id == null) {
        res.status(400).json({
            mensaje: "El id no puede estar vacio"
        });
        return;
    } else {

        adopters.findByPk(id).then((resultado) => {
            res.status(200).json(resultado);

        }).catch((err) => {

            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`

            });

        });

    }


}



//Funcion Actualizar Adoptantes

const actualizar = (req, res) => {
    const id = req.params.id
    if (!req.body.first_name && !req.body.last_name && !req.body.email) {
        res.status(400).json({
            mensaje: "No se encontraron Datos para Actualizar."
        });
        return;
    } else {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const phone = req.body.phone;
        const citizenship_card= req.body.citizenship_card;
        const address= req.body.address;
        const city= req.body.city;


        adopters.update({ first_name, last_name, email, phone, citizenship_card, address, city},
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

// Función Borrar Adoptantes
const borrar = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            mensaje: "El id no puede estar vacío."
        });
        return;
    }

    adopters.destroy({ where: { id } })
        .then((resultado) => {
            if (resultado === 1) {
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro de Adoptante eliminado con éxito."
                });
            } else {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "Adoptante no encontrado."
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
