export interface IWeatherResponse{
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives?: ILive[];
  forecasts?: IForecast[];
}

export interface ILive{
  province: string;
  city:string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

export interface IForecast{
  city: string;
  adcode: string;
  province: string;
  reporttime: string;
  casts: ICast[];
}

export interface ICast{
  date: string;
  week: string;
  dayweather: string;
  nightweather: string;
  daytemp: string;
  nighttemp: string;
  daywind: string;
  nightwind: string;
  daypower: string;
  nightpower: string;
}
