import { Stack, Paper, Box, Button } from '@mui/material'
import React from 'react'
import Logo from './Logo'
import Container from './Container'
import menuConfigs from '../../configs/menu.config.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAuthModalOpen } from "../../redux/features/authModalSlice.js"

const Footer = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

  return (
    <Container>
        <Paper square={true} sx={{backgroundImage: "unset", padding: "2rem"}}>
            <Stack
                alignItems="center"
                justifyContent="space-between"
                direction={{xs: "column", md: "row"}}
                sx={{height: "max-content"}}
            >
            <Logo />
            {user ? (

            <Box >
                {menuConfigs.main.map((item, index) => (
                    <Button
                    key={index}
                    sx={{color: "inherit"}}
                    component={Link}
                    to={item.path}
                    >
                        {item.display}
                    </Button>
                ))}
            </Box>
                ) : (
                    <Button
                        variant="contained"
                        onClick={() => dispatch(setAuthModalOpen(true))}
                    >
                        sign in
                    </Button>
                )}
            </Stack>
        </Paper>
    </Container>
  )
}

export default Footer