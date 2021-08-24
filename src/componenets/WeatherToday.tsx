import { SIGXFSZ } from 'constants';
import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Container, Image, Jumbotron, Row } from 'react-bootstrap';
import { PropsWeatherToday } from '../types/interfaces';
import { postFunction } from './CRUDFunctions';
import WeatherHourly from './WeatherHourly';
import WeatherWeekly from './WeatherWeekly';
const WeatherToday = (props: PropsWeatherToday) => {
    const { coord, main, name, weather, wind, sys, visibility } = props.weather;
    const [fav, setFav] = useState(props.favorite)
    const todate = (num: number) => {
        const date = new Date(num * 1000)
        const humanReadable = date.toLocaleString("en-US", { hour: "numeric" })
        return (humanReadable)
    }

    const handleFavorite = async () => {
        const user = await postFunction("users/addorRemovelocation", { location: `${name}, ${sys.country}` })
        user.favoriteLocations.includes(name.toLowerCase()) ? setFav(true) : setFav(false)
    }
    return <div>
        <h1> {name}, {sys.country} ,  <b onClick={handleFavorite} style={{ cursor: "pointer" ,color:"white", textShadow:"0px 0px 11px rgba(0, 0, 63, 1)"}} className="float-right"> <i className={fav ? 'fa fa-star ml-5' : 'far fa-star ml-5'} aria-hidden='true'></i></b> </h1>

        <Jumbotron fluid className=" p-4 m-0 d-flex">
            <Container>
                <Row><h3>Today</h3></Row>
                <Row className="d-flex text-left m-auto">
                    <Col sm={3} className="rounded m-auto">
                        <Image src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`} fluid />
                        <h4>{weather.map((w) => w.description + " ")}</h4>
                    </Col>
                    <Col sm={3} className="d-flex flex-column align-content-start m-auto">
                        <h5> Avg Temp : <b>{(main.temp - 273.15).toFixed(1)} C</b></h5>
                        <h5> Max : <b>{(main.temp_max - 273.15).toFixed(1)} C</b></h5>
                        <h5>Min: <b>{(main.temp_min - 273.15).toFixed(1)} C</b></h5>
                        <h5>Feels: <b>{(main.feels_like - 273.15).toFixed(1)} C</b></h5>
                        <h5>Sunrise: <b>{todate(sys.sunrise)} </b></h5>
                        <h5>Sunset: <b>{todate(sys.sunset)} </b></h5>
                    </Col>
                    <Col sm={4} className="border-left mx-3 px-3 border-secondary m-auto">
                        <h4>Wind</h4>
                        <h5>Speed: {wind.speed} km/h</h5>
                        <h5>Deg: {wind.deg}°</h5>
                        <div className="border-top my-3 py-1"></div>
                        <h5>Humidity: {main.humidity} km/h</h5>
                        <h5>Pressure: {main.pressure}</h5>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
        <Container className="w-100 p-0 m-0">
            <Row><WeatherHourly lat={coord.lat} lon={coord.lon} setLoading={props.setLoading} /></Row>
            <Row><WeatherWeekly lat={coord.lat} lon={coord.lon} /></Row>
        </Container>
    </div>;
}

export default WeatherToday;
