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
    check('nombre', 'El nombre es obligatorio.').exists(),
    check('dni', 'El DNI es obligatorio y debe tener un formato válido').exists().matches(/^[0-9]{8}[ABCDEFGHJKLMNPQRSTVWXYZ]$/, "i"),
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria y debe ser en formato YYYY-MM-DD').exists(),
    check('salario', 'El salario es obligatorio').exists(),
    check('cargo', 'El cargo es obligatorio').exists(),
    check('departamento', 'El departamento es obligatorio y debe ser una Foreing Key válida').exists(),
    check('jefe_id', 'el jefe es obligatorio. Si no tiene jefe asignado, introducir "null"').exists()
], async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.json(errores.array());
    }
    try {
        const result = await Empleado.crear(req.body);
        res.json({ success: 'Se ha creado un empleado con éxito' });
    } catch (err) {
        res.json({ error: 'Ha ocurrido un error' })
    }

});

//DELETE http://localhost:3000/api/empleados/:idEmpleado
//Elimina un empleado de la bbdd
router.delete('/:idEmpleado', async (req, res) => {
    const result = await Empleado.deleteById(req.params.idEmpleado);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha eliminado correctamente el empleado' })

    } else {
        res.json({ error: 'No se ha podido eliminar el empleado. Revisar los datos' })

    }

});
//PUT http://localhost:3000/api/empleados/:idEmpleado
router.put('/:idEmpleado', async (req, res) => {
    const result = await Empleado.editarById(req.params.idEmpleado,req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha actualizado correctamente el empleado' })
    } else {
        res.json({ error: 'No se ha podido actualizar el empleado. Revisar los datos introducidos' })
    }
})
module.exports = router;