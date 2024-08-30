"use client"
import { Button, Paper, TextField } from "@mui/material";
import React from "react"
import { WeatherData } from "./envConfig";


export default function Home() {
  const [location, setLocation] = React.useState<string>("");
  const [weatherInfo, setWeatherInfo] = React.useState<WeatherData>();

  function handleWeatherInputChange(e: any) {
    setLocation(e.target.value)
  }

  async function weatherAPI() {
    console.log("Location is ", location)    
    const route = `/api/${location}`
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
  }

  return (
    <Paper sx={{ }}>      
      {weatherInfo == undefined && <>
        <TextField id="cityInput" label="Location" variant="standard" onChange={handleWeatherInputChange}/>
        <Button variant="contained" sx={{ justifyContent: 'center'}} onClick={weatherAPI}>Search</Button>
      </>}
      {weatherInfo != undefined && 
        <>
          <div>
            <p>City is {weatherInfo?.location?.name}!</p>
          </div>
          <div>
            <p>Temp is {weatherInfo?.current?.temperature}!</p>
          </div>
        </>}
    </Paper>
  )
}
