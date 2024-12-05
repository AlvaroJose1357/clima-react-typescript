import styles from "./App.module.css";
function App() {
  return (
    <>
      <h1 className={styles.title}>Buscador del clima</h1>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Ciudad"
          className={styles.input}
        />
        <button className={styles.button}>Buscar</button>
      </div>
    </>
  );
}

export default App;
