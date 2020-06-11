const router = require('express').Router();

const Empleado = require('../models/empleado');

router.get('/',(req,res)=>{
    Empleado.getAll()
    .then(rows=>{
        console.log(rows);
        res.render('empleados/index2.html',{empleados: rows});
    })
    .catch(err=>{
        res.send(err);
    });
})

module.exports = router;