

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    getAll
}