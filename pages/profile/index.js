import React, { useState } from 'react'
import { Autocomplete, Box, Checkbox, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useQuery } from 'react-query'
import { API_URL } from '../../utils/consts'
import axios from 'axios'
import theme from '../../styles/theme'
import ProfileAppBar from '@/components/profile/app-bar'
import GuestImage from '@/components/profile/guest-image'
import ShrekButton from '@/components/ui/button'


const ProfilePage = () => {
    const costumes = useQuery('costumes', () =>
        axios.get(API_URL, { params: { data: 'costumes' } }).then((res) => res.data),
    )

    const fethchedGuests = useQuery('guests', () =>
        axios
            .get(API_URL, {
                params: { data: 'userById', id: localStorage.getItem('id') },
            })
            .then((res) => {
                setGuests(res.data)
                return res.data
            }),
        {staleTime: 'Infinity', refetchInterval: false, refetchOnWindowFocus: false, refetchOnReconnect: false, }
    )

    const [loading, setLoading] = useState(false)
    const [guests, setGuests] = useState([])

    const handleAddGuest = async () => {
        setLoading(true)
        const newGuest = {
            'id': localStorage.getItem('id'),
            'guest_num': guests.length + 1,
            'name': `Гость ${guests.length + 1}`,
            'is_coming': 1,
            'costume_id': 1,
            'costume_name': 'Шрек',
            'url': 'https://storage.yandexcloud.net/wedding-assets/heroes/1.jpg',
        }

        await fetch(API_URL, {
            redirect: "follow",
            method: "POST",
            body: JSON.stringify({
                action: "addUser",
                ...newGuest
            }),
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
        });
        await fethchedGuests.refetch()

        const newGuests = [...guests, newGuest]
        setGuests(newGuests)


        setLoading(false)
    }

    const handleDeleteGuest = async (guest, index) => {
        setLoading(true)
        // const newGuests = [...guests].slice(index, 1)
        // setGuests(newGuests)
        await fetch(API_URL, {
            redirect: 'follow',
            method: 'POST',
            body: JSON.stringify({ action: 'deleteUser', id: guest.id, guest_num: guest.guest_num }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        await fethchedGuests.refetch()
        setLoading(false)
    }

    const handleSaveGuest = async (guest) => {
        setLoading(true)

        await fetch(API_URL, {
            redirect: 'follow',
            method: 'POST',
            body: JSON.stringify({ ...guest, action: 'patchUser' }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        await fethchedGuests.refetch()
        setLoading(false)
    }

    return (
        <>
            <ProfileAppBar/>
            <Container
                display={'flex'}
                maxWidth={'lg'}
                sx={{
                    minHeight: '100vh',
                    [ theme.breakpoints.down('lg') ]: {
                        px: 2,
                    },
                }}
            >
                <Typography variant={'h4'}>Привет!</Typography>
                <Typography variant={'h5'} mt={1}>Это твой профиль – здесь нужно указать информацию о всех гостях, с
                    которыми ты придешь к нам на свадьбу :)</Typography>
                {
                    (fethchedGuests.isLoading || costumes.isLoading) &&
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
                    fethchedGuests.isSuccess && costumes.isSuccess &&
                    guests.map((guest, index) =>
                        <Grid
                            key={guest.id + guest.guest_num}
                            container
                            sx={{
                                boxShadow: '0px 2px 10px 2px rgba(34, 60, 80, 0.2)',
                                borderRadius: '16px',
                                mt: 4,
                            }}
                        >
                            <GuestImage url={guest.url} name={guest.name}/>
                            <Grid item xs={12} md={7}>
                                <Stack
                                    direction={'column'}
                                    alignItems={'start'}
                                    sx={{ p: { xs: 2, md: 0 }, pl: { xs: 2, md: 2 } }}
                                >
                                    {/* ИМЯ */}
                                    <Box
                                        mt={2}
                                        sx={{
                                            width: '90%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Typography component={'span'} variant={'h6'} mr={2}>Имя:</Typography>
                                        <TextField
                                            variant={'outlined'}
                                            value={guest.name}
                                            onChange={(event) => {
                                                setGuests((prevValue) => {
                                                    return prevValue.map((value, indexValue) =>
                                                        indexValue === index
                                                            ? { ...value, name: event.target.value }
                                                            : value,
                                                    )
                                                })
                                            }}
                                            sx={{ width: '100%' }}/>
                                    </Box>

                                    {/* КОСТЮМ */}
                                    <Box
                                        mt={2}
                                        sx={{
                                            width: '90%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Typography component={'span'} variant={'h6'} mr={2}>Костюм:</Typography>
                                        <Autocomplete
                                            variant={'outlined'}
                                            value={guest.costume_name}
                                            options={costumes.data.map((costume) => costume.hero_name)}
                                            renderInput={(params) => <TextField {...params} />}
                                            sx={{ width: '100%' }}
                                            noOptionsText={'Такой герой не найден. Напишите нам и мы его добавим ;)'}
                                            onChange={(event, newValue) => {
                                                if (newValue)
                                                    setGuests((prevValue) => {
                                                        return prevValue.map((value, indexValue) =>
                                                            indexValue === index
                                                                ? {
                                                                    ...value,
                                                                    costume_name: newValue,
                                                                    costume_id: costumes.data.find((costume) => costume.hero_name === newValue).id,
                                                                    url: costumes.data.find((costume) => costume.hero_name === newValue).image_url,
                                                                }
                                                                : value,
                                                        )
                                                    })
                                            }}
                                        />
                                    </Box>

                                    {/* ТРАНСФЕР */}
                                    <Box
                                        mt={2}
                                        sx={{
                                            width: '90%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Typography component={'span'} variant={'h6'} mr={2}>Нужен трансфер из
                                            Перми:</Typography>
                                        <Checkbox
                                            checked={guest.transfer === 1}
                                            onChange={(event) => {
                                                setGuests((prevValue) => {
                                                    return prevValue.map((value, indexValue) =>
                                                        indexValue === index
                                                            ? {
                                                                ...value,
                                                                transfer: event.target.checked ? 1 : 0,
                                                            }
                                                            : value,
                                                    )
                                                })
                                            }}
                                        />
                                    </Box>

                                    {/* НОЧЕВКА */}
                                    <Box
                                        mt={2}
                                        sx={{
                                            width: '90%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Typography component={'span'} variant={'h6'} mr={2}>Останется на
                                            ночевку:</Typography>
                                        <Checkbox
                                            checked={guest.stay === 1}
                                            onChange={(event) => {
                                                setGuests((prevValue) => {
                                                    return prevValue.map((value, indexValue) =>
                                                        indexValue === index
                                                            ? {
                                                                ...value,
                                                                stay: event.target.checked ? 1 : 0,
                                                            }
                                                            : value,
                                                    )
                                                })
                                            }}
                                        />
                                    </Box>
                                    <Stack direction={'row'} sx={{ width: { xs: '100%', md: '90%' }, mt: 3, mb: 2 }}
                                           spacing={2}>
                                        <ShrekButton
                                            disabled={JSON.stringify(guest) === JSON.stringify(fethchedGuests.data[ index ])}
                                            loading={loading}
                                            onClick={() => handleSaveGuest(guest)}
                                            sx={{ width: '100%' }}
                                        >
                                            Сохранить
                                        </ShrekButton>
                                        <ShrekButton
                                            loading={loading}
                                            onClick={() => handleDeleteGuest(guest, index)}
                                            sx={{
                                                width: '100%',
                                                background: (theme) => theme.palette.error.main,
                                                ':hover': { background: (theme) => theme.palette.error.hover },
                                            }}
                                        >
                                            Удалить
                                        </ShrekButton>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>,
                    )
                }
                {
                    fethchedGuests.isSuccess &&
                    <ShrekButton
                        loading={loading}
                        onClick={handleAddGuest}
                        sx={{ width: '100%', my: 2, py: 1 }}
                    >
                        Добавить гостя
                    </ShrekButton>
                }
            </Container>
        </>
    )
}

export default ProfilePage
