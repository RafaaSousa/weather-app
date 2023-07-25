import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import Home from "./Home";
import './styles.css'




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
            <div className="weatherGroup">
                    <div className="col_1">
                        <div className="weather">
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
                        </div>
                        
                        <div className="hourlyForecast">
                            <h3>{t("hourlyForecast")}:</h3>
                            
                            <ul>
                                {forecast.forecastday[0].hour.map((h) => (
                                <li key={h.time_epoch}>
                                    {format(new Date(h.time), "HH:mm")} {h.temp_c}°C <img src={h.condition.icon} alt={h.condition.text} />
                                </li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>


                    <div className="col_2">
                        <div className="uvindex">   
                            <p>{t("uvIndex")}: {current.uv}</p>
                        </div>
                        
                        <div className="sunrise"> 
                                <p>{t("sunrise")}: {forecast.forecastday[0].astro.sunrise}</p>
                        </div>

                        <div className="sunset">            
                            <p>{t("sunset")}: {forecast.forecastday[0].astro.sunset}</p>
                        </div>

                        <div className="wind">                
                            <p>{t("wind")}: {current.wind_kph} km/h</p>
                        </div>

                        <div className="rain">                
                            <p>{t("rain")}: {current.precip_mm} mm</p>
                        </div>

                        <div className="feelslike">           
                            <p>{t("feelsLike")}: {current.feelslike_c}°C</p>
                        </div> 

                        <div className="humidity">
                            <p>{t("humidity")}: {current.humidity}%</p>
                        </div>            

                        <div className="visibility">            
                            <p>{t("visibility")}: {current.vis_km} km</p>
                        </div>            

                        <div className="pressure">            
                            <p>{t("pressure")}: {current.pressure_mb} mb</p>
                        </div>   
                    </div>

                    <div className="col_3">
                        <div className="dailyForecast">            
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
                        </div>
                    </div>

                </div>
            </div>
            
    );
  };

export default Weather;