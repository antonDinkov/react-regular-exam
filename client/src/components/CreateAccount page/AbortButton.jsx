import { Link } from "react-router";
import styles from "./AbortButton.module.css"

function AbortButton(props) {
    return (
        <button onClick={props.onClick} className={styles.button}>Abort</button>
    )
}

export default AbortButton;