//import all icon images
import cloud_icon from "../Weather  Assets/Assets/cloud.png";
import clear_icon from "../Weather  Assets/Assets/clear.png";
import drizzle_icon from "../Weather  Assets/Assets/drizzle.png";
import humidity_icon from "../Weather  Assets/Assets/humidity.png";
import rain_icon from "../Weather  Assets/Assets/rain.png";
import search_icon from "../Weather  Assets/Assets/search.png";
import snow_icon from "../Weather  Assets/Assets/snow.png";
import wind_icon from "../Weather  Assets/Assets/wind.png";
import location from"../Weather  Assets/Assets/location.png";
import "./WeatherApp.css";
import { useState } from "react";

import React from "react";
import { useToggle } from "../custom hooks/useToggle";
export const WeatherApp=()=>{
    const [wIcon,setIcon]=useState(cloud_icon);
    const [visible,setVisible]=useState(false);
    const [TempC,toggle]=useToggle(true);

    const search = async ()=>{
        let api_key="bd64f4c7ceff837e1976032ca40dd66e";
        const element=document.getElementsByClassName("cityInput");
        if(element[0].value===""){return 0;}
        setVisible(true);
        let url=`http://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        const humidity=document.getElementsByClassName("humidity-percent");
        const wind=document.getElementsByClassName("wind-rate");
        const tempC=document.getElementsByClassName("weather-temp");
        const tempF=document.getElementsByClassName("weather-temp-F");
        const loc=document.getElementsByClassName("loc");
        humidity[0].innerHTML=data.main.humidity+"%";
        wind[0].innerHTML=Math.floor(data.wind.speed)+" km/h";
        console.log(TempC);
        if(TempC===true){
            tempC[0].innerHTML=Math.floor(data.main.temp)+"°C";
            tempF[0].innerHTML="";
        }else{
            tempF[0].innerHTML=Math.floor(((data.main.temp)*9/5)+32)+"°F";
            tempC[0].innerHTML="";
        }
        loc[0].innerHTML=data.name+" , "+data.sys.country;
        if(data.weather[0].icon==="01d"|| data.weather[0].icon==="01n"){
            setIcon(clear_icon)
        }
        else if(data.weather[0].icon==="02d"|| data.weather[0].icon==="02n"){
            setIcon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d"|| data.weather[0].icon==="03n"){
            setIcon(drizzle_icon);
        }
        else if(data.weather[0].icon==="04d"|| data.weather[0].icon==="04n"){
            setIcon(drizzle_icon);
        }
        else if(data.weather[0].icon==="09d"|| data.weather[0].icon==="09n"){
            setIcon(rain_icon);
        }
        else if(data.weather[0].icon==="10d"|| data.weather[0].icon==="10n"){
            setIcon(rain_icon);
        }
        else if(data.weather[0].icon==="13d"|| data.weather[0].icon==="13n"){
            setIcon(snow_icon);
        }
        else{
            setIcon(clear_icon);
        }
    };
    return (
        <div className="container">
            <div className="top-bar">
              <input type="text" className="cityInput" placeholder="Search city"></input>
              <div className="search-icon"  onClick={search}>
                <img src={search_icon} alt="" />
              </div>
              <button className="toggle-btn" onClick={toggle}>{TempC ? '°C' : '°F' }</button>
            </div>
            { visible===false &&
            <div className="initial-msg" >
                <h2>Welcome</h2>
                <h4>to the</h4>
                <h4>Weather App!!</h4>
                <h3>created by Deeksha Shakyawal</h3>
            </div>
            }
            <div className="display-block" style={visible===true ? {visibility:'visible'} : {visibility: 'hidden'} }>
            <div className="weather-image">
               <img src={wIcon} alt="" />
            </div>
            <div className="weather-temp"></div>
            <div className="weather-temp-F"></div>
            <div className="weather-location" id="country">
                <img src={location} alt=""/>
                <div className="loc"></div>
            </div>
               <div className="data-container">
                <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent"></div>
                    <div className="text">Humidity</div>
                </div>
                </div>
                <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate"></div>
                    <div className="text">Wind speed</div>
                </div>
                </div>
              </div>
              </div>
        </div>
    );
}
export default WeatherApp;

