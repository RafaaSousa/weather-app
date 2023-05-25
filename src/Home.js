import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home () {
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/weather/${city}`);
    };

    return (
        <div>
            <h2>Weather App</h2>
            <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder='Enter city name'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  />

                  <button type='submit'>Search</button>
                  </form>
        </div>
    );
};

export default Home;