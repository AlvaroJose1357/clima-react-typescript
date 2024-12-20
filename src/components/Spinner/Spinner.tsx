import styles from "./Spinner.module.css";
export default function Spinner() {
  // si lo queremos utilizar como modulos esta seria la manera ya que se estan utilizando varias clases en un solo elemento
  // si se quiere utilizar como un solo archivo css se puede hacer de la siguiente manera
  // import "./Spinner.css";
  // return <div className="sk-circle"></div>;
  return (
    <div className={styles["sk-circle"]}>
      <div className={`${styles["sk-circle1"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle2"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle3"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle4"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle5"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle6"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle7"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle8"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle9"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle10"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle11"]} ${styles["sk-child"]}`}></div>
      <div className={`${styles["sk-circle12"]} ${styles["sk-child"]}`}></div>
    </div>
  );
}
