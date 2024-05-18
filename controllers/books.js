const books = require ('../database/db');

function searchBooks(query) {
    return new Promise((resolve, reject) => {
        const results = books.filter(book => 
            book.nombreLibro.toLowerCase().includes(query.toLowerCase()) ||
            book.autor.toLowerCase().includes(query.toLowerCase()) ||
            book.ISBN.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
    });
}

function getAllBooks() {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
}

module.exports = {
    searchBooks,
    getAllBooks
};