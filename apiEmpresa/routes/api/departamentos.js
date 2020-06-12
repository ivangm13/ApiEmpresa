const router = require('express').Router();

const Departamento = require('../../models/departamento');

router.get('/',(req,res)=>{
    Departamento.getAll()
    .then(rows=>{
        res.json(rows)
    })
    .catch(err=>{
        res.json({error: 'No se han podido recuperar los departamentos'})
    })
})
module.exports = router;