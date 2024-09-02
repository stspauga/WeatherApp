import { Button, Stack, Typography } from "@mui/material"

interface Props {
    handleClickOpen: () => void
}

const Footer:any = (props: Props) => {
    return (
        <Stack sx={{textAlign: 'center'}}>
            <Typography sx={{fontSize: 'h4.fontSize'}}>By Tuliloa Pauga</Typography>   
            <Button variant="contained" onClick={props.handleClickOpen}>Click Here for more Info</Button>         
        </Stack>
    )
}

export default Footer