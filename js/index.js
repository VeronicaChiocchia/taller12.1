const movieCatalog = "https://japceibal.github.io/japflix_api/movies-data.json";
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const listaUl = document.getElementById("lista");
let listItems = document.querySelectorAll('li');
let movieList = [];

function getJSONData() {
  fetch(movieCatalog)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error de la red: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      movieList.push(...data);
      console.log(movieList);
    })
    .catch((error) => {
      console.error("El fetch salió mal:", error);
    });
}

document.addEventListener("DOMContentLoaded", getJSONData);

function cleanList() {
  listaUl.innerHTML = "";
}

function createListItem(item) {
  const newItem = document.createElement("li");
  newItem.classList.add(
    "list-group-item",
    "list-group-item-action",
    "bg-dark",
    "list-item",
    "text-light"
  );

  newItem.setAttribute('data-bs-toggle', 'offcanvas'); 
  newItem.setAttribute('data-bs-target', '#offcanvasTop'); 
  newItem.setAttribute('aria-controls', 'offcanvasTop');

  let HTMLtoAppend = `
            <div class="col">
              <div class="col">
                <div class="col movie-title">${item.title}</div>
                <div class="col movie-overview">${item.tagline}</div>
              </div>
            </div>
          `;

  const listElement = listaUl.appendChild(newItem);
  listElement.innerHTML = HTMLtoAppend;

  const starRating = item.vote_average / 2;
  const starsContainer = document.createElement("div");
  starsContainer.classList.add("stars-container", "star-rating");
  newItem.appendChild(starsContainer);
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.className = i <= starRating ? "fas fa-star" : "far fa-star"; // Solid star or outlined star
    starsContainer.appendChild(star);
  }

  newItem.addEventListener('click', function() {
    let offCanvasTitle = document.getElementById('offcanvasTopLabel');
    let offcanvasOverview = document.getElementById('offcanvasOverview');
    let offcanvasGenres = document.getElementById('offcanvasGenres');
    offCanvasTitle.innerText = item.title;
    offcanvasOverview.innerText = item.overview;
    console.log(item.genres);
    let genres = "";
    for (let genre of item.genres) {
      genres += genre;
    }
    console.log(genres);
    
  });

}

btnBuscar.addEventListener("click", () => {
  cleanList();
  const inputValue = inputBuscar.value;

  // Usamos una regular expresion para hacer la comparación del valor ingresado con la info de la base de datos
  const regex = new RegExp(inputValue, "i"); // 'i' para que no tome mayúsculas o minúsculas

  // Corroboramos si hay coincidencia:

  for (let item of movieList) {
    if (regex.test(item.title) || regex.test(item.genres) || regex.test(item.tagline) || regex.test(item.overview)) {
      createListItem(item);
    }
  }
});

listItems.forEach(function(item) {
  // Add an event listener to each <li>
  item.addEventListener('click', function() {
    let offCanvasTitle = document.getElementById('offcanvasTopLabel');
    console.log(item);
    // item.setAttribute('data-bs-toggle', 'offcanvas'); 
    // item.setAttribute('data-bs-target', '#offcanvasTop'); 
    // item.setAttribute('aria-controls', 'offcanvasTop');
      alert('You clicked on: ' + item.textContent);
  });
});