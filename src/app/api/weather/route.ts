import { WeatherData } from "@/app/envConfig";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const location = await request.json()
    //const apiKey = process?.env?.APIKEY
    if (location) {
        try {
            const url = `https://api.weatherstack.com/current?access_key=f02b54b29e512419d64dbbc62f1606bd&query=${location}`
            const response = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; Charset=UTF-8',
                    }
                }
            )
            const data = await response.json() as WeatherData
            return NextResponse.json(data)
        }
        catch (error){
            return NextResponse.json(error)
        }
    } else {
        return NextResponse.json("")
    }
}
export const runtime = 'edge'