"use client"
import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react"
import { CityInfo, WeatherData } from "./envConfig";
import MainDisplay from "./components/maindisplay/page";
var randomCountry = require('random-country')

export default function Home() {
  const [location, setLocation] = React.useState<string>("");
  const [weatherInfo, setWeatherInfo] = React.useState<WeatherData>();
  const [countryCode, setCountryCode] = React.useState<string>(randomCountry)
  const [cities, setCities] = React.useState<CityInfo[]>()
  const [backgroundImage, setBackgroundImage] = React.useState<string>();

  function handleWeatherInputChange(e: any) {
    setLocation(e.target.value)
  }

  async function weatherAPI() {
    //console.log("Location is ", location)    
    const route = `/api/weather`
    const response = await fetch(route,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      }
    )
    const data: WeatherData = await response.json()
    //console.log(data)
    setWeatherInfo(data);
    console.log(data.current.weather_descriptions[0])
    const weatherDesc = data?.current.weather_descriptions[0].toLowerCase()
    console.log(weatherDesc)
    if (weatherDesc?.includes("sun")) {
      setBackgroundImage("sunny.jpg")
    } else if (weatherDesc?.includes("snow")) {
      setBackgroundImage("snow.jpg")
    } else if (weatherDesc?.includes("storm")) {
      setBackgroundImage("stormy.jpg")
    } else if (weatherDesc?.includes("cloud")) {
      setBackgroundImage("cloudy.jpg")
    } else if (weatherDesc?.includes("clear")) {
      setBackgroundImage("clear.jpg")
    } else if (weatherDesc?.includes("rain")) {
      setBackgroundImage("rain.jpg")
    } else if (weatherDesc?.includes("wind")) {
      setBackgroundImage("windy.jpg")
    } else if (weatherDesc?.includes("overcast")) {
      console.log("HERE")
      setBackgroundImage("overcast.jpg")
    } else {
      console.log("default here")
      setBackgroundImage("defaultPic.jpg")
    }
  }
  
  async function randomCities() {
    setCountryCode(randomCountry)
    //console.log(randomCountry())
    const route = `/api/random_cities`
    const response = await fetch(route,
      {
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(countryCode)
      }
    )
    const data = await response.json()
    //console.log(data)
    setCities(data)
  }

  async function APIS() {
    weatherAPI()
    randomCities()   
  }

  return (
    <Paper sx={{marginX: '5vw', marginY: '5vw', paddingY: '3vh',  backgroundImage: `url("/pics/${backgroundImage}")`, backgroundSize: 'cover'}}>      
      {weatherInfo == undefined && 
      <div style={{textAlign: 'center'}}>
        <Typography sx={{fontSize: "h5.fontSize", lineHeight: 3}}>Enter a city name to view its weather details</Typography>
        <TextField id="cityInput" label="Location" variant="standard" onChange={handleWeatherInputChange}/>
        <Button variant="contained" sx={{marginLeft: '1vw'}} onClick={APIS}>Search</Button>
      </div>}
      {weatherInfo && <MainDisplay weatherData={weatherInfo} cities={cities!} setBackgroundImage={setBackgroundImage}/>}
    </Paper>
  )
}
