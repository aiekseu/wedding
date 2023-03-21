import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material'
import { API_URL, LANDING_REFS } from '../../utils/consts'
import Image from 'next/image'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const colors = ['#5A6000', '#8a9325', '#548A00', '#2a2a2a']

const StatisticsSection = () => {
    const guests = useQuery('chartData', () =>
        axios
            .get(API_URL, {
                params: { data: 'users' },
            })
            .then((res) => res.data),
    )

    const [chartData, setChartData] = useState([])
    useEffect(() => {
        if (guests.isSuccess && chartData.length === 0) {
            const data = guests.data
            const stat = {}
            for (let hero of data) {
                if (hero.costume_name)
                    if (stat[ hero.costume_name ]) {
                        stat[ hero.costume_name ]++
                    } else {
                        stat[ hero.costume_name ] = 1
                    }
            }
            const result = Object.entries(stat).map(([name, count]) => ({ name, count }))
            setChartData(result)
        }
    }, [guests])

    return (
        <Container
            maxWidth={'lg'}
            ref={LANDING_REFS.STATISTICS}
            sx={{
                pt: 5,
                mt: 5,
            }}
        >
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'top'}
                        height={{ xs: 'unset', md: '400px' }}
                    >
                        <Box>
                            <Typography variant={'h6'} component={'span'}>
                                {guests.isSuccess && `Зарегистрировано гостей: `}
                            </Typography>
                            <Typography variant={'h5'} component={'span'}>
                                {guests.isSuccess && guests.data.length}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box width={'100%'} height={'400px'} position={'relative'}>
                        <Image
                            src={'/icons/shrek-face.png'}
                            layout={'fill'}
                            objectFit={'contain'}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* BAR CHART */}
            <Box sx={{ height: '40vh' }}>
                <Typography>
                    *Данные графики лучше смотреть с большого экрана
                </Typography>
                {
                    guests.isLoading &&
                    <Box
                        sx={{
                            height: '50vh',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress color="secondary"/>
                    </Box>
                }
                {
                    guests.isSuccess && chartData.length > 0 &&
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={'100%'} height={40} data={chartData}>
                            <Bar
                                dataKey="count"
                                fill="#00a0fc"
                            >
                                {
                                    chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[ index % 4 ]}/>
                                    ))
                                }
                            </Bar>
                            <XAxis dataKey="name"/>
                            <YAxis width={24} allowDecimals={false} domain={[0, 'dataMax']}/>
                            <Tooltip/>
                        </BarChart>
                    </ResponsiveContainer>
                }
            </Box>

            {/* PIE CHART */}
            <Box mt={{ xs: 4, md: 0 }} py={4} sx={{ height: { xs: '50vh', md: '60vh', overflow: 'hidden' } }}>
                {
                    guests.isLoading &&
                    <Box
                        sx={{
                            height: '50vh',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress color="secondary"/>
                    </Box>
                }
                {
                    guests.isSuccess && chartData.length > 0 &&
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={'100%'} height={60}>
                            <Pie
                                data={chartData}
                                dataKey="count"
                                nameKey={'name'}
                                fill="#00a0fc"
                                label={(data) => {
                                    return `${data.name}: ${data.value}`
                                }}
                            >
                                {
                                    chartData.map((entry, index) => (
                                        <Cell key={`pie-${index}`} fill={colors[ index % 4 ]}/>
                                    ))
                                }
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                }
            </Box>
        </Container>

    )
}

export default StatisticsSection
