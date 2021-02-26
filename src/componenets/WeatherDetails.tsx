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
        props.search.length > 0 && getWeather()
    }, [props.search])

    const getWeather = async () => {
        const response = props.search !== "CURRENT_COORDINATES" ? await getFunction(`weather/city/${props.search}`) : await getFunction(`weather/coordinates?lat=${props.lat}&lon=${props.lon}`)
        if (response) {
            setWeather(response.weather)
            setImage(response.image)
            props.favorites.includes(response.weather.name.toLowerCase()) && setFavorite(true)
            props.setInput("")
        } else {
            console.log(response)
        }
        setLoading(false)
    }


    return <div style={{ paddingTop: "10vh", backgroundImage: `url("${image}")`, minHeight: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "top" }}>
        <Container className={props.theme ? "pt-4" : "invert pt-4"}>
            {loading ? <div className="mt-5">Loading...</div> : (weather ? <WeatherToday favorite={favorite} weather={weather} setLoading={setLoading} /> :
                <h2 className="mt-5"> Sorry!!! No weather data found for "{props.search}",<br />
                    <span> Please try again with another city...</span></h2>)}
        </Container>
    </div>
}


export default WeatherDetails;