import axios from "axios";
import { SearchType } from "../types";
export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const APIkey = import.meta.env.VITE_API_KEY_OPEN_WEATHER;
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${APIkey}`
      );

      console.log(data);

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherResult = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
      const { data: weatherData } = await axios.get(weatherResult);
      console.log(weatherData);
    } catch (error) {
      console.error(error);
    }
  };
  return { fetchWeather };
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
