import { createTheme, responsiveFontSizes } from '@mui/material'

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#0D0E14',
                background: '#202127',
                soft: '#2D2E34',
                softHover: '#45474f',
                inactive: 'rgba(255,255,255,0.27)',
            },
            secondary: {
                main: '#57BA84',
                hover: '#3d9b68',
                inactive: '#2a6b46',
                text: 'rgba(255,255,255,0.55)',
            },
            error: {
                main: '#931F1D',
                hover: '#721916',
                inactive: 'rgba(114,25,22,0.46)',
            },
        },
        typography: {
            allVariants: {
                color: '#FFF',
            },
        },
        components: {},
    })
)

export default theme
