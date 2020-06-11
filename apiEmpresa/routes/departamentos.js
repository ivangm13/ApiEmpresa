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
router.get('/crear',(req,res)=>{
    res.render('departamentos/formCrear')
})


//Peticiones

router.post('/crear', async (req, res) => {
    try {
        const result = await Departamento.crear(req.body)
        res.redirect('/departamentos');
    } catch (err) {
        res.send(err);
    }
})
module.exports = router;