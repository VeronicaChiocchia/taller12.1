const movieCatalog = 'https://japceibal.github.io/japflix_api/movies-data.json'

function getJSONData() {
    fetch(movieCatalog)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error de la red: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Logs the data received from the API
  })
  .catch(error => {
    console.error('El fetch salió mal:', error);
  });
}