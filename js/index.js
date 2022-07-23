const form = document.querySelector('.form');
const input_cidade = document.querySelector('.input_cidade');
const cidade = document.querySelector('.cidade');
const temperatura = document.querySelector('.temperatura');
const descricao = document.querySelector('.descricao');
const icone_clima = document.querySelector('.icone_clima');
const container = document.querySelector('.container');
const imagem_cidade = document.querySelector('.imagem-cidade');
const clima = document.querySelector('.clima');
const loader = document.querySelector('.loader');
const div_descricao = document.querySelector('.div_descricao');

const startLoading = () => {
    clima.style.visibility = 'hidden';
    div_descricao.style.visibility = 'hidden';
    loader.style.visibility = 'visible';
}

const stopLoading = () => {
    loader.style.visibility = 'hidden';
    clima.style.visibility = 'visible';   
    
    clima.classList.add('fadeIn');

    setTimeout(() => {
        clima.classList.remove('fadeIn');
    }, 500);
}

const showWeather = (hasImage) => {    
    imagem_cidade.style.visibility = hasImage? 'visible' : 'hidden';    
    div_descricao.style.visibility = 'visible';
    stopLoading();
}

const updateWeatherData = (data) => {
    if (data) {
        cidade.innerHTML = data.name.trim();
        temperatura.innerHTML = data.main.temp.toString().substring(0, 4);
        descricao.innerHTML = data.weather[0].description;
        icone_clima.src = getIconURL(data.weather[0].icon);
    }
    else {
        cidade.innerHTML = 'City not found';
        temperatura.innerHTML = '0';
        descricao.innerHTML = '';
        div_descricao.style.visibility = 'hidden';
        imagem_cidade.style.visibility = 'hidden'; 
        stopLoading();
    }    
}

const fetchCityImage = (city) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '76b274926fmsh3318624322238f5p1caa7ajsna22702f317d5',
            'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
        }
    };
    
    fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${encodeURI(city + ' tourism')}&count=1`, options)
    .then((response) => {
        return response.json()
    })
    .then((response) => { 
        imagem_cidade.src = response.value[0].contentUrl;

        setTimeout(() => {            
            showWeather(true);      
        }, 500);        
    })
    .catch((err) => {
        console.error(err)
        showWeather(false);      
    });
}

const getIconURL = (code) => {
    return `http://openweathermap.org/img/w/${code}.png`;
}

const fetchWeatherData = (event) => {
    event.preventDefault();

    startLoading();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '76b274926fmsh3318624322238f5p1caa7ajsna22702f317d5',
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
    };

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${encodeURI(input_cidade.value)}&units=metric`, options)
    .then((response) => {
        return response.json()
    })
    .then((response) => {
        if (response.cod === 200) {
            updateWeatherData(response);
            fetchCityImage(response.name);
        }
        else {
            updateWeatherData(null);            
        }  
    })
    .catch((err) => {
        console.error(err);
        updateWeatherData(null); 
    });

    input_cidade.value = '';
}

form.addEventListener('submit', fetchWeatherData);
input_cidade.focus();