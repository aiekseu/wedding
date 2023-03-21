import React, { memo } from 'react'
import { Box, Typography } from '@mui/material'
import theme from '@/styles/theme'
import Grid from '@mui/material/Unstable_Grid2'


const GuestImage = ({ url, name }) => {
    return (
        <Grid item xs={12} md={5}>
            <Box
                sx={{
                    height: '250px',
                    width: '100%',
                    backgroundImage: `url(${url})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top center',
                    position: 'relative',
                    borderRadius: '16px',
                    [ theme.breakpoints.up('md') ]: {
                        height: '300px',
                        backgroundPosition: 'top left',
                    },

                }}
            >
                <Typography
                    component={'span'}
                    variant={'h2'}
                    sx={{
                        width: '100%',
                        position: 'absolute',
                        top: '70%',
                        left: '60%',
                        textAlign: 'left',
                        transform: 'translate(-50%, -50%)',
                        fontFamily: 'lobster',
                        color: 'white',
                        lineHeight: '90%',
                        textShadow: '-2px -2px 0 green,-2px -1px 0 green,-2px 0px 0 green,-2px 1px 0 green,-2px 2px 0 green,-1px -2px 0 green,-1px -1px 0 green,-1px 0px 0 green,-1px 1px 0 green,-1px 2px 0 green,0px -2px 0 green,0px -1px 0 green,0px 0px 0 green,0px 1px 0 green,0px 2px 0 green,1px -2px 0 green,1px -1px 0 green,1px 0px 0 green,1px 1px 0 green,1px 2px 0 green,2px -2px 0 green,2px -1px 0 green,2px 0px 0 green,2px 1px 0 green,2px 2px 0 green',
                        [ theme.breakpoints.down('md') ]: {
                            left: '50%',
                            textAlign: 'center',
                        },
                    }}
                >
                    {name}
                </Typography>
            </Box>
        </Grid>
    )
}

export default memo(GuestImage)
