import React, { useEffect, useState } from "react";
import { Form, FormControl, Jumbotron, Navbar, Dropdown } from "react-bootstrap";
import { Button, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { CitySuggest, User } from "../../types/interfaces";
import { getFunction, postFunction } from "../CRUDFunctions";
import SignUp from "../SignUp";
import WeatherDetails from "../WeatherDetails";

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const [input, setInput] = useState("");
    const [start, setStart] = useState(false);
    const [theme, setTheme] = useState(true);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [signUp, setSignUp] = useState(false);
    const [user, setUser] = useState<User>();
    const [suggest, setSuggest] = useState(false);
    const [currentLon, setCurrentLon] = useState(0);
    const [currentLat, setCurrentLat] = useState(0);

    const unique = (value: string, index: number, self: string[]) => {
        return self.indexOf(value) === index;
    };
    const getSuggestions = async (text: string) => {
        try {
            await setTimeout(() => 1000);
            const response = await fetch(process.env.REACT_APP_LOCATION_URL + text, {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "49f4e1e876msh90846b28b1ca30fp193c58jsn17d62173eae9",
                    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                },
            });
            if (response.ok) {
                const data = await response.json();
                const suggestionsArray = data.data.map((l: CitySuggest) => l.name).filter(unique);
                setSuggestions(suggestionsArray);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getUser = async () => {
        const response = await getFunction("users/me");
        if (response) {
            setUser(response);
        } else {
            setUser(undefined);
            console.log(response);
        }
    };
    const logOut = async () => {
        await postFunction("users/logOut", {});
        window.location.reload();
    };
    const changeSuggestion = (text: string) => {
        if (text.length > 3 && suggest) {
            getSuggestions(text);
        }
        setInput(text);
        setSuggest(!suggest)
    };
    useEffect(() => {
        const hr = new Date().getHours();
        if (hr > 17 || hr < 6) {
            setTheme(false);
        }
        getUser();
    }, []);
    const success = (position: any) => {
        console.log(position.coords.latitude, position.coords.longitude)
        setCurrentLat(position.coords.latitude)
        setCurrentLon(position.coords.longitude)
        console.log(currentLat, currentLon)
        setSearch("CURRENT_COORDINATES");
        setStart(true);
        setInput("");
        setSuggestions([]);
    }
    const error = () => {
        console.log("Location Not found")
    }
    const getbyLocation = () => {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    return (
        <div>
            <Navbar bg={theme ? "light" : "dark"} expand='lg'>
                <Container>
                    <Navbar.Brand href='#' className={theme ? "" : "text-white"}>
                        Strive Weather App
          </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />

                    <Navbar.Collapse id='basic-navbar-nav '>
                        {user && (
                            <>
                                {" "}
                                <Form
                                    inline
                                    className='w-75 position-relative'
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setSearch(input);
                                        setStart(true);
                                        setInput("");
                                        setSuggestions([]);
                                    }}
                                >
                                    <FormControl
                                        onBeforeInput={() => setStart(false)}
                                        type='text'
                                        value={input}
                                        onChange={(e) => changeSuggestion(e.target.value)}
                                        placeholder='Enter a city'
                                        className='mr-sm-2 w-75 '
                                    />
                                    <Button variant={theme ? "outline-primary" : "outline-light"} type='submit' disabled={input.length <= 0}>
                                        WEATHER
                  </Button>

                                    <div className={input.length < 1 ? "dropdown-menu" : "dropdown-menu show w-75"}>
                                        {input.length > 0 && <Button
                                            variant='link'
                                            onClick={getbyLocation}
                                            className='dropdown-item text-primary'
                                        >
                                            <i className="fa fa-location-arrow mr-2" aria-hidden="true"></i> Get Weather by Your current location
                                            </Button>}
                                        {suggestions.length > 0 && <>
                                            {suggestions.map((s) => (
                                                <Button
                                                    variant='link'
                                                    onClick={() => {
                                                        setSearch(s);
                                                        setStart(true);
                                                        setInput("");
                                                        setSuggestions([]);
                                                    }}
                                                    className='dropdown-item'
                                                >
                                                    {s}
                                                </Button>
                                            ))}
                                        </>}
                                    </div>
                                </Form>
                                <Dropdown>
                                    <Dropdown.Toggle variant='link' id='dropdown-basic' onMouseEnter={getUser}>
                                        <i className='far fa-star' aria-hidden='true'></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {user.favoriteLocations.length > 0 ? user.favoriteLocations.map((location, key) => (
                                            <Dropdown.Item
                                                key={key}
                                                onClick={() => {
                                                    setSearch(location);
                                                    setStart(true);
                                                }}
                                            >
                                                {location.toLocaleUpperCase()}
                                            </Dropdown.Item>
                                        )) : <i className="m-2 text-nowrap">No locations Added to Favorites</i>}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )}

                        <Form className='w-25' style={{ position: "absolute", right: "0", maxWidth: "100px" }}>
                            <Form.Check type='switch' id='custom-switch' label={theme ? "Dark" : "Light"} onChange={() => setTheme(!theme)} className={theme ? "" : "text-white"} />
                        </Form>
                    </Navbar.Collapse>
                    {user ? (
                        <Button variant={theme ? "outline-success" : "outline-light"} onClick={() => logOut()}>
                            Log out
                        </Button>
                    ) : (
                            <Button variant={theme ? "outline-success" : "outline-light"} onClick={() => setSignUp(!signUp)}>
                                Sign Up
                            </Button>
                        )}
                </Container>
            </Navbar>

            {start ? (
                <div className='weather w-100 m-0 p-0'>
                    <WeatherDetails search={search} setInput={setSearch} theme={theme} favorites={user ? user.favoriteLocations : []} lat={currentLat} lon={currentLon} />
                </div>
            ) : (
                    <Jumbotron
                        className='m-0 '
                        fluid
                        style={{
                            minHeight: "100vh",
                            backgroundImage: `${theme
                                ? 'url("https://images.theconversation.com/files/232705/original/file-20180820-30593-1nxanpj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip")'
                                : 'url("https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2017/08/Lauarvann-Aurora-Metorite-e1502725566161.jpg?resize=750%2C500&ssl=1"'
                                }`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <Container className='p-5 mt-5'>
                            <h1 className={theme ? "" : "text-white"}>Welcome to Strive Weather App</h1>
                            <h4 className={theme ? "" : "text-white"}>Get the weather for any city</h4>
                            {!user && <h3 className={theme ? "mt-4" : "mt-4 text-white"} > Get started </h3>}
                        </Container>
                    </Jumbotron>
                )}
            {signUp && <SignUp />}
        </div>
    );
};
export default SearchPage;
