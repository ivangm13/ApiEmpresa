const router = require('express').Router();

const Empleado = require('../../models/empleado');


router.get('/', (req, res) => {
    console.log(req.payload.empleadoId);
    Empleado.getAll()
        .then((rows) => {
            res.json(rows);
        })
        .catch(err => {
            res.json({ error: err.message });
        })
});
module.exports = router;