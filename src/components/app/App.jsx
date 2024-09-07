import React, { useState } from "react";
import { getData } from "../api/api";
import Form from "../form/Form";
import "./app.css";

function App() {
  const [city, setCity] = useState([]);
  // eslint-disable-next-line
  const [errors, setErrors] = useState("");

  const addCity = async (cityName) => {
    try {
      const result = await getData(cityName);
      if (!result.error) {
        setCity((prev) => [
          ...prev,
          {
            name: result.location.name,
            region: result.location.region,
            last_update: result.current.last_updated,
            temp_c: result.current.temp_c,
            temp_f: result.current.temp_f,
            is_day: result.current.is_day,
            icon: result.current.condition.icon,
            id: Date.now(),
          },
        ]);

        setErrors("");
      } else {
        setErrors("Not Found");
      }
    } catch (error) {}
  };

  const removeCities = (id) => {
    setCity(city.filter((cit) => cit.id !== id));
  };

  return (
    <>
      <div className="container">
        <h1>Weather</h1>
        <Form addCity={addCity} />
        <ul className="list">
          {errors.length >= 1 ? (
            <li className="not-found">City not found</li>
          ) : null}
          {city.map((cityForecast) => {
            return (
              <li
                className={cityForecast.is_day ? "day" : "day night"}
                key={cityForecast.id}
                onClick={() => removeCities(cityForecast.id)}
              >
                <div className="block-1">
                  <div className="block-1-1">
                    <div className="city-name">{cityForecast.name}</div>
                    <div className="city-region"> {cityForecast.region} </div>
                  </div>

                  <div className="city-last__updated">
                    {" "}
                    {cityForecast.last_update}{" "}
                  </div>
                </div>

                <div className="block-2">
                  <div className="block-1-2">
                    <img
                      src={cityForecast.icon}
                      alt="icon"
                      className="city-icon"
                    />
                    <div className="city-temp__c">{cityForecast.temp_c}°C</div>
                  </div>

                  <div className="city-temp__f">{cityForecast.temp_f}°F</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
