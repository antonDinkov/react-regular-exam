import { Link } from "react-router";
import styles from "./UnderConstruction.module.css";

const UnderConstruction = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Under Construction</h1>
      <Link to="/react-regular-exam" className={styles.link}>Go Back</Link>
    </div>
  );
};

export default UnderConstruction;