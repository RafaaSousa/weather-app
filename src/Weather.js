import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import { format } from "date-fns";
import Home from "./Home";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const { city } = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = 'f4285b96d7b540d6ada224404232005';
                const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`;
                const response = await axios.get(apiUrl);
                setWeatherData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWeatherData();
    }, [city]);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const { forecast, current } = weatherData;

    if (!forecast || forecast.forecastday.length === 0) {
        return <div>No forecast data available</div>;
    }

    const formatDate =(date) => {
        return format(new Date(date), "dd/MM/yyyy");
    };

    return (
        <div>
                <Home />
                
                <h2>{t("weatherIn")} {city}</h2>
                <p>
                    {t("temperature")}: {current.temp_c}°C
                </p>
                <p>
                    {t("condition")}: {current.condition.text}
                </p>
                <p>
                    {t("maxTemp")}: {forecast.forecastday[0].day.maxtemp_c}°C
                </p>
                <h3>{t("hourlyForecast")}:</h3>

                <ul>
                    {forecast.forecastday[0].hour.map((h) => (
                        <li key={h.time_epoch}>
                            {format(new Date(h.time), "HH:mm")} {h.temp_c}°C,{" "}
                            {h.condition.text}
                        </li>
                    ))}
                </ul>
                <h3>{t("dailyForecast")}:</h3>
                <ul>
                    {forecast.forecastday.map((day) => (
                        <li key={day.date_epoch}>
                            {t("date")}: {formatDate(day.date)},{" "}
                            {t("maxTemp")}: {day.day.maxtemp_c}°C,{" "}
                            {t("minTemp")}: {day.day.mintemp_c}°C{" "}
                        </li>
                    ))}
                </ul>

                <p>
                    {t("uvIndex")}: {current.uv}
                </p>
                <p>
                    {t("sunrise")}: {forecast.forecastday[0].astro.sunrise}
                </p>
                <p>
                    {t("sunset")}: {forecast.forecastday[0].astro.sunset}
                </p>
                <p>
                    {t("wind")}: {current.wind_kph} km/h
                </p>
                <p>
                    {t("rain")}: {current.precip_mm} mm
                </p>
                <p>
                    {t("feelsLike")}: {current.feelslike_c}°C
                </p>
                <p>
                    {t("humidity")}: {current.humidity}%
                </p>
                <p>
                    {t("visibility")}: {current.vis_km} km
                </p>
                <p>
                    {t("pressure")}: {current.pressure_mb} mb
                </p>
            </div>
    );
  };

export default Weather;