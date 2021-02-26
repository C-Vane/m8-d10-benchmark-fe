
export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}
export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}
export interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    rain: number;
    uvi: number;
}
export interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather[];
    pop: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Snow {
    "1h": number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface WeatherMain {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    snow: Snow;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

// city suggestions
export interface CitySuggest {
    city: string,
    country: string,
    countryCode: string,
    distance: number,
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    region: string,
    regionCode: string,
    type: string,
    wikiDataId: string
}

//PROPS
export interface PropsWeatherDetails {
    search: string;
    setInput: (search: string) => void;
    theme: boolean;
    favorites: string[];
    lat: number;
    lon: number;
}
export interface PropsWeatherToday {
    weather: WeatherMain;
    favorite: boolean;
}

export interface User {
    favoriteLocations: string[];
    _id: string;
    img: string;
    name: string;
    surname: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}