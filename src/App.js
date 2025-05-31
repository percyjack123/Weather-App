import React,{useState} from "react";
import "./App.css"
const App=()=>{
    const[city,setcity]=useState('');
    const[weather,setWeather]=useState(null);
    const[error, seterror]=useState('');
    const API_KEY='43d485a8619e7cd7057c6286e9b49463';
    const fetchWeather=async()=>{
        if(!city){return};
            try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data=await res.json();
      if(data.cod==200){
        setWeather(data);
        seterror('');
      }else{
        setWeather(null);
        seterror(data.message);
      }
    }
    catch(error){
        seterror('Oops!!something went wrong');
    }
};
return(
    <div className="Main">
        <div className="container">
            <h2 className="title">WEATHER FORECAST</h2>
            <input type="text" value={city} placeholder="enter a city..." className="search " onChange={(e)=>setcity(e.target.value)} />
            <button className="fetch" onClick={fetchWeather}>Get Weather</button>
            {error && <p className="err">{error}</p>}
            {weather && <div className="boxx"><h2 className="name">{weather.name}</h2>
          <p className="temp">
            Temperature: {weather.main.temp}°C</p>
          <p className="text-lg">Humidity: {weather.main.humidity}%</p>
          <p>{weather.weather[0].description}</p></div>
           }
        </div>
    </div>
);
};
export default App;