const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamentos', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}
const crear = ({ nombre, ciudad}) => {
    return new Promise((resolve, reject) => {
        db.query('insert into departamentos (nombre,ciudad) values (?,?)',
            [nombre, ciudad],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    });
}
module.exports = {
    getAll,
    crear
}