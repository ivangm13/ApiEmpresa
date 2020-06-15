const router = require('express').Router();
const Departamento = require('../models/departamento');

router.get('/', (req, res) => {
    Departamento.getAll()
        .then((rows) => {
            res.render('departamentos/index', { departamentos: rows });
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/crear', (req, res) => {
    res.render('departamentos/formCrear')
})

router.get('/borrar/:idDepartamento', async (req, res) => {
    Departamento.eliminarById(req.params.idDepartamento)
        .then(result => {
            res.redirect('/departamentos')
        })
        .catch(err => {
            res.send(err);
        });
})
router.get('/editar/:idDepartamento', async (req, res) => {
    try {
        const departamento = await Departamento.getById(req.params.idDepartamento);
        res.render('departamentos/formEditar', { departamento });
    } catch (err) {
        res.send(err)
    }

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

router.post('/editar', async (req, res) => {
    try {
        const result = await Departamento.editarById(req.body.idDepartamento, req.body);
        res.redirect('/departamentos');
    } catch (err) {
        res.send(err)
    }
});
module.exports = router;