const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamentos', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}
const getById = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamentos where id = ?', [pDepartamentoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) reject('El id no existe');
            resolve(rows[0]);
        })
    });
}
const crear = ({ nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into departamentos (nombre,ciudad) values (?,?)',
            [nombre, ciudad],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    });
}
const eliminarById = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from departamentos where id = ?', [pDepartamentoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}
const editarById = (pDepartamentoId, { nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('update departamentos set nombre = ?, ciudad = ? where id = ?',
            [nombre, ciudad, pDepartamentoId],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    })
}
module.exports = {
    getAll,
    getById,
    crear,
    eliminarById,
    editarById
}