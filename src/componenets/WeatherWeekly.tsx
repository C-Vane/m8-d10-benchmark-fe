import React, { useEffect, useState } from 'react';
import { Container, Jumbotron, Col, Image } from 'react-bootstrap';
import Scrollbars from 'react-custom-scrollbars';
import { Coord, Daily } from '../types/interfaces';
import { getFunction } from './CRUDFunctions';

const WeatherWeekly = (props: Coord) => {
    const [weekly, setWeekly] = useState<Daily[]>([])
    useEffect(() => {
        getWeek()
    }, [])
    const getWeek = async () => {
        const response = await getFunction(`weather/getWeek?lat=${props.lat}&lon=${props.lon}`)
        console.log(response)
        if (response) {
            setWeekly(response)
        } else {
            console.log(response)
        }
    }
    const todate = (num: number) => {
        const date = new Date(num * 1000)
        const humanReadable = date.toLocaleString("en-US", { weekday: "long" })
        return (humanReadable)
    }
    return <div className="text-left w-100">
        <Jumbotron fluid className=" p-3 m-3  d-flex">
            <Scrollbars style={{ width: "100%", minHeight: "250px" }}>
                <Container className="container d-flex " style={{ width: "100%", minHeight: "250px" }}>
                    {weekly.length > 0 && weekly.map((d) => {
                        const { weather, temp, pressure, humidity, dt } = d;
                        return <Col style={{ minWidth: "200px" }} className="border-right">
                            <Col className="rounded">
                                <Image src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} fluid />
                                <b className="text-nowrap">{weather.map((w) => w.description + " ")}</b>
                            </Col>
                            <Col className="d-flex flex-column text-nowrap align-content-start">
                                <p> Temperature : <b>{(temp.day - 273.15).toFixed(1)} C</b></p>
                                <b>{todate(dt)}</b>
                            </Col>
                        </Col>
                    })}

                </Container>
            </Scrollbars>
        </Jumbotron>
    </div>;;
}

export default WeatherWeekly;