import { useTheme } from '@emotion/react'
import { Typography } from '@mui/material'
import React from 'react'

const Logo = () => {
    const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
       <span style={{ color: theme.palette.primary.main}}>Neo</span>Movie
    </Typography>
  )
}

export default Logo