import { NextResponse } from "next/server"

export async function GET() {
    try {
        const url = "https://api.radar.io/v1/geocode/ip"
        const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Authorization': "prj_live_pk_90021b4b3a3609639a6890bce434e7ba1c5fa70a"
                }
            }
        )
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}