


const getAll = () => {
    return new Promise((resolve, reject) => { 
        db.query('select * from empleados', (err, rows) => {    
            if (err) reject(err);
            resolve(rows);
        });
    });
}

 const crear = ({ nombre, dni, sexo, fecha_nacimiento, fecha_incorporación=0, salario, cargo, departamento, jefe_id }) => {
    return new Promise((resolve, reject) => {
        
        db.query('insert into empleados (nombre,dni,sexo,fecha_nacimiento,fecha_incorporacion,salario,cargo,fk_departamento,jefe_id) values (?,?,?,?,?,?,?,?,?)',
            [nombre, dni, sexo, fecha_nacimiento, new Date(), salario, cargo, departamento, jefe_id],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    });
}
const getById=(pIdEmpleado)=>{
    return new Promise((resolve,reject)=>{
        db.query('select * from empleados where id = ?',[pIdEmpleado],(err,rows)=>{
            if(err) reject(err);
            if(rows.length !==1) reject('El id no existe');
            resolve(rows[0]);
        })
    });
}

const deleteById = (pIdEmpleado) => {
    return new Promise((resolve, reject) => {
        db.query('delete from empleados where id = ?', [pIdEmpleado], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
} 
const editarById = (pIdEmpleado, { nombre, dni, sexo, fecha_nacimiento, salario, cargo, fk_departamento, jefe_id}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update empleados set nombre =?, dni = ?, sexo = ?, fecha_nacimiento = ?, salario = ?, cargo = ?,fk_departamento = ?, jefe_id = ? where id = ?',
            [nombre, dni, sexo, fecha_nacimiento, salario, cargo, fk_departamento,jefe_id,  pIdEmpleado],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
}
module.exports = {
    getAll,
     crear,
    getById,
    deleteById,
    editarById

}