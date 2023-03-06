import React  from 'react'
import { GlobalStyles } from '@mui/material'

const UserGlobalStyles = () => (
    <GlobalStyles
        styles={{
            body: {
                margin: 0,
                backgroundColor: '#0D0E14',
            },

            // scrollbar
            '&::-webkit-scrollbar': {
                width: 4,
                background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
                width: 4,
                background: '#57BA84',
            },
            '&::-webkit-scrollbar-track': {
                background: 'transparent',
            },

            // Text selection color
            '::selection': {
                background: '#57BA84',
            },
            '::-moz-selection': {
                background: '#57BA84',
            },

            // Input number arrows
            'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button ': {
                WebkitAppearance: 'none',
            },

            'input[type="number"], input[type="number"]:hover, input[type="number"]:focus': {
                appearance: 'none',
                MozAppearance: 'textfield',
            },

            // Autocompletion background
            'input:-webkit-autofill,input:-webkit-autofill:focus,input:-webkit-autofill:hover': {
                transition: `background-color 600000s .1s, color 600000s .1s`,
                fontSize: '16px!important',
                color: 'red',
                ':-internal-autofill-previewed': {
                    fontSize: '22px !important',
                },
            },
            'input[data-autocompleted]': {
                backgroundColor: 'transparent !important',
                fontSize: '16px!important',
            }
        }}
    />
)

export default UserGlobalStyles
