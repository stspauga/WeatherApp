import { WeatherData } from "@/app/envConfig";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const country_code = await request.json()
    const apiKey = process?.env?.APIKEY
    if (country_code) {
        try {
            const url = `https://api.api-ninjas.com/v1/city?limit=4&country=${country_code}`
            const response = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'X-Api-Key': 'QA4bWKG02HDmz6ibnAWVeg==u5RMmqsoVafyKR4X'
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