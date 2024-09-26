const movieCatalog = "https://japceibal.github.io/japflix_api/movies-data.json";
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const listaUl = document.getElementById("lista");
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
      // console.log(data[0].budget); // Logs the data received from the API;
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

function creatListItem(item) {
  const newItem = document.createElement("div");
  // const starRating = item.vote_average/2;
  let HTMLtoAppend = `
    <li class="list-group-item list-group-item-action">
            <div class="container row">
              <div class="col">
                <div class="col movie-title">${item.title}</div>
                <div class="col movie-overview">${item.overview}</div>
              </div>
              <div class="col-auto star-rating">
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </div>
            </div>
          </li>`;
  const listElement = listaUl.appendChild(newItem);
  listElement.innerHTML = HTMLtoAppend;
  // const stars = document.getElementsByClassName('star-rating')[0].children;
  // const starsArray = Array.from(stars);
  // for (let star of starsArray) {
  //   if (starsArray.indexOf(star) <= starRating - 1) {
  //     star.classList.toggle("checked");
  //   }
  // }
}

function setStarRating(item) {
  let stars = document.getElementsByClassName('star-rating')[0].children;
  const starsArray = Array.from(stars);
  const starRating = item.vote_average/2;
  for (let star of starsArray) {
    if (starsArray.indexOf(star) <= starRating - 1) {
      star.classList.add('checked');
    } else {
      star.classList.remove('checked');
    }
  }
}

btnBuscar.addEventListener("click", () => {
  cleanList();
  const inputValue = inputBuscar.value;

  // Usamos una regular expresion para hacer la comparación del valor ingresado con la info de la base de datos
  const regex = new RegExp(inputValue, "i"); // 'i' para que no tome mayúsculas o minúsculas

  // Corroboramos si hay coincidencia:

  for (let item of movieList) {
    if (regex.test(item.title)) {
      // console.log("El título sí está:" + item.title);
      creatListItem(item);
      setStarRating(item);
    }
  }
});
