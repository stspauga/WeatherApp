export interface WeatherData {
    location: Location,
    current: Current
}

export interface Location {
    name: string
    country: string
    lat: string
    lon: string
    timezone_id: string
    localtime: string
}

export interface Current {
    temperature: string
    weather_description: WeatherDesc[]
    wind_speed: string
    humidity: string
    visibility: string
}

export interface WeatherDesc {
    desc: string
}