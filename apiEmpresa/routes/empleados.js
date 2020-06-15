const router = require('express').Router();
const moment = require('moment');
const { check, validationResult } = require('express-validator');

const Empleado = require('../models/empleado');


router.get('/', async (req, res) => {
    try {
        const rows = await Empleado.getAll();
        for (row of rows) {
            row.fecha_nacimiento = moment(row.fecha_nacimiento).format('YYYY/MM/DD');
            row.fecha_incorporacion = moment(row.fecha_incorporacion).format('YYYY/MM/DD');
        }
        res.render('empleados/index', { empleados: rows });
    } catch (err) {
        res.send(err);
    };

});
router.get('/crear', (req, res) => {
    res.render('empleados/formCrear');
});

router.get('/editar/:idEmpleado', async (req, res) => {
    try {
        const empleado = await Empleado.getById(req.params.idEmpleado);
        empleado.fecha_nacimiento = moment(empleado.fecha_nacimiento).format('YYYY/MM/DD');
        res.render('empleados/formEditar', { empleado });
    } catch (err) {
        res.send(err);
    }
});
router.get('/borrar/:idEmpleado', async (req, res) => {
    Empleado.deleteById(req.params.idEmpleado)
        .then(result => {
            res.redirect('/empleados')
        })
        .catch(err => {
            res.send(err);
        });
})




// Peticiones al servidor

//Peticion al hacer submit en el formulario de creacion de empleado
router.post('/crear', [
    check('nombre').notEmpty(),
    check('dni', 'El DNI es obligatorio y debe tener un formato válido').exists().matches(/^[0-9]{8}[ABCDEFGHJKLMNPQRSTVWXYZ]$/, "i"),
    check('sexo').notEmpty(),
    check('fecha_nacimiento').notEmpty(),
    check('salario').notEmpty(),
    check('cargo').notEmpty(),
    check('departamento').notEmpty()

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/empleados/crear');
    }
    try {
        const result = await Empleado.crear(req.body)
        res.redirect('/empleados');
        

    } catch (err) {
        res.send(err);
    }
})

router.post('/editar', async (req, res) => {
    try {
        const result = await Empleado.editarById(req.body.idEmpleado, req.body);
        res.redirect('/empleados');
    } catch (err) {
        res.send(err)
    }
});
module.exports = router;