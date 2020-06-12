const router = require('express').Router();

const Departamento = require('../../models/departamento');

router.get('/', (req, res) => {
    Departamento.getAll()
        .then(rows => {
            res.json(rows)
        })
        .catch(err => {
            res.json({ error: 'No se han podido recuperar los departamentos' })
        })
});

router.delete('/:idDepartamento', async (req, res) => {
    const result = await Departamento.eliminarById(req.params.idDepartamento);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Departamento eliminado con éxito' });
    } else {
        res.json({ error: 'No se ha podido eliminar el departamento. Verificar id' })

    }
});

router.post('/', async (req,res)=>{
    try{
        const result = await Departamento.crear(req.body);
        res.json({success: 'Departamento creado con éxito'})
    }catch(err){
        res.json({error:'No se ha podido crear el departamento. Verifica los datos introducidos'})
    }
})

router.put('/:idDepartamento',async(req,res)=>{
    try{
        const result = Departamento.editarById(req.params.idDepartamento,req.body);
        res.json({success: 'Departamento modificado con éxito'})
    }catch(err){
        res.json({error: 'No se ha podido modificar el departamento. Verifica los datos introducidos'})
    }
})
module.exports = router;