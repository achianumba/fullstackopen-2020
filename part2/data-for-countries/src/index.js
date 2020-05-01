import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from 'axios';
/*
=====================
Countries data app
=====================
*/
const App = () => {
  let [searchQuery, setSearchQuery] = useState('');
  let [countries, setCountries] = useState([]);
  let [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(res => setCountries(res.data))
  },[]);

  useEffect(() => {
    let country = countries.filter(country => new RegExp(`^${searchQuery}`, 'i').test(country.name)).map(country => country);

    if (country.length === 1) {
      country = country[0]
      
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`)
      .then(res => setWeather(res.data));
    }
  }, [searchQuery]);

  const showCountryDetail = e => {
    e.preventDefault();

    if (e.target.className === 'show-country') {
      let country = e.target.closest('p').childNodes[0].data
      setSearchQuery(country)
    }
  }

  return (
    <div>
      <SearchBar searchHandler={ e => setSearchQuery(e.target.value) } query={ searchQuery } />

      <Countries countries={countries} query={ searchQuery } showCountryDetail={ showCountryDetail } weather={ weather } />
    </div>
  );
}
/* 
=======================
Search Bar
=======================
 */
const SearchBar = ({ searchHandler, query }) => {
  return (
    <div id="search-bar">
      <h3>Find Country</h3>
      <input type="search" onChange={ searchHandler } value={ query }/>
    </div>
  )
}
/* 
=======================
Search Bar
=======================
 */
const Countries = ({ countries, query, showCountryDetail, weather }) => {
  return (
    <div id="countries" onClick={ showCountryDetail }>
      {
        query === '' ? '' :
        countries.filter(country => new RegExp(`^${query}`, 'i').test(country.name)).map(country => country.name).length > 9 
        ?
        <h4>Please make your search term more specific</h4> 
        :
        countries.filter(country => new RegExp(`^${query}`, 'i').test(country.name)).map(country => country.name).length === 1 
        ?
        countries.filter(country => new RegExp(`^${query}`, 'i').test(country.name)).map(country => (
          <div key={ country.numericCode }>
            <h2>{ country.name }</h2>
            <p>Capital: { country.capital }</p>
            <ul>
              {
                country.languages.map(({ name }, index) => (<li key={ index }>{ name }</li>))
              }
            </ul>
            <img src={ country.flag } alt={ `${ country.name }'s flag` } className="flag" />
            <h3>weather in { country.capital }</h3>
            {
              Object.keys(weather).length === 0 ? '' :
              <>
              <p><em>{ weather.weather[0].description }</em></p>
              <img src={`https://openweathermap.org/img/wn/${ weather.weather[0].icon }@2x.png`} alt={`${ weather.name } weather icon`} style={{ filter: `brightness(75%) ` }}/>
              <p><strong>Temperature: </strong> { weather.main.temp } degrees</p>
              <p><strong>Wind: </strong>{ weather.wind.speed } mph, direction { weather.wind.deg } degrees</p>
              </>
            }
          </div>
        )) 
        :
        countries.filter(country => new RegExp(`^${query}`, 'i').test(country.name)).map(country => (<p key={ country.numericCode}>{ country.name } {" "} <button className="show-country">Show</button></p>))
      }
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

/* 
basic data of the country, its flag and the languages spoken in that country are shown:
fullstack content
 */