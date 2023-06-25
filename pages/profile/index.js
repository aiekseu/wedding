import React, { useEffect, useState } from 'react'
import {
    Autocomplete,
    Box,
    Checkbox,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useQuery, useQueryClient } from 'react-query'
import { API_URL } from '../../utils/consts'
import axios from 'axios'
import theme from '../../styles/theme'
import ProfileAppBar from '@/components/profile/app-bar'
import GuestImage from '@/components/profile/guest-image'
import ShrekButton from '@/components/ui/button'

function listToArray(fullString, separator) {
    let fullArray = [];

    if (fullString !== undefined) {
        if (fullString.indexOf(separator) === -1) {
            fullArray.push(fullString);
        } else {
            fullArray = fullString.split(separator);
        }
    }

    return fullArray;
}
function stringifyBooleanObject(obj) {
    let result = [];
    for (let key in obj) {
        if (obj[key] === true) {
            result.push(key);
        }
    }
    return result.join(',');
}

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
                    const guests = res.data.map((g) => {
                        const drinksArray = listToArray(g.drinks, ',');
                        const drinks = {
                            'б/а': drinksArray.indexOf('б/а') !== -1,
                            'пиво': drinksArray.indexOf('пиво') !== -1,
                            'коктейли': drinksArray.indexOf('коктейли') !== -1,
                            'настойки': drinksArray.indexOf('настойки') !== -1,
                            'водка': drinksArray.indexOf('водка') !== -1,
                        }
                        return {...g, drinks: drinks}
                    })
                    setGuests(guests)
                    return guests
                }),
        { staleTime: 'Infinity', refetchInterval: false, refetchOnWindowFocus: false, refetchOnReconnect: false },
    )

    const queryClient = useQueryClient()

    const [loading, setLoading] = useState(false)
    const [guests, setGuests] = useState([])
    const [saved, setSaved] = useState([false, false, false, false, false, false, false, false, false])

    useEffect(() => {
        for (let i = 0; i < saved.length; i++) {
            if (saved[ i ]) {
                console.log(i)
                setTimeout(() => {
                    setSaved([false, false, false, false, false, false, false, false, false])
                }, 3000)
            }
        }
    }, [saved])

    const handleAddGuest = async () => {
        setLoading(true)
        const newGuest = {
            'id': localStorage.getItem('id'),
            'guest_num': Math.floor((Math.random() * 1000000 % 100000)),
            'name': `Гость ${guests.length + 1}`,
            'is_coming': 1,
            'costume_id': 1,
            'costume_name': 'Шрек',
            'url': 'https://storage.yandexcloud.net/wedding-assets/heroes/1.jpg',
            'alcohol': 0,
            'leaving': '',
            'breakfast': 0,
            'supboard': 0,
        }

        await fetch(API_URL, {
            redirect: 'follow',
            method: 'POST',
            body: JSON.stringify({
                action: 'addUser',
                ...newGuest,
            }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        await fethchedGuests.refetch()

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

    const handleSaveGuest = async (guest, index) => {
        setLoading(true)

        const guestDrinks = stringifyBooleanObject(guest.drinks)
        const data = {...guest, drinks: guestDrinks}

        await fetch(API_URL, {
            redirect: 'follow',
            method: 'POST',
            body: JSON.stringify({ ...data, action: 'patchUser' }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        await fethchedGuests.refetch()

        const newSaved = [...saved]
        newSaved[ index ] = true
        setSaved(newSaved)

        setLoading(false)
        void queryClient.refetchQueries('chartData')
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

                                    {/* УЕЗЖАЕТ */}
                                    <Box
                                        mt={2}
                                        sx={{
                                            width: '90%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Typography component={'span'} variant={'h6'} mr={2}>Когда уезжает с
                                            площадки:</Typography>
                                        <RadioGroup
                                            value={guest.leaving}
                                            onChange={(_, leavingValue) => {
                                                setGuests((prevValue) => {
                                                    return prevValue.map((value, indexValue) =>
                                                        indexValue === index
                                                            ? {
                                                                ...value,
                                                                leaving: leavingValue,
                                                            }
                                                            : value,
                                                    )
                                                })
                                            }}
                                        >
                                            <FormControlLabel value="22" control={<Radio/>}
                                                              label="22.07, не оставаясь на ночевку"/>
                                            <FormControlLabel value="23-12" control={<Radio/>} label="23.07 до 12.00"/>
                                            <FormControlLabel value="23-18" control={<Radio/>} label="23.07 до 18:00"/>
                                        </RadioGroup>
                                    </Box>

                                    {/* ЗАВТРАК */}
                                    <Box
                                        mt={2}
                                        sx={{
                                            width: '90%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Typography component={'span'} variant={'h6'} mr={2}>Завтрак:</Typography>
                                        <RadioGroup
                                            value={guest.breakfast}
                                            onChange={(_, breakfastValue) => {
                                                setGuests((prevValue) => {
                                                    return prevValue.map((value, indexValue) =>
                                                        indexValue === index
                                                            ? {
                                                                ...value,
                                                                breakfast: breakfastValue,
                                                            }
                                                            : value,
                                                    )
                                                })
                                            }}
                                        >
                                            <FormControlLabel value="0" control={<Radio/>} label="Не нужен"/>
                                            <FormControlLabel value="porridge" control={<Radio/>} label="Каша овсяная"/>
                                            <FormControlLabel value="eggs" control={<Radio/>} label="Яичница"/>
                                        </RadioGroup>
                                    </Box>

                                    {/* АЛКОГОЛЬ */}
                                    <Box
                                        mt={2}
                                        sx={{
                                            width: '90%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Typography component={'span'} variant={'h6'} mr={2}>Напитки:</Typography>
                                        <FormControl component="fieldset" variant="standard">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={guest.drinks['б/а']}
                                                            onChange={(_, checked) => {
                                                                setGuests((prevValue) => {
                                                                    return prevValue.map((value, indexValue) =>
                                                                        indexValue === index
                                                                            ? {
                                                                                ...value,
                                                                                drinks: { ...value.drinks, 'б/а': checked },
                                                                            }
                                                                            : value,
                                                                    )
                                                                })
                                                            }}
                                                        />
                                                    }
                                                    label="Безалкогольные напитки"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox checked={guest.drinks['пиво']}
                                                                  onChange={(_, checked) => {
                                                                      setGuests((prevValue) => {
                                                                          return prevValue.map((value, indexValue) =>
                                                                              indexValue === index
                                                                                  ? {
                                                                                      ...value,
                                                                                      drinks: { ...value.drinks, 'пиво': checked },
                                                                                  }
                                                                                  : value,
                                                                          )
                                                                      })
                                                                  }} />
                                                    }
                                                    label="Пиво"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox checked={guest.drinks['коктейли']}
                                                                  onChange={(_, checked) => {
                                                                      setGuests((prevValue) => {
                                                                          return prevValue.map((value, indexValue) =>
                                                                              indexValue === index
                                                                                  ? {
                                                                                      ...value,
                                                                                      drinks: { ...value.drinks, 'коктейли': checked },
                                                                                  }
                                                                                  : value,
                                                                          )
                                                                      })
                                                                  }}/>
                                                    }
                                                    label="Слабоалкогольные коктейли (апероль/фиеро)"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={guest.drinks['водка']}
                                                            onChange={(_, checked) => {
                                                                setGuests((prevValue) => {
                                                                    return prevValue.map((value, indexValue) =>
                                                                        indexValue === index
                                                                            ? {
                                                                                ...value,
                                                                                drinks: { ...value.drinks, 'водка': checked },
                                                                            }
                                                                            : value,
                                                                    )
                                                                })
                                                            }}
                                                        />
                                                    }
                                                    label="Крепкий алкоголь (водка)"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={guest.drinks['настойки']}
                                                            onChange={(_, checked) => {
                                                                setGuests((prevValue) => {
                                                                    return prevValue.map((value, indexValue) =>
                                                                        indexValue === index
                                                                            ? {
                                                                                ...value,
                                                                                drinks: { ...value.drinks, 'настойки': checked },
                                                                            }
                                                                            : value,
                                                                    )
                                                                })
                                                            }}
                                                        />
                                                    }
                                                    label="Крепкий алкоголь (домашние настойки)"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>

                                    {/* САПЫ */}
                                    <Box
                                        mt={2}
                                        sx={{
                                            width: '90%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Typography component={'span'} variant={'h6'} mr={2}>Будет арендовать сапборд:</Typography>
                                        <Checkbox
                                            checked={guest.supboard === 1}
                                            onChange={(event) => {
                                                setGuests((prevValue) => {
                                                    return prevValue.map((value, indexValue) =>
                                                        indexValue === index
                                                            ? {
                                                                ...value,
                                                                supboard: event.target.checked ? 1 : 0,
                                                            }
                                                            : value,
                                                    )
                                                })
                                            }}
                                        />
                                    </Box>

                                    {/* СОХРАНИТЬ / УДАЛИТЬ */}
                                    <Stack direction={'row'} sx={{ width: { xs: '100%', md: '90%' }, mt: 3, mb: 2 }}
                                           spacing={2}>
                                        <ShrekButton
                                            disabled={JSON.stringify(guest) === JSON.stringify(fethchedGuests.data[ index ])}
                                            loading={loading}
                                            onClick={() => handleSaveGuest(guest, index)}
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
                                    {
                                        saved[ index ] && <Typography color={'primary.main'}>
                                            Информация обновлена
                                        </Typography>
                                    }
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
                        sx={{ width: '100%', mt: 4, py: 2, mb: 6 }}
                    >
                        Добавить гостя
                    </ShrekButton>
                }
            </Container>
        </>
    )
}

export default ProfilePage
