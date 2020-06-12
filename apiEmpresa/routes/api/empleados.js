const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Empleado = require('../../models/empleado');

//GET http://localhost:3000/api/empleados
//Recuperar todos los empleados

router.get('/', (req, res) => {
    Empleado.getAll()
        .then((rows) => {
            res.json(rows);
        })
        .catch(err => {
            res.json({ error: err.message });
        })
});

//POST http://localhost:3000/api/empleados
//Crear empleado

router.post('/', [
    check('')
], async (req, res) => {
    try {
        const result = await Empleado.crear(req.body);
        res.json({ success: 'Se ha creado un empleado con éxito' });
    } catch (err) {
        res.json({ error: 'Ha ocurrido un error' })
    }

});
module.exports = router;