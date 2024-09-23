const movieCatalog = 'https://japceibal.github.io/japflix_api/movies-data.json';
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const listaUl = document.getElementById('lista');
let movieList = [];

function getJSONData() {
    fetch(movieCatalog)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error de la red: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // console.log(data[0].budget); // Logs the data received from the API;
    movieList.push(...data);
    console.log(movieList);
  })
  .catch(error => {
    console.error('El fetch salió mal:', error);
  });
}

document.addEventListener("DOMContentLoaded", getJSONData);

function creatListItem(item) {
    let HTMLtoAppend = `
    <div class="list-group-item list-group-item-action">Dapibus ac facilisis in</div>`

}

btnBuscar.addEventListener('click', () => {
    const inputValue = inputBuscar.value; 
    
    // Usamos una regular expresion para hacer la comparación del valor ingresado con la info de la base de datos
    const regex = new RegExp(inputValue, 'i'); // 'i' para que no tome mayúsculas o minúsculas
    
    // Corroboramos si hay coincidencia:

    for (let item of movieList) {
        if (regex.test(item.title)) {
            console.log('El título sí está:' + item.title)
        }
        
    }
    // const isMatch = myArray.some(item => regex.test(item));
    
    // if (isMatch) {
    //   resultDiv.textContent = `The value "${inputValue}" is in the array.`;
    // } else {
    //   resultDiv.textContent = `The value "${inputValue}" is not in the array.`;
    // }
  });