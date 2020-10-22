import React, { useState } from 'react';
import { getWeatherData } from '../lib/get-weather.js';

function App() {
  const [location, setLocation] = useState('');
  const [weatherForecast, setWeatherForecast] = useState([]);

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    setLocation(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const weatherData = await getWeatherData(location);
    console.log({ weatherData });
    setWeatherForecast(weatherData);
  };

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="search"
          placeholder="How is the weather in..."
          value={location}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <section>
        {weatherForecast.map((weatherItem) => (
          <article key={weatherItem.dt}>
            <h2>
              {new Intl.DateTimeFormat('en-GB', options).format(
                new Date(weatherItem.dt * 1000),
              )}
            </h2>
            <h3>{weatherItem.weather[0].description}</h3>
            <h3>Feels like</h3>
            <dl>
              <dt>Day</dt>
              <dd>{weatherItem.temp.day}</dd>
              <dt>night</dt>
              <dd>{weatherItem.temp.night}</dd>
            </dl>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
