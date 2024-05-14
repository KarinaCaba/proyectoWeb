const sqlite3 = require('sqlite3').verbose();


// Abre una conexión a la base de datos
let db = new sqlite3.Database('./mydb.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Conexión a la base de datos SQLite establecida');

    // Crea la tabla 'libros' con los campos especificados
    let query = "CREATE TABLE IF NOT EXISTS libros \
        ( id INTEGER PRIMARY KEY AUTOINCREMENT,\
        ISBN TEXT,\
        nombreLibro TEXT,\
        autor TEXT,\
        anoPublicacion INTEGER,\
        leido BOOLEAN,\
        favorito BOOLEAN,\
        notaAdicional TEXT CHECK(length(notaAdicional) <= 200));"

    db.run(query, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Tabla creada');
            /*
             db.run("INSERT INTO libros (ISBN, nombreLibro, autor, anoPublicacion, leido, favorito, notaAdicional) VALUES (?, ?, ?, ?, ?, ?, ?)",
                ['', 'Divergent', 'Veronica Roth', 2011, false, false, 'No me gusto la prota'],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                    console.log('Libro insertado correctamente');
                });*/
                    /*
                db.run("INSERT INTO libros (ISBN, nombreLibro, autor, anoPublicacion, leido, favorito, notaAdicional) VALUES (?, ?, ?, ?, ?, ?, ?)",
                ['1234567890123', 'El Señor de los Anillos', 'J.R.R. Tolkien', 1954, true, true, 'Una gran saga de fantasía'],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                    console.log('Libro insertado correctamente');
                }); */
        }
    });
});

module.exports = db;
