import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Jumbotron, Row } from 'react-bootstrap';
import Scrollbars from 'react-custom-scrollbars';
import { Coord, Hourly } from '../types/interfaces';

const WeatherHourly = (props: Coord) => {
    const [hourly, setHourly] = useState<Hourly[]>([])
    useEffect(() => {
        getHourly()
    }, [props])
    const getHourly = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_WEATHER_URL_ONECALL + `?lat=${props.lat}&lon=${props.lon}&exclude=current,daily,minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units="metric"`)
            if (response.ok) {
                const data = await response.json()
                setHourly(data.hourly)
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)

        }

    }

    const todate = (num: number) => {
        const date = new Date(num * 1000)
        const humanReadable = date.toLocaleString("en-US", { weekday: "long" }) + " " + date.toLocaleString("en-US", { hour: "numeric" })
        return humanReadable
    }
    return <div className="text-left mt-5 w-100">
        <Jumbotron fluid className="p-3 mx-3 mt-1 d-flex">


            <Scrollbars style={{ width: "100%", minHeight: "250px" }}>
                <Container className="container d-flex " style={{ width: "100%", minHeight: "250px" }}>

                    {hourly.length > 0 && hourly.map((h, key) => {
                        const { weather, temp, feels_like, pressure, humidity, dt } = h;
                        return <Col key={key} style={{ minWidth: "200px" }} className="border-right ">
                            <Col className="rounded text ">
                                <Image src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} fluid />
                                <b className="text-nowrap">{weather.map((w) => w.description + " ")}</b>
                            </Col>
                            <Col className="d-flex flex-column text-nowrap align-content-start">
                                <p>Avg. Temp : <b>{(temp - 273.15).toFixed(1)} C</b></p>
                                <p>Feels: <b>{(feels_like - 273.15).toFixed(1)} C</b></p>
                                <b>{todate(dt)}</b>
                            </Col>
                        </Col>
                    })}
                </Container>
            </Scrollbars>


        </Jumbotron>
    </div >;
}

export default WeatherHourly;