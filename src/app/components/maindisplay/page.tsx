import { CityInfo, WeatherData } from "@/app/envConfig"
import { Box, Button, Grid2, Stack, TextField, Typography } from "@mui/material"
import React from "react"
import SearchIcon from '@mui/icons-material/Search';
//import defaultPic from 'src/app/pics/defaultPic.jpg'
var randomCountry = require('random-country')


interface Props {
  weatherData: WeatherData
  cities: CityInfo[]
}

console.log(randomCountry)
function MainDisplay(props: Props) {

  const [location, setLocation] = React.useState<string>("");
  const [weatherInfo, setWeatherInfo] = React.useState<WeatherData>(props.weatherData)
  const [cityList, setCityList] = React.useState<CityInfo[]>(props.cities)
  const [countryCode, setCountryCode] = React.useState<string>(randomCountry)
  
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
    console.log(countryCode)
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
    setCityList(data)
  }

  async function APIS() {
    weatherAPI()
    randomCities()
  }

    return (
      <Box sx={{marginLeft: '5vw', marginRight: '5vw', backgroundImage: `url("src/app/pics/clear.jpg")`}}>
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <Typography>{weatherInfo.current.temperature}</Typography>
            <Stack>
              <Typography>{weatherInfo.location.name}</Typography>
              <Typography>{weatherInfo.location.localtime}</Typography>
            </Stack>
            <Typography>{weatherInfo.current.weather_descriptions[0].desc}</Typography>
          </Grid2>
          <Grid2 size={4}>                        
            <TextField id="cityInput" label="Another Location" variant="standard" onChange={handleWeatherInputChange}/>
            <Button variant="contained" sx={{marginLeft: '1vw'}} onClick={APIS} startIcon={<SearchIcon/>}></Button>
            <Stack>
              {cityList?.map((city, index) => (
                <Typography key={index++}>{city?.name}</Typography>
              ))}
            </Stack>
            <br></br>
            <br></br>
            <Typography>Weather Details</Typography>
            <Stack>
              <Grid2 container spacing={2}>
                <Grid2 size={6} sx={{justifyContent: 'left'}}>
                  <Typography>Cloudy</Typography>
                  <Typography>Humidity</Typography>
                  <Typography>Wind</Typography>
                  <Typography>Rain</Typography>
                </Grid2>
                <Grid2 size={6} sx={{justifyContent: 'right'}}>
                  <Typography>{weatherInfo.current.visibility}</Typography>
                  <Typography>{weatherInfo.current.humidity}</Typography>
                  <Typography>{weatherInfo.current.wind_speed}</Typography>
                  <Typography>{weatherInfo.current.precip}</Typography>
                  </Grid2>
                </Grid2>
              </Stack>
            </Grid2>
          </Grid2>
        </Box>
    )
}

export default MainDisplay