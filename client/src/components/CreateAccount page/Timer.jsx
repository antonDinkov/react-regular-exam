import styles from "./Timer.module.css"
function Timer(props) {
    return (
        <p className={styles.timer}>{props.onTimer}</p>
    )
}

export default Timer;