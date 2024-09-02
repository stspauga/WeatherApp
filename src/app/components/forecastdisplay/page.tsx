import { ForecastObject } from "@/app/envConfig"
import { Box, Stack, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Key } from "react"

interface Props {
    forecastArray: any
}

const ForecastDisplay: any = (props: Props) => {

    const forecastDisplayStyle = {
        fontSize: "h6.fontSize",
        textAlign: "center"
    }

    return (
        <Box sx={{backgroundColor: "white", padding: 3, borderRadius: '16px'}}>
            <Box sx={{backgroundColor: 'rgb(228, 228, 240)', borderRadius: '16px', boxShadow: '10px', padding: 3}}>
            <Typography sx={{fontSize: "h4.fontSize"}}>5 Day Forecast</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {props?.forecastArray?.map((forecast: ForecastObject, index: Key | null | undefined) => (
                                    <TableCell key={index}>
                                        <Stack>
                                            <Typography sx={{...forecastDisplayStyle}}>Date : {forecast.date}</Typography>
                                            <Typography sx={{...forecastDisplayStyle}}>Max temp : {forecast.maxtemp} °C</Typography>
                                            <Typography sx={{...forecastDisplayStyle}}>Min temp : {forecast.mintemp} °C</Typography>
                                        </Stack>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default ForecastDisplay