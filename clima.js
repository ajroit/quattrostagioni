// Obtener el clima actual de Nápoles, Italia
fetch('https://api.weatherapi.com/v1/current.json?key=175ad592a329422ea3b174858232405&q=Naples&lang=es')
  .then(response => response.json())
  .then(data => {
    const weather = data.current;
    const temperature = weather.temp_c;
    const condition = weather.condition.text;

    // Mostrar la información en el div con el id "climaNaples"
    const climaNaplesDiv = document.getElementById('climaNaples');
    climaNaplesDiv.textContent = `Nápoles, Italia: ${temperature}°C, ${condition}`;
  })
  .catch(error => {
    console.log('Error al obtener el clima de Nápoles:', error);
  });

// Obtener el clima actual de Buenos Aires, Argentina
fetch('https://api.weatherapi.com/v1/current.json?key=175ad592a329422ea3b174858232405&q=Buenos%20Aires&lang=es')
  .then(response => response.json())
  .then(data => {
    const weather = data.current;
    const temperature = weather.temp_c;
    const condition = weather.condition.text;

    // Mostrar la información en el div con el id "climaBuenosAires"
    const climaBuenosAiresDiv = document.getElementById('climaBuenosAires');
    climaBuenosAiresDiv.textContent = `Buenos Aires, Argentina: ${temperature}°C, ${condition}`;
  })
  .catch(error => {
    console.log('Error al obtener el clima de Buenos Aires:', error);
  });
