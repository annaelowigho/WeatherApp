import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [weather, setWeather] = useState();
  const [location, setLocation] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (location) {
        const { data } = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`
        );

        const lat = data[0]?.lat;
        const lon = data[0]?.lon;

        if (lat && lon) {
          const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          );
          setWeather(data);
          setLocation("");
          console.log(data)
          
        } else {
          toast.error("Could not get data for your location");
        }
      } else {
        toast.error("Please enter a location");
      }
    } catch (error) {
      toast.error("Sorry an error occured");
    }
  };

  
//fetch done
  return weather?<div className="relative ">

  <form
    onSubmit={handleSubmit}
    className="flex items-center justify-center"
  >
    <input
      value={location}
      type="search"
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Enter Location"
      className="bg-transparent border-[1px] border-slate-300 outline-none rounded-md m-[50px] w-[400px] h-8 px-5 text-white"
    />
  </form>
  <div className="flex flex-col gap-[400px] md:gap-[200px]  text-white">
    <div className="px-[40px] md:px-[300px]">
      <p className="text-[2rem] md:text-[4rem]">{weather?.name}</p>
      <div className="flex justify-around relative">
        <p className="text-[3rem] md:text-[6rem] font-bold">
          {weather?.main?.temp}
          <span className="text-[1.5rem] md:text-[3rem] absolute top-3 md:top-7">°F</span>
        </p>
        <span>
          {weather?.weather[0]?.main === "Clouds" ? (
            <img src="/assets/animations/cloudy.gif" alt="" /> 
          ) : weather?.weather[0]?.main === "Rain" ? (
            <img src="/assets/animations/rainy.gif" alt="" />
          ) : weather?.weather[0]?.main === "Sun" ? (
            <img src="/assets/animations/sunny.gif" alt="" />
          ) : weather?.weather[0]?.main === "Clear" ? (
              <img src="/assets/clear_sky.gif" alt="" />
          ) : <img src="/assets/animations/snowy.gif" alt="" />
          }
          <span className="capitalize text-[1.5rem] md:text-[3rem] font-bold md:font-normal">{
            weather?.weather[0]?.description
          }</span>
        </span>
      </div>
    </div>
    <div className="flex bg-white/[0.16] m-auto justify-between p-3 rounded-md w-[70%] md:w-[600px] text-center">
      <div>
        <p>{weather?.main?.feels_like}°F</p>
        <p>Feels Like</p>
      </div>
      <div>
        <p>{weather?.main?.humidity}%</p>
        <p>Humidity</p>
      </div>
      <div>
        <p>{weather?.wind?.speed} MPH</p>
        <p>Wind Speed</p>
      </div>
    </div>
  </div>
</div>:<>
<form
    onSubmit={handleSubmit}
    className="flex items-center justify-center"
  >
    <input
      value={location}
      type="search"
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Enter Location"
      className="bg-transparent border-[1px] border-slate-300 outline-none rounded-md m-[50px] w-[400px] h-8 px-5 text-white"
    />
  </form>
</>
    
  
}

export default App;
