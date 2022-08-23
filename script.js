const Dom = {
  body:document.querySelector('body'), 
  searchDisplay:document.querySelector('.searchDisplay'), 
  searchBar:document.querySelector('#searchBar'), 
  search:document.querySelector('.find'), 
  closeIcon:document.querySelector('.closeIcon'), 
  cityName:document.querySelector('.cityName'), 
  searchIcon:document.querySelector('.searchIcon'), 
  err:document.querySelector('.err'), 
  temp:document.querySelector('.temp'),
  condition:document.querySelector('.condition'),
  min:document.querySelector('.min'),
  max:document.querySelector('.max'),
  feels:document.querySelector('.feels'),
  flag:document.querySelector('.flag'),
  wind:document.querySelector('.wind'),
  humidity:document.querySelector('.humidity'),
  visibility:document.querySelector('.visibility'),
  pressure:document.querySelector('.pressure'),
  longitude:document.querySelector('.longitude'),
  latitude:document.querySelector('.latitude'),
  icon:document.querySelector('.icon'),
  day:document.querySelector('.day'), 
  date:document.querySelector('.dayNum'),
  month:document.querySelector('.month'), 
  year:document.querySelector('.year'), 
  header:document.querySelector('header'), 
  main:document.querySelector('main'), 
  footer:document.querySelector('footer')
}
//gets current date
let currDate = new Date();
//gets users current location 
let locationUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=536e61190da2441882176a5cd1d55d4c`;
let searched = false;
//fetches the data in json format 
function getData(url, fn) {
  fetch(url)
  .then(response => response.json())
  .then(data => fn(data))
  .catch(err => console.log(err));
}
//renders data on page
function process(data) {
  if (data.cod == 404 && searched) {
    showErr(data);
    return;
  }
  let {name, visibility} = data;
  let {lat, lon} = data.coord;
  let {humidity, pressure, temp, temp_max, temp_min, feels_like} = data.main;
  let {speed} = data.wind;
  let {description, main, icon} = data.weather[0];
  let {country} = data.sys;
  let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
  let flagUrl = `https://countryflagsapi.com/svg/${country}`;
  Dom.body.style.background = `url(Images/${main}.jpg)`;
  Dom.body.style.backgroundSize = '100%';
  Dom.cityName.textContent = `${name}, ${country}`;
  Dom.temp.textContent = `${temp}°`
  Dom.condition.textContent = description;
  Dom.icon.setAttribute('src', iconUrl);
  Dom.flag.setAttribute('src', flagUrl);
  Dom.min.textContent = `${temp_min}°`;
  Dom.max.textContent = `${temp_max}°`;
  Dom.feels.textContent = `${feels_like}°`;
  Dom.wind.textContent = `${speed}m/s`;
  Dom.humidity.textContent = `${humidity}%`
  Dom.visibility.textContent = `${visibility}°`
  Dom.pressure.textContent = `${pressure}hPa`
  Dom.longitude.textContent = lon;
  Dom.latitude.textContent = lat;
  Dom.err.style.display = 'none';
  Dom.day.textContent = `${Date().slice(0,3)}`;
  Dom.date.textContent = currDate.getDate();
  Dom.month.textContent = `${Date().slice(4,8)},`;
  Dom.year.textContent = currDate.getFullYear();
}
//gets weather data from current location
function locate(data) {
  let {country_name} = data;
  let city = country_name;
  let WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ad70d2e2623f3a95153e15a1d6d6dd4c`;
  getData(WeatherUrl, process);
}
function displaySearchBar() {
  Dom.searchIcon.style.display = 'none';
  Dom.searchDisplay.style.display = 'flex';
  Dom.closeIcon.style.display = 'flex';
}
function hideSearchBar() {
  Dom.searchIcon.style.display = 'grid';
  Dom.searchDisplay.style.display = 'none';
  Dom.closeIcon.style.display = 'none';
}
function getUserInputs() {
  city = Dom.searchBar.value.trim();
  WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e2a447e89fd85656259b7ee81f1fa5dd`;
  getData(WeatherUrl, process);
}
//searches for weather data for city entered by user
function findCity() {
  if (searchBar.value. length > 1) {
    searched = true;
    getUserInputs();
  } else {
    Dom.err.style.display = 'block';
    Dom.err.textContent = 'Enter a city' ;
    Dom.searchBar.classList.add('error');
  }
}
//displays error if city wasn't found 
function showErr(error) {
  Dom.err.style.display = 'block';
  Dom.err.textContent = error.message;
}
//ends searchbar validation when user enters a city
Dom.searchBar.addEventListener('keyup', () => {
  if (Dom.searchBar.value.length > 1) {
    searched = false;
    getUserInputs();
    Dom.err.style.display = 'none';
    Dom.searchBar.classList.remove('error');
  }
})
Dom.searchIcon.addEventListener('click', displaySearchBar);
Dom.closeIcon.addEventListener('click', hideSearchBar);
Dom.search.addEventListener('click', findCity) 
addEventListener('load', () => {
  Dom.footer.style.height = `${innerHeight - (Dom.main.clientHeight + Dom.header.clientHeight)}px`
  getData(locationUrl, locate);
})
/*

Author:Diamond-Ali;

*/
