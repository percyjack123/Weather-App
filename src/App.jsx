import React,{useState} from "react";
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
    <div className="min-h-screen flex flex-col justify-center text-center ">
        <div className="m-5 p-5 rounded-3xl shadow-lg bg-white">
            <h2 className="font-bold text-3xl text-white">WEATHER FORECAST</h2>
            <input type="text" value={city} placeholder="enter a city..." className="p-3" onChange={(e)=>setcity(e.target.value)} />
            <button className="p-2 text-center bg-black text-white" onClick={fetchWeather}>Get Weather</button>
            {error && <p className="mt-3 text-red">{error}</p>}
            {weather && <div className="m-4 text-bold text-center bg-white"><h2 className="text-xl font-semibold">{weather.name}</h2>
          <p className="text-lg">
            Temperature: {weather.main.temp}°C</p>
          <p className="text-lg">Humidity: {weather.main.humidity}%</p>
          <p>{weather.weather[0].description}</p></div>
           }
        </div>
    </div>
);
};
export default App;