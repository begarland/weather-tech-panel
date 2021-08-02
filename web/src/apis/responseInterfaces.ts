export interface ICurrentWeatherByZipCode {
    coord: {
        lon: number
        lat: number
    }
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ]
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
        gust: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}

export interface IForecastByZipCode {
    cod: string
    message: number
    cnt: number
    list: IForecastList[]
    city: {
        id: number
        name: string
        coord: {
            lat: number
            lon: number
        }
        country: string
        population: number
        timezone: number
        sunrise: number
        sunset: number
    }
}

export interface IForecastList {
    dt: number
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        sea_level: number
        grnd_level: number
        humidity: number
        temp_kf: number
    }
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ]
    clouds: {
        all: number
    }
    wind: {
        speed: number
        deg: number
        gust: number
    }
    visibility: number
    pop: number
    rain: any
    sys: any
    dt_txt: string
}

export interface ICurrentWeatherAndForecastByLatLon {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current: ICurrentForecast
    minutely: IMinutelyForecast[]
    hourly: IHourlyForecast[]
    daily: IDailyForecast[]
}

export interface ICurrentForecast {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ]
}

export interface IMinutelyForecast {
    dt: number
    precipitation: number
}

export interface IHourlyForecast {
    dt: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ]
    pop: number
}

export interface IDailyForecast {
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    temp: {
        day: number
        min: number
        max: number
        night: number
        eve: number
        morn: number
    }
    feels_like: {
        day: number
        night: number
        eve: number
        morn: number
    }
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ]
    clouds: number
    pop: number
    uvi: number
}
