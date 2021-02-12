import React, { useState } from 'react';
import { Form, FormControl, Jumbotron, Nav, Navbar } from 'react-bootstrap';
import { Button, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { CitySuggest } from '../../types/interfaces';
import WeatherDetails from '../WeatherDetails';

const SearchPage = () => {
    const [search, setSearch] = useState("")
    const [input, setInput] = useState("")
    const [start, setStart] = useState(false)
    const [theme, setTheme] = useState(true)
    const [suggestions, setSuggestions] = useState<string[]>([])


    const unique = (value: string, index: number, self: string[]) => {
        return self.indexOf(value) === index;
    };
    const getSuggestions = async (text: string) => {
        try {
            setTimeout(() => 1000)
            const response = await fetch(process.env.REACT_APP_LOCATION_URL + text, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "49f4e1e876msh90846b28b1ca30fp193c58jsn17d62173eae9",
                    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
                }
            })
            if (response.ok) {
                const data = await response.json()
                const suggestionsArray = data.data.map((l: CitySuggest) => l.name.split(" ")[0]).filter(unique)
                setSuggestions(suggestionsArray)
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)

        }
    }
    const changeSuggestion = (text: string) => {
        setInput(text)
        if (text.length > 3) {
            getSuggestions(text)
        }
    }

    return <div>

        <Navbar bg={theme ? "light" : "dark"} expand="lg">
            <Container>
                <Navbar.Brand href="#" className={theme ? "" : "text-white"}>Strive Weather App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav " >
                    <Form inline className="w-75 position-relative" onSubmit={(e) => { e.preventDefault(); setSearch(input); setStart(true); setInput(""); setSuggestions([]) }}>
                        <FormControl onBeforeInput={() => setStart(false)} type="text" value={input} onChange={(e) => changeSuggestion(e.target.value)} placeholder="Enter a city" className="mr-sm-2 w-75 " />
                        <Button variant={theme ? "outline-primary" : "outline-light"} type="submit" disabled={input.length <= 0} >WEATHER</Button>
                        <div className={suggestions.length < 1 ? "dropdown-menu" : "dropdown-menu show w-75"} >
                            {suggestions.length > 0 && suggestions.map((s) => <Button variant="link" onClick={() => { setSearch(s); setStart(true); setInput(""); setSuggestions([]) }} className="dropdown-item" >{s}</Button>)}
                        </div>
                    </Form>

                    <Form className="w-25" style={{ position: "relative", left: "150px", maxWidth: "100px" }}>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={theme ? "Dark" : "Light"}
                            onChange={() => setTheme(!theme)}
                            className={theme ? "" : "text-white"}
                        />
                    </Form>

                </Navbar.Collapse>

            </Container>
        </Navbar >

        {start ? <div className="weather w-100 m-0 p-0" >
            < WeatherDetails search={search} setInput={setSearch} theme={theme} />
        </div > :
            <Jumbotron className="m-0 " fluid style={{ minHeight: "100vh", backgroundImage: `${theme ? 'url("https://images.theconversation.com/files/232705/original/file-20180820-30593-1nxanpj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip")' : 'url("https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2017/08/Lauarvann-Aurora-Metorite-e1502725566161.jpg?resize=750%2C500&ssl=1"'}`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
                <Container className="p-5 mt-5">
                    <h1 className={theme ? "" : "text-white"}>Welcome to Strive Weather App</h1>
                    <h4 className={theme ? "" : "text-white"}>Get the weather for any city</h4>
                </Container>
            </Jumbotron>

        }

    </div >;
}
export default SearchPage;