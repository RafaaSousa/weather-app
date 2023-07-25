import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bootstrap from "bootstrap";
import { FiSearch } from 'react-icons/fi';


function Home () {
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/weather/${city}`);
    };

    return (

    <div className="container">
        <h2 className="title">Weather App</h2>
   
        <div className="containerInput">
             
           <input
            type="text"
            placeholder="Digite o nome da cidade..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            />
   
            <button className="buttonSearch" onClick={handleSubmit}>
               <FiSearch size={25} color='#fff'/>
            </button>
            
        </div>
    </div>

    );
};

export default Home;