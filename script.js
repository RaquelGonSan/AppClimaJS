let apiKey = "bc88448c55c01f1ba520bb1d2731a1f8";
let baseUrl = "https://api.openweathermap.org/data/2.5/weather";
//let city = "Segovia";

let difKelvin = 275.15;

document.getElementById("botonBusqueda").addEventListener("click", async () => {
  const city = document.getElementById("ciudadEntrada").value;
  if (city) {
    await fetchDatosClima(city);
  }
});

async function fetchDatosClima(city) {
  fetch(`${baseUrl}?q=${city}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((response) => mostrarDatosClima(response));

    try {
      const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}`);
      const data = await response.json();
      mostrarDatosClima(data);
    } catch (error) {
      console.error("Hubo un error al obtener los datos del clima:", error);
      alert('Hubo un error al obtener los datos del clima');
    }
}


function mostrarDatosClima(response){
    const titulo = document.getElementById('titulo');
    const informacion = document.getElementById('informacion');

    try{
    const cityName = response.name;
    const temp = response.main.temp;
    const description = response.weather[0].description;
    const humidity = response.main.humidity;

    if(!cityName || !temp || !description || !humidity){
      throw new Error('Error al obtener los datos del clima');
    }

    const title = document.createElement('h2');
    title.textContent = cityName;

    const subtitle = document.createElement('p');
    subtitle.textContent = `La temperatura es de ${Math.floor(temp-difKelvin)}ºC`;

    const txt = document.createElement('p');
    txt.textContent = description;

    const txtH = document.createElement('p');
    txtH.textContent = `Humedad: ${humidity}%`;

    titulo.appendChild(title);
    informacion.appendChild(subtitle);
    informacion.appendChild(txtH);
    informacion.appendChild(txt);

  }catch(error){
    console.error('Hubo un error al obtener los datos del clima:', error);
  }
    
}
