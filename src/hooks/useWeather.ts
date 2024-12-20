import axios from "axios";
import { z } from "zod";
//import { InferOutput, number, object, parse, string } from "valibot";
import { SearchType } from "../types";
import { useMemo, useState } from "react";

//? Type Guards
// unknown es un tipo de datos que no sabemos que tipo de dato es, en el momento de compilacion
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_min === "number" &&
//     typeof (weather as Weather).main.temp_max === "number"
//   );
// }
//? Utilizando ZOD
// utiliza un schema para validar la data que estamos recibiendo
const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});
export type Weather = z.infer<typeof WeatherSchema>;

//? Utilizando Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });
// type Weather = InferOutput<typeof WeatherSchema>;

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async (search: SearchType) => {
    const APIkey = import.meta.env.VITE_API_KEY_OPEN_WEATHER;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${APIkey}`
      );

      // console.log(data);

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherResult = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;

      //? castear el type de data a Weather
      // const { data: weatherData } = await axios.get<Weather>(weatherResult);
      // console.log(weatherData.main.temp);
      /* esta la podemos usar asi de afanes ya que estariamos forzando a que sea de este type y si llegado caso llegase a cambiar tocaria modificar */

      //? Type Guards
      // const { data: weatherData } = await axios.get(weatherResult);
      // const result = isWeatherResponse(weatherData);
      // if (result) {
      //   console.log(weatherData.main.temp);
      // }
      /*Bsuca por medio de una funcion externa que dicha solicitud la cual estamos haciendo cumpla con dicha extructura, tampoco es mantenible, bueno si nos piden hacerlo de una forma sin librerias */

      //? Utilizando ZOD
      const { data: weatherData } = await axios.get(weatherResult);
      const result = WeatherSchema.safeParse(weatherData);
      if (result.success) {
        setWeather(result.data);
      }
      /* Utiliza un schema para validar la data que estamos recibiendo, es mas mantenible y mas facil de leer, pero tiene el mismo problema del anterior que si la base esta mal formada da error */

      //? Utilizando Valibot
      // const { data: weatherData } = await axios.get(weatherResult);
      // const result = parse(WeatherSchema, weatherData);
      // if (result) {
      //   console.log(result.name);
      //   console.log(result.main.temp);
      // }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);
  return { weather, loading, fetchWeather, hasWeatherData };
}

// const [weather, setWeather] = useState<Weather | null>(null);
// const [loading, setLoading] = useState<boolean>(true);
// const [error, setError] = useState<string | null>(null);
// useEffect(() => {
//   const fetchWeather = async () => {
//     try {
//       const response = await fetch(
//         "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch weather data");
//       }
//       const data = await response.json();
//       setWeather({
//         temperature: data.main.temp,
//         description: data.weather[0].description,
//       });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchWeather();
// }, []);
// return { weather, loading, error };
