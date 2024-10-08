"use client"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import React, {useState} from "react"
import { CityInfo, WeatherData } from "./envConfig";
import MainDisplay from "./components/maindisplay/page";
import Footer from "./components/footer/page";
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
var randomCountry = require('random-country')

export default function Home() {
  const [location, setLocation] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<WeatherData>();
  const [countryCode, setCountryCode] = useState<string>(randomCountry)
  const [cities, setCities] = useState<CityInfo[]>()
  const [backgroundImage, setBackgroundImage] = useState<string>("defaultPic.jpg");
  const [forecastArr, setForecastArr] = useState<any>()
  let forecast:any = []
  let currentLocationFlag: boolean = false;
  let newLocation: any;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  function handleWeatherInputChange(e: any) {
    setLocation(e.target.value)
  }

  async function weatherAPI() {  
    const route = `/api/weather`
    let tempLoc;
    currentLocationFlag ? tempLoc = newLocation : tempLoc = location
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
    const weatherDesc = data?.current?.weather_descriptions[0].toLowerCase()
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
      setBackgroundImage("overcast.jpg")
    } else {
      setBackgroundImage("defaultPic.jpg")
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
    setCities(data)
  }


  async function getForecast() {
    const route = "/api/weather_forecast"
    let tempLoc;
    currentLocationFlag ? tempLoc = newLocation : tempLoc = location
    const response = await fetch(route,
      {
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(tempLoc)
      }
    )
    const data = await response.json()
    nestedObject(data)
    setForecastArr(forecast)
  }

  async function getCurrentLocWeatherDetails() {
    currentLocationFlag = true;
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
    getForecast()
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

  async function SearchAPIS() {
    weatherAPI()
    randomCities()   
    getForecast()
  }

  async function LocationAPIS() {
    getCurrentLocWeatherDetails()
    randomCities()
  }

  return (
    <Paper sx={{marginX: '5vw', marginY: '5vw', paddingY: '3vh',  backgroundImage: `url("/pics/${backgroundImage}")`, backgroundSize: 'cover'}}>      
      {weatherInfo == undefined && 
      <Stack style={{textAlign: 'center'}}>
        <div>
          <Typography sx={{fontSize: "h5.fontSize", lineHeight: 3}}>Enter a city name to view its weather details</Typography>
          <TextField id="cityInput" label="Location" variant="standard" onChange={handleWeatherInputChange}/>
          <Button variant="contained" sx={{marginLeft: '1vw'}} onClick={SearchAPIS}>Search</Button>
        </div>
        <Divider orientation="vertical"></Divider>
        <div>
          <Typography sx={{fontSize: "h5.fontSize", lineHeight: 3}}>Click here to get weather details for current location</Typography>
          <Button variant="contained" sx={{marginLeft: '1vw'}} onClick={LocationAPIS}>Current Location</Button>
        </div>
      </Stack>}
      {weatherInfo && <MainDisplay weatherForecast={forecastArr} weatherData={weatherInfo} cities={cities!} setBackgroundImage={setBackgroundImage}/>}
      <br></br>
      <Footer handleClickOpen={handleClickOpen}/>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Link 
            href={"https://www.linkedin.com/school/productmanagerinterview/"} 
            target="_blank" 
            style={{
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}>Product Manager Accelerator</Link>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
          The Product Manager Accelerator Program is designed 
          to support PM professionals through every stage of their career. 
          From students looking for entry-level jobs to Directors 
          looking to take on a leadership role, our program has 
          helped over hundreds of students fulfill their career aspirations.
          </Typography>
          <Typography gutterBottom>
          Our Product Manager Accelerator community are ambitious 
          and committed. Through our program they have learnt, 
          honed and developed new PM and leadership skills, 
          giving them a strong foundation for their future endeavours.
          </Typography>
        </DialogContent>        
      </Dialog>
    </Paper>
  )
}
