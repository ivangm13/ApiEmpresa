const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamentos', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    getAll
}