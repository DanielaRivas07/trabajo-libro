const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');




searchButton.addEventListener('click', searchBooks);

async function searchBooks() {
    const searchTerm = searchInput.value;
    try {
        const response = await fetch(`/search?q=${searchTerm}`);
        const books = await response.json();
        displayResults(books);
    } catch (error) {
        console.error('Error fetching books', error);
    }
}



function displayResults(books) {
    resultsContainer.innerHTML = '';
    books.forEach(book => {
        const { title, authors, description, image } = book;
        const bookElement = `
            <div class="book">
            <div class= "centrado">
                <img src="${image}" alt="${title}">
                <div class= "ta">
                <h3>${title}</h3>
                <p class= "pp"><strong>Autor(es):</strong> ${authors}</p>
                </div>
            </div>
                <div class= "des">
                <p>${description}</p>
                </div>
                
                <button class="favorite">
                favoritos
                </button>
                

            </div>
        `;
        resultsContainer.innerHTML += bookElement;
    });
}



