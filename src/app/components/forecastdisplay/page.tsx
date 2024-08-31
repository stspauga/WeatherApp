import { ForecastObject } from "@/app/envConfig"
import { Box, Stack, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState } from "react"

interface Props {
    forecastArray: any
}

const ForecastDisplay = (props: Props) => {

    const forecastDisplayStyle = {
        fontSize: "h6.fontSize",
        textAlign: "center"
    }

    return (
        <Box>
            <Typography sx={{fontSize: "h4.fontSize"}}>5 Day Forecast</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {props?.forecastArray?.map((forecast: ForecastObject) => (
                                <TableCell>
                                    <Stack>
                                        <Typography sx={{...forecastDisplayStyle}}>Date : {forecast.date}</Typography>
                                        <Typography sx={{...forecastDisplayStyle}}>Max temp : {forecast.maxtemp}</Typography>
                                        <Typography sx={{...forecastDisplayStyle}}>Min temp : {forecast.mintemp}</Typography>
                                    </Stack>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ForecastDisplay