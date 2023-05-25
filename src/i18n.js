import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      weatherIn: "Weather in",
      temperature: "Temperature",
      loading: "Loading...",
      noForecastData: "No forecast data available",
      hourlyForecast: "Hourly Forecast",
      dailyForecast: "5-Day Forecast",
      uvIndex: "UV Index",
      sunrise: "Sunrise",
      sunset: "Sunset",
      wind: "Wind",
      rain: "Rain",
      feelsLike: "Feels Like",
      humidity: "Humidity",
      visibility: "Visibility",
      pressure: "Pressure",
      date: "Date"
      ,maxTemp: "Max."
      ,minTemp: "Min."
    },
  },
  pt: {
    translation: {
      weatherIn: "Tempo em",
      temperature: "Temperatura",
      loading: "Carregando...",
      noForecastData: "Nenhum dado de previsão disponível",
      hourlyForecast: "Previsão por hora",
      dailyForecast: "Previsão de 5 dias",
      uvIndex: "Índice UV",
      sunrise: "Nascer do sol",
      sunset: "Pôr do sol",
      wind: "Vento",
      rain: "Chuva",
      feelsLike: "Sensação térmica",
      humidity: "Umidade",
      visibility: "Visibilidade",
      pressure: "Pressão",
      date: "Data"
      ,maxTemp: "Max."
      ,minTemp: "Min."
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "pt",
    debug: true,
    resources,
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
  });

export default i18n;
