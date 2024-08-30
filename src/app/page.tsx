"use client"
import { Button, Paper, TextField } from "@mui/material";
import React from "react"
import { CityInfo, WeatherData } from "./envConfig";
import MainDisplay from "./components/maindisplay/page";
var randomCountry = require('random-country')

export default function Home() {
  const [location, setLocation] = React.useState<string>("");
  const [weatherInfo, setWeatherInfo] = React.useState<WeatherData>();
  const [countryCode, setCountryCode] = React.useState<string>(randomCountry)
  const [cities, setCities] = React.useState<CityInfo[]>()

  function handleWeatherInputChange(e: any) {
    setLocation(e.target.value)
  }

  async function weatherAPI() {
    console.log("Location is ", location)    
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
    console.log(data)
    setWeatherInfo(data);
    console.log(data.current.weather_descriptions)
  }
  
  async function randomCities() {
    setCountryCode(randomCountry)
    console.log(randomCountry())
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
    console.log(data)
    setCities(data)
  }

  async function APIS() {
    weatherAPI()
    randomCities()
  }

  return (
    <Paper sx={{marginX: '10vw', marginY: '10vw', paddingY: '3vh'}}>      
      {weatherInfo == undefined && 
      <div style={{textAlign: 'center'}}>
        <TextField id="cityInput" label="Location" variant="standard" onChange={handleWeatherInputChange}/>
        <Button variant="contained" sx={{marginLeft: '1vw'}} onClick={APIS}>Search</Button>
      </div>}
      {weatherInfo != undefined && <MainDisplay weatherData={weatherInfo} cities={cities!}/>}
    </Paper>
  )
}
