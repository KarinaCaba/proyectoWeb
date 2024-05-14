const db = require ('../database/db');

exports.save = (req,res)=>{
    const isbn = req.body.isbn;
    const nombre = req.body.nombre;
    const autor = req.body.autor;
    const ano = req.body.ano;
    const leido = req.body.leido === 'true'; // Convierte la cadena de texto en un valor booleano
    const favorito = req.body.favorito === 'true'; // Convierte la cadena de texto en un valor booleano
    const nota = req.body.nota;

    db.run('INSERT INTO libros (isbn, nombreLibro, autor, anoPublicacion, leido, favorito, notaAdicional) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [isbn, nombre, autor, ano, leido, favorito, nota],
    (error) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    });
 
    //console.log(isbn +" - "+nombre+" - "+autor+" - "+ano+" - "+leido+" - "+favorito+" - "+nota);
}

exports.update = (req,res)=>{
    const id = req.body.id;
    const isbn = req.body.isbn;
    const nombre = req.body.nombre;
    const autor = req.body.autor;
    const ano = req.body.ano;
    const leido = req.body.leido === 'true'; // Convierte la cadena de texto en un valor booleano
    const favorito = req.body.favorito === 'true'; // Convierte la cadena de texto en un valor booleano
    const nota = req.body.nota;

    
    db.run('UPDATE libros SET isbn = ?, nombreLibro = ?, autor = ?, anoPublicacion = ?, leido = ?, favorito = ?, notaAdicional = ? WHERE id = ?',
    [isbn, nombre, autor, ano, leido, favorito, nota, id],
    (error) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    });


}