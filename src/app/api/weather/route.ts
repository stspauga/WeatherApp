import { WeatherData } from "@/app/envConfig";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const location = await request.json()
    const apiKey = process?.env?.APIKEY
    if (location) {
        try {
            const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`
            const response = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; Charset=UTF-8',
                    }
                }
            )
            //console.log(response)
            const data = await response.json() as WeatherData
            //console.log(data)
            return NextResponse.json(data)
        }
        catch (error){
            //console.log("In route.ts did not work")
            //console.log(error)
            return NextResponse.json(error)
        }
    } else {
        //console.log("no body")
        return NextResponse.json("")
    }
}
export const runtime = 'edge'