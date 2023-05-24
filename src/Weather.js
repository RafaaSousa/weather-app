import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const { city } = useParams();

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = 'f4285b96d7b540d6ada224404232005';
                const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
                const response = await axios.get(apiUrl);
                setWeatherData(response.data);
                console.log(setWeatherData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWeatherData();
    }, [city]);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>{weatherData.current.condition.icon}</p>
        </div>
    );
};

export default Weather;