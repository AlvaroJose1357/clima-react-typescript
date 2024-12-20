export const formatTemperature = (temp: number): number => {
  const kelvin = 273.15;
  // si lo queremos en fahrenheit seria 1.8 * (temp - kelvin) + 32
  // return temp - kelvin;
  // si queremos que solo tenga 2 decimales
  // return parseFloat((temp - kelvin).toFixed(2));
  // si queremos que sea un entero
  return parseInt((temp - kelvin).toString());
};
