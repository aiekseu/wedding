import React from 'react'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import usePageRedirect from '@/utils/use-page-redirect'


const ProfileAppBar = () => {
    const toMain = usePageRedirect('/')

    return (
        <AppBar position="sticky" sx={{ background: 'transparent' }} elevation={0}>
            <Box px={2}>
                <Toolbar disableGutters>
                    <IconButton
                        size="small"
                        onClick={toMain}
                        color="inherit"
                    >
                        <ArrowBackIosNewIcon fontSize={'small'} sx={{ color: '#5A6000' }}/>
                    </IconButton>
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default ProfileAppBar
