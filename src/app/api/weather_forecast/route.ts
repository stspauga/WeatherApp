import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const city = await request.json()
    //const apiKey = process?.env?.APIKEY
    if (city) {
        try {
            const url = `http://api.weatherstack.com/forecast?access_key=f02b54b29e512419d64dbbc62f1606bd&query=${city}&forecast_days=5`
            const response = await fetch(url, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; Charset=UTF-8',
                    }
                }
            )
            const data = await response.json()
            return NextResponse.json(data)
        } catch (error) {
            return NextResponse.json(error)
        }
    } else {
        return NextResponse.json("")
    }
}

export const runtime = 'edge'