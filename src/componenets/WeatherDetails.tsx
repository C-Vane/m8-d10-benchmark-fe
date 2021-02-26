import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { PropsWeatherDetails, WeatherMain } from '../types/interfaces';
import { getFunction } from './CRUDFunctions';
import WeatherToday from './WeatherToday';

const WeatherDetails = (props: PropsWeatherDetails) => {
    const [weather, setWeather] = useState<WeatherMain>()
    const [image, setImage] = useState("")
    const [favorite, setFavorite] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const hr = new Date().getHours()
        setLoading(true)
        props.search.length > 0 && getWeather() && (hr > 17 || hr < 6) ? getImage("night") : getImage("day")
    }, [props.search])

    const getWeather = async () => {

        const response = props.search !== "CURRENT_COORDINATES" ? await getFunction(`weather/city/${props.search}`) : await getFunction(`weather/coordinates?lat=${props.lat}&lon=${props.lon}`)
        console.log(response)
        if (response) {
            setWeather(response)
            props.favorites.includes(response.name.toLowerCase()) && setFavorite(true)
            props.setInput("")
            setLoading(false)
        } else {
            console.log(response)
            setLoading(false)
        }
    }

    const getImage = async (time: string) => {
        try {
            const response = await fetch(process.env.REACT_APP_LOCATION_IMAGE_URL + props.search)
            if (response.ok) {
                const data = await response.json()
                setImage(data.results[0].urls.full)

            } else {
                setImage('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <div style={{ paddingTop: "10vh", backgroundImage: `url("${image || 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?cs=srgb&dl=pexels-quang-nguyen-vinh-2166711.jpg&fm=jpg'}")`, minHeight: "90vh", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "top" }}>
        <Container className={props.theme ? "pt-4" : "invert pt-4"}>
            {weather ? <WeatherToday favorite={favorite} weather={weather} /> :
                loading ? <div className="mt-5">Loading...</div> :
                    <h2 className="mt-5"> Sorry!!! No weather data found for "{props.search}",<br />
                        <span> Please try again with another city...</span></h2>}
        </Container>
    </div>
}


export default WeatherDetails;