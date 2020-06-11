const router = require('express').Router();
const Departamento = require('../models/departamento');

router.get('/', (req, res) => {
    Departamento.getAll()
    .then((rows)=>{
      res.render('departamentos/index', {departamentos: rows});  
    })
    .catch(err=>{
        res.send(err)
    })
    
})

module.exports = router;