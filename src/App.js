import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import Button from "./components/Button/Button";
import temp from "./assets/temp.png";
import humidity from "./assets/humidity.png";
import pressure from "./assets/images.jpg";
import outside from "./assets/outside.png";
import wind from "./assets/wind.png";
import { useQuery } from "@tanstack/react-query";

function App() {
  const apiKey = "06e29a1acc01eb85f474701e29a23cd0";
  const [inputCity, setInputCity] = useState("Cuci");

  const {
    isError,
    data: weatherData,
    refetch,
  } = useQuery({
    queryKey: ["weather", inputCity],
    queryFn: async () => {
      const apiURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        inputCity +
        "&appid=" +
        apiKey;

      const response = await axios.get(apiURL);
      return response.data;
    },
    enabled: false, // Query will not run on component mount
  });

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    refetch(); // Call the query manually when the search button is clicked
  };

  return (
    <div className="col-md-12">
      <div className="weather">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4"></div>
        <input
          type="text"
          className="form-control input-control"
          value={inputCity.toUpperCase()}
          onChange={handleChangeInput}
        />
        <Button onMouseClick={handleSearch} />

        {isError && <div>Error loading data</div>}

        {weatherData && Object.keys(weatherData).length > 0 && (
          <div className="weatherResultBox">
            <img
              className="weatherIcon"
              src="https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-Weather-icon.png"
              alt="weatherappicon"
            />
            <h1 className="weatherCity">{weatherData?.name.toUpperCase()}</h1>

            <h2 className="weatherTemp">
              <img src={temp} alt="temp" className="img-temp" />
              :&nbsp;
              {(weatherData?.main?.temp - 273.15).toFixed(2)}°C
            </h2>
            <h3 className="weatherClouds">
              <img src={outside} alt="outside" className="img-temp" />
              :&nbsp;
              {weatherData?.weather[0].main}
            </h3>
            <h3 className="weatherHumidity">
              <img src={humidity} alt="humidity" className="img-temp" />
              :&nbsp;
              {weatherData?.main.humidity} RH
            </h3>
            <h5 className="weatherPressure">
              <img src={pressure} alt="pressure" className="img-temp" />
              :&nbsp;
              {weatherData?.main.pressure} (mm Hg)
            </h5>
            <h6 className="weatherWindSpeed">
              <img src={wind} alt="wind" className="img-temp" />
              :&nbsp;
              {weatherData?.wind.speed} (km/h)
            </h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
