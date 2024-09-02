"use client"
import { CityInfo, WeatherData } from "@/app/envConfig"
import { Box, Button, Grid2, Stack, TextField, Typography } from "@mui/material"
import React, {useState} from "react"
import SearchIcon from '@mui/icons-material/Search';
import ForecastDisplay from "../forecastdisplay/page";
var randomCountry = require('random-country')

interface Props {
  weatherForecast: any
  weatherData: WeatherData
  cities: CityInfo[]
  setBackgroundImage: (image: string) => void
}

const MainDisplay: any = (props: Props) => {
  const [location, setLocation] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<WeatherData>(props?.weatherData)
  const defaultCityList = [{'name':'Tokyo'}, {'name':'Moscow'}, {'name':'Las Vegas'}, {'name':'Stockholm'}]
  const [cityList, setCityList] = useState<CityInfo[]>(props?.cities ? props.cities : defaultCityList)
  const [countryCode, setCountryCode] = useState<string>(randomCountry)
  let desc: string = ""
  const [forecastArr, setForecastArr] = useState<any>(props.weatherForecast)
  let forecast: any[] = [];
  let currnetLocationFlag: boolean = false;
  let newLocation: any;
  

  function handleWeatherInputChange(e: any) {
    setLocation(e.target.value)
  }
  
  async function weatherAPI() {
    const route = `/api/weather`
    let tempLoc;
    currnetLocationFlag ? tempLoc = newLocation : tempLoc = location
    const response = await fetch(route,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempLoc),
      }
    )
    const data: WeatherData = await response.json()
    setWeatherInfo(data);
    desc = data?.current?.weather_descriptions[0]
    const weatherDesc = data?.current?.weather_descriptions[0]?.toLowerCase()  
    if (weatherDesc.includes("sun")) {
      props.setBackgroundImage("sunny.jpg")
    } else if (weatherDesc.includes("snow")) {
      props.setBackgroundImage("snow.jpg")
    } else if (weatherDesc.includes("storm")) {
      props.setBackgroundImage("stormy.jpg")
    } else if (weatherDesc.includes("cloud")) {
      props.setBackgroundImage("cloudy.jpg")
    } else if (weatherDesc.includes("clear")) {
      props.setBackgroundImage("clear.jpg")
    } else if (weatherDesc.includes("rain")) {
      props.setBackgroundImage("rain.jpg")
    } else if (weatherDesc.includes("wind")) {
      props.setBackgroundImage("windy.jpg")
    } else if (weatherDesc.includes("overcast")) {
      props.setBackgroundImage("overcast.jpg")
    } else {
      props.setBackgroundImage("default.jpg")
    }
  }

  async function randomCities() {
    setCountryCode(randomCountry)
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
    if (data.length != 4) {
      setCityList(defaultCityList)
    } else {
      setCityList(data)      
    }
  }

  async function getForecast() {
    const route = "/api/weather_forecast"
    const response = await fetch(route,
      {
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(location)
      }
    )
    const data = await response.json()
    nestedObject(data)
    setForecastArr(forecast)
  }

  
  function nestedObject(dataForecast: any) {
    let key: any
    let newForecastObj = {
      mintemp: "",
      maxtemp: "",
      date: ""
    }
    for (key in dataForecast) {
      if (dataForecast.hasOwnProperty(key)) {
        if (typeof dataForecast[key] === 'object' && dataForecast[key] != null) {
          nestedObject(dataForecast[key])
        } else {
          if (key == 'mintemp') {
            newForecastObj.mintemp = dataForecast[key]
          } else if (key == 'maxtemp') {
            newForecastObj.maxtemp = dataForecast[key]
          } else if (key == 'date') {
            newForecastObj.date = dataForecast[key]
          }
        }
      }
      if (newForecastObj.mintemp != "" && newForecastObj.maxtemp != "" && newForecastObj.date != "") {
        forecast.push(newForecastObj)
        break
      }
    }
  }

  async function getCurrentLocWeatherDetails() {
    currnetLocationFlag = true;
    const route = "/api/current_location_weather"
    const response = await fetch(route,
      {
        method: 'GET'
      }
    )
    const data = await response.json()
    newLocation = data.address.city
    setLocation(newLocation)
    weatherAPI()
  }

  async function APIS() {
    weatherAPI()
    randomCities()    
    getForecast()
  }

  async function LocalAPIS() {
    getCurrentLocWeatherDetails()
    randomCities()
    getForecast()
  }

    return (
      <Box sx={{marginLeft: '5vw', marginRight: '5vw'}}>
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <Typography sx={{fontSize: 'h2.fontSize', }}>{weatherInfo?.current?.temperature} °C</Typography>
            <Stack>
              <Typography sx={{lineHeight: 1, fontSize: 'h1.fontSize'}}>{weatherInfo?.location?.name}</Typography>
              <Typography sx={{fontSize: 'h4.fontSize'}}>{weatherInfo?.location?.localtime}</Typography>
            </Stack>
            <Typography sx={{lineHeight: 1, fontSize: 'h3.fontSize'}}>{weatherInfo?.current?.weather_descriptions}</Typography>
          </Grid2>
          <Grid2 size={4} sx={{backgroundColor: "white", padding: 3, borderRadius: '16px'}}> 
            <Box sx={{backgroundColor: 'rgb(228, 228, 240)', borderRadius: '16px', boxShadow: '10px', padding: 3}}>
              <TextField id="cityInput" label="Another Location" variant="standard" onChange={handleWeatherInputChange}/>
              <Button variant="contained" size="large" sx={{marginLeft: '1vw'}} onClick={APIS} startIcon={<SearchIcon/>}></Button>
              <br></br>
              <br></br>
              <Stack>
                {cityList?.map((city, index) => (
                  <Typography sx={{fontSize: 'h6.fontSize', lineHeight: 2}} key={index++}>{city?.name}</Typography>
                ))}
              </Stack>
              <br></br>
              <Typography sx={{textAlign: 'center'}}>Or</Typography>
              <br></br>
              <Button variant="contained" onClick={LocalAPIS}>Get Weather Details for Current Location</Button>
              <br></br>
              <br></br>
              <Typography sx={{fontSize: 'h3.fontSize'}}>Weather Details</Typography>
              <Stack>
                <Grid2 container spacing={2}>
                  <Grid2 size={6} sx={{justifyContent: 'left', paddingLeft: 1}}>
                    <Typography sx={{fontSize: 'h6.fontSize'}}>Cloudy</Typography>
                    <Typography sx={{fontSize: 'h6.fontSize'}}>Humidity</Typography>
                    <Typography sx={{fontSize: 'h6.fontSize'}}>Wind</Typography>
                    <Typography sx={{fontSize: 'h6.fontSize'}}>Rain</Typography>
                  </Grid2>
                  <Grid2 size={6} sx={{justifyContent: 'right'}}>
                    <Typography sx={{fontSize: 'h6.fontSize'}}>{weatherInfo?.current?.visibility} km</Typography>
                    <Typography sx={{fontSize: 'h6.fontSize'}}>{weatherInfo?.current?.humidity} %</Typography>
                    <Typography sx={{fontSize: 'h6.fontSize'}}>{weatherInfo?.current?.wind_speed} km/h</Typography>
                    <Typography sx={{fontSize: 'h6.fontSize'}}>{weatherInfo?.current?.precip} mm</Typography>
                  </Grid2>
                </Grid2>
              </Stack>
            </Box>                       
          </Grid2>
        </Grid2>
        <br></br>
        <br></br>
        <ForecastDisplay forecastArray={forecastArr ? forecastArr : props?.weatherForecast}/>
      </Box>
    )
}

export default MainDisplay