import React, { useEffect, useState } from 'react'
import { Avatar, Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material'
import { API_URL, LANDING_REFS } from '../../utils/consts'
import Image from 'next/image'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useIsMobile from '@/utils/use-is-mobile'


const colors = ['#5A6000', '#8a9325', '#548A00', '#2a2a2a']
const splitArrayInto4 = (array) => {
    const arrayLength = array.length
    const chunkSize = Math.ceil(arrayLength / 4)
    const result = []

    for (let i = 0; i < arrayLength; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize)
        result.push(chunk)
    }

    return result
}

const StatisticsSection = () => {
    const guests = useQuery('chartData', () =>
            axios
                .get(API_URL, {
                    params: { data: 'users' },
                })
                .then((res) => res.data),
        { staleTime: 'Infinity', refetchInterval: false, refetchOnWindowFocus: false, refetchOnReconnect: false },
    )

    const [chartData, setChartData] = useState([])
    const [guestsWithCostumes, setGuestsWithCostumes] = useState(0)
    useEffect(() => {
        if (guests.isSuccess && chartData.length === 0) {
            const data = guests.data
            const stat = {}
            let heroes = 0
            for (let hero of data) {
                if (hero.costume_name) {
                    heroes++
                    if (stat[ hero.costume_name ]) {
                        stat[ hero.costume_name ]++
                    } else {
                        stat[ hero.costume_name ] = 1
                    }
                }
            }
            const result = Object.entries(stat).map(([name, count]) => {
                const url = guests.data.find((g) => g.costume_name === name).url
                return { name, count, url }
            })
            setChartData(result)
            setGuestsWithCostumes(heroes)
        }
    }, [guests])

    const costumes = useQuery('emptyCostumes', () =>
        axios.get(API_URL, { params: { data: 'costumes' } }).then((res) => res.data),
    )
    const [emptyCostumes, setEmptyCostumes] = useState([])
    useEffect(() => {
        if (costumes.isSuccess && guests.isSuccess && emptyCostumes.length === 0) {
            const guestCostumeNames = guests.data
                .filter(guest => guest.costume_name !== null)
                .map(guest => guest.costume_name)

            const unusedCostumes = costumes.data
                .filter((costume) => !guestCostumeNames.includes(costume.hero_name))

            setEmptyCostumes(splitArrayInto4(unusedCostumes))
        }
    }, [costumes, guests])

    const isMobile = useIsMobile()

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
                        justifyContent={'top'}
                        alignItems={'center'}
                        flexDirection={'column'}
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
                        <Box>
                            <Typography variant={'h6'} component={'span'}>
                                {guests.isSuccess && `Определились с костюмами: `}
                            </Typography>
                            <Typography variant={'h5'} component={'span'}>
                                {guests.isSuccess && guestsWithCostumes}
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
                            <Tooltip
                                content={<CustomTooltip/>}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                }
            </Box>

            {/* PIE CHART */}
            <Box
                mt={{ xs: 4, md: 0 }}
                py={4}
                sx={{
                    height: { xs: '50vh', md: '60vh' },
                    overflow: 'hidden',
                }}
            >
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
                    <ResponsiveContainer width="100%" height={'100%'}>
                        <PieChart width={'100%'} height={60}>
                            <Pie
                                data={chartData}
                                dataKey="count"
                                nameKey={'name'}
                                fill="#00a0fc"
                                label={(data) => {
                                    return `${data.name}: ${data.value}`
                                }}
                                outerRadius={isMobile ? '40%' : '70%'}
                                innerRadius={isMobile ? '25%' : '50%'}
                            >
                                {
                                    chartData.map((entry, index) => (
                                        <Cell key={`pie-${index}`} fill={colors[ index % 4 ]}/>
                                    ))
                                }
                            </Pie>
                            <Tooltip content={<CustomTooltip/>}/>
                        </PieChart>
                    </ResponsiveContainer>
                }
            </Box>

            {/* UNUSED COSTUMES */}
            <Box mt={{ xs: 4, md: 0 }} py={4}>
                <Typography variant={'h4'} width={'100%'} textAlign={'center'} my={1}>Никем не занятые
                    герои</Typography>
                {
                    guests.isSuccess && chartData.length > 0 && emptyCostumes.length > 0 &&
                    <Grid container direction={'row'}>
                        {
                            emptyCostumes.map((costumesSet) =>
                                <Grid key={`set-${costumesSet[ 0 ].id}`} item xs={6} md={3} columnSpacing={2}>
                                    {
                                        costumesSet.map((costume) =>
                                            <Box
                                                key={`costume-${costume.id}`}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'start',
                                                    my: 1.5,
                                                }}
                                            >
                                                <Avatar src={costume.image_url} sx={{ width: 56, height: 56 }}/>
                                                <Typography
                                                    ml={isMobile ? 1 : 2}
                                                    pr={1}
                                                    variant={isMobile ? 'body1' : 'h6'}
                                                >
                                                    {costume.hero_name}
                                                </Typography>
                                            </Box>,
                                        )
                                    }
                                </Grid>,
                            )
                        }
                    </Grid>
                }
            </Box>
        </Container>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Stack
                direction={'row'}
                alignItems={'center'}
                p={1.5}
                sx={{
                    background: '#d9d9d9',
                    borderRadius: '8px',
                }}
            >
                <Avatar src={payload[ 0 ]?.payload?.url} component={'span'}/>
                <Box ml={2}>
                    <Typography>{payload[ 0 ]?.payload?.name}</Typography>
                    <Typography>{`Гостей: ${payload[ 0 ].value}`}</Typography>
                </Box>
            </Stack>
        )
    }

    return null
}

export default StatisticsSection
