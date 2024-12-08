import { useState } from "react";
import { countries } from "../../data/countries";
import type { SearchType } from "../../types";
import styles from "./Form.module.css";
import Alert from "../Alert/Alert";

export default function Form() {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });
  const [alert, setAlert] = useState<string>("");

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if(search.city.trim() === '' || search.country.trim() === '') {}

    // if (!search.city || !search.country) {
    //   console.log("Todos los campos son obligatorios");
    //   return;
    // }

    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }
    console.log(search);
  };
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}>
      {alert && <Alert> {alert} </Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Cuidad:</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Escribe el nombre de la ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Pais</label>
        <select
          id="country"
          name="country"
          value={search.country}
          onChange={handleChange}>
          <option value="">-- Seleccione un país --</option>
          {countries.map((country) => (
            <option
              key={country.code}
              value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input
        className={styles.submit}
        type="submit"
        value="Consultar Clima"
      />
    </form>
  );
}
