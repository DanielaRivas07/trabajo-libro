const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3055;

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta para manejar la solicitud de búsqueda de libros
app.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        const books = response.data.items.map(book => ({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconocido',
            description: book.volumeInfo.description ? book.volumeInfo.description : 'No hay descripción disponible',
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
        }));
        res.json(books);
    } catch (error) {
        console.error('Error fetching books', error);
        res.status(500).json({ error: 'Error fetching books' });
    }
});



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor `);
});

