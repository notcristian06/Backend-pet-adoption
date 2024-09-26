import { pets } from "../models/petsModel.js";

//Funcion Crear Mascotas

const crear = (req, res) => {

    //validar
    if (!req.body.name) {
        res.status(400).send({
            mensaje: "El nombre no puede estar vacio."
        });
        return;
    }

    const dataset = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        size: req.body.size,
        description: req.body.description

    }

    //usar sequelize para crear el recurso en la base de datos

    pets.create(dataset).then((resultado) => {
        res.status(200).json({
            mensaje: "Registro de Mascota Creado con Exito"

        });


    }).catch((err) => {
        res.status(500).json({
            mensaje: `Registro de Mascota No Creado ::: ${err}`
        });

    });


}

//Funcion Buscar Mascotas
const buscar = (req, res) => {
    pets.findAll().then((resultado) => {
        res.status(200).json(resultado);

    }).catch((err) => {

        res.status(500).json({
            mensaje: `No se encontraron registros ::: ${err}`

        });

    });
}




//Funcion BuscarId Mascotas
const buscarID = (req, res) => {
    const id = req.params.id;
    if (id == null) {
        res.status(400).json({
            mensaje: "El id no puede estar vacio"
        });
        return;
    } else {

        pets.findByPk(id).then((resultado) => {
            res.status(200).json(resultado);

        }).catch((err) => {

            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`

            });

        });

    }


}




//Funcion Actualizar Mascotas

const actualizar = (req, res) => {
    const id = req.params.id
    if (!req.body.name && !req.body.species) {
        res.status(400).json({
            mensaje: "No se encontraron Datos para Actualizar."
        });
        return;
    } else {
        const name = req.body.name;
        const species = req.body.species;
        const breed = req.body.breed;
        const age = req.body.age;
        const gender = req.body.gender;
        const size = req.body.size;
        const description = req.body.description;
        pets.update({ name, species, breed, age, gender, size, description },
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

// Función Borrar mascota
const borrar = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            mensaje: "El id no puede estar vacío."
        });
        return;
    }

    pets.destroy({ where: { id } })
        .then((resultado) => {
            if (resultado === 1) {
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro de mascota eliminado con éxito."
                });
            } else {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "Mascota no encontrada."
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar registro. ::: ${err}`
            });
        });
};

export { crear, buscar, buscarID, actualizar, borrar };
