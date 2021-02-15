import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { PropsWeatherDetails, WeatherMain } from '../types/interfaces';
import WeatherToday from './WeatherToday';

const WeatherDetails = (props: PropsWeatherDetails) => {
    const [weather, setWeather] = useState<WeatherMain>()
    const [image, setImage] = useState("")

    useEffect(() => {
        const hr = new Date().getHours()
        props.search.length > 0 && getWeather() && (hr > 17 || hr < 6) ? getImage("night") : getImage("day")
    }, [props.search])
    const getWeather = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_WEATHER_URL_CURRENT + `?q=${props.search}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units="metric"`)
            if (response.ok) {
                const data = await response.json()
                setWeather(data)
                props.setInput("")
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)

        }

    }
    const getImage = async (time: string) => {
        try {
            const response = await fetch(process.env.REACT_APP_LOCATION_IMAGE_URL + props.search)
            if (response.ok) {
                console.log(response)
                const data = await response.json()
                setImage(data.results[0].urls.full)
                console.log(data)
            } else {
                setImage('')
                console.log(response)
            }
        } catch (error) {
            console.log(error)

        }

    }
    return <div style={{ paddingTop: "10vh", backgroundImage: `url("${image || 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?cs=srgb&dl=pexels-quang-nguyen-vinh-2166711.jpg&fm=jpg'}")`, minHeight: "90vh", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "top" }}>
        <Container className={props.theme ? "pt-4" : "invert pt-4"}>
            {weather && image.length > 0 ? <WeatherToday weather={weather} /> : <h2 className="mt-5"> Sorry!!! No weather data found for "{props.search}",<br />
                <span> Please try again with another city...</span></h2>}
        </Container>
    </div>
}


export default WeatherDetails;