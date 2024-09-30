const movieCatalog = "https://japceibal.github.io/japflix_api/movies-data.json";
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const listaUl = document.getElementById("lista");
let listItems = document.querySelectorAll("li");
let movieList = [];

// Función que realiza el fetch para obtener la información de las películas:
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
    })
    .catch((error) => {
      console.error("El fetch salió mal:", error);
    });
}

// addeventlistener que realiza la petición (fetch) al cargar la página, usando la función getJSONData:
document.addEventListener("DOMContentLoaded", getJSONData);

// Función que elimina el contenido de listaUl (the ul que contiene las películas que se mestran como resultado de la búsqueda):
function cleanList() {
  listaUl.innerHTML = "";
}

// Función que crea el item de la lista (li) con la información de cada película, así como el star rating. Además, agrega el addeventlistener necesario para desplegar el offcanvas de cada item con la información correspondiente:
function createListItem(item) {
  // Creción del li:
  const newItem = document.createElement("li");
  newItem.classList.add(
    "list-group-item",
    "list-group-item-action",
    "bg-dark",
    "list-item",
    "text-light"
  );

  newItem.setAttribute("data-bs-toggle", "offcanvas");
  newItem.setAttribute("data-bs-target", "#offcanvasTop");
  newItem.setAttribute("aria-controls", "offcanvasTop");

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

  // Star rating:
  const starRating = item.vote_average / 2;
  const starsContainer = document.createElement("div");
  starsContainer.classList.add("stars-container", "star-rating");
  newItem.appendChild(starsContainer);
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.className = i <= starRating ? "fas fa-star" : "far fa-star";
    starsContainer.appendChild(star);
  }

  // Offcanvas y su contenido:
  newItem.addEventListener("click", function () {
    let offcanvas = document.getElementById("offcanvasTop");
    let offCanvasTitle = document.getElementById("offcanvasTopLabel");
    let offcanvasOverview = document.getElementById("offcanvasOverview");
    let offcanvasGenres = document.getElementById("offcanvasGenres");
    let dropdownMenu = document.getElementById("more-info");
    let dropdownButton = document.getElementById("dropdown-button");

    offCanvasTitle.innerText = item.title;
    offcanvasOverview.innerText = item.overview;
    let counter = 0;
    for (let genre of item.genres) {
      const genreSpan = document.createElement("span");
      if (counter === item.genres.length - 1) {
        genreSpan.innerHTML = `${genre.name}`;
        offcanvasGenres.appendChild(genreSpan);
      } else {
        genreSpan.innerHTML = `${genre.name} • `;
        offcanvasGenres.appendChild(genreSpan);
      }
      counter++;
    }

    // Dropdown menu:

    const rect = offcanvas.getBoundingClientRect();
    dropdownButton.style.top = `calc(${rect.height}px - 44.6px)`;
    dropdownButton.style.right = `16px`;

    const releaseDate = item.release_date;
    const year = releaseDate.split("-")[0];
    let dropdownMenuContent = `
      <li class="dropdown-item-text d-flex justify-content-between">
          <span class="me-2">Year:</span>
          <span>${year}</span>
      </li>
      <li class="dropdown-item-text d-flex justify-content-between">
          <span class="me-2">Runtime:</span>
          <span>${item.runtime} min</span>
      </li>
      <li class="dropdown-item-text d-flex justify-content-between">
          <span class="me-2">Budget:</span>
          <span>$${item.budget}</span>
      </li>
      <li class="dropdown-item-text d-flex justify-content-between">
          <span class="me-2">Revenue:</span>
          <span>$${item.revenue}</span>
      </li>`;

    dropdownMenu.innerHTML = dropdownMenuContent;
  });
}

btnBuscar.addEventListener("click", () => {
  cleanList();
  const inputValue = inputBuscar.value;

  // Usamos una regular expresion para hacer la comparación del valor ingresado con la info de la base de datos
  const regex = new RegExp(inputValue, "i"); // 'i' para que no tome mayúsculas o minúsculas

  // Corroboramos si hay coincidencia:

  for (let item of movieList) {
    if (
      regex.test(item.title) ||
      regex.test(item.genres) ||
      regex.test(item.tagline) ||
      regex.test(item.overview)
    ) {
      createListItem(item);
    }
  }
});

