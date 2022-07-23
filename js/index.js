const form = document.querySelector('.form');
const input_cidade = document.querySelector('.input_cidade');
const cidade = document.querySelector('.cidade');
const temperatura = document.querySelector('.temperatura');
const descricao = document.querySelector('.descricao');
const icone_clima = document.querySelector('.icone_clima');
const container = document.querySelector('.container');
const imagem_cidade = document.querySelector('.imagem-cidade');

const fetchCityImage = (city) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '76b274926fmsh3318624322238f5p1caa7ajsna22702f317d5',
            'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
        }
    };
    
    fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${city}&count=1`, options)
    .then((response) => {
        return response.json()
    })
    .then((response) => {
        console.log(container.style['background-color'])

        container.style['background-color'] = '';        

        imagem_cidade.src = response.value[0].contentUrl;
        imagem_cidade.style.visibility = 'visible';
    })
    .catch((err) => {
        console.error(err)
        imagem_cidade.style.visibility = 'hidden';
    });
}

const getIconURL = (code) => {
    return `http://openweathermap.org/img/w/${code}.png`;
}

const fetchWeatherData = (event) => {
    event.preventDefault();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '76b274926fmsh3318624322238f5p1caa7ajsna22702f317d5',
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
    };

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${input_cidade.value}&units=metric`, options)
    .then((response) => {
        return response.json()
    })
    .then((response) => {
        console.log(response)

        if (response.cod === 200) {
            cidade.innerHTML = response.name
            temperatura.innerHTML = response.main.temp.toString().substring(0, 4);
            descricao.innerHTML = response.weather[0].description;
            icone_clima.style.visibility = 'visible';
            icone_clima.src = getIconURL(response.weather[0].icon);

            fetchCityImage(response.name);
        }
        else {
            cidade.innerHTML = 'City not found'
            temperatura.innerHTML = '0';
            descricao.innerHTML = '';
            icone_clima.style.visibility = 'hidden';
        }  
    })
    .catch((err) => {
        console.error(err)
    });

    input_cidade.value = '';
}

form.addEventListener('submit', fetchWeatherData);