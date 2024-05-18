const express = require('express');
const router = express.Router();
const db = require('./database/db'); // Importa el módulo de la base de datos
const { getAllBooks, searchBooks } = require('./controllers/books');

// Ruta para mostrar la lista de libros
router.get('/', (req, res) => {
  
     db.all('SELECT * FROM libros',(error,results)=>
{
    if(error){
        throw error;
    }else{
        res.render('index', {results:results});
    }
}) 
    
});

// Ruta para la búsqueda en tiempo real
router.get('/search', (req, res) => {
    const query = req.query.q || '';
    if (query) {
        db.all('SELECT * FROM libros WHERE nombreLibro LIKE ? OR autor LIKE ? OR ISBN LIKE ?', [`%${query}%`, `%${query}%`, `%${query}%`], (err, results) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(results);
            }
        });
    } else {
        db.all('SELECT * FROM libros', (err, results) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(results);
            }
        });
    }
});

//Ruta para crear registros 
router.get('/create',(req,res)=>
{
    res.render('create');
})

//Ruta para editar registros

router.get('/edit/:id',(req,res)=>
{
    
    const id = req.params.id;
    console.log('ID capturado de la URL:', id);

    db.get('SELECT * FROM libros WHERE id=?',[id], (error,result)=>
{
    if(error){
        throw error;
    }else {
        console.log(result);
    
        res.render('edit.ejs', { libro : result }); // Pasamos el objeto libro a la vista
     
    }
}) 
})

// Ruta para eliminar registro
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    // Renderizar la plantilla de confirmación de eliminación
    res.render('delete', { id: id });
});

// Ruta para procesar la confirmación de eliminación
router.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const confirmation = req.body.confirmation;

    if (confirmation === 'yes') {
        // Si la confirmación es sí, eliminar el registro
        db.run('DELETE FROM libros WHERE id = ?', [id], (error, result) => {
            if (error) {
                throw error;
            } else {
                res.redirect('/');
            }
        });
    } else {
        // Si la confirmación es no, redirigir de nuevo a la página principal
        res.redirect('/');
    }
});



const crud = require ('./controllers/crud');
router.post('/save',crud.save);
router.post('/update',crud.update)

module.exports = router;
