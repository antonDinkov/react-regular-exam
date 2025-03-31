import { useRef } from "react";
import styles from "./Welcome.module.css";
import { Outlet } from "react-router";
import Navbar from "../Navbar";

function Welcome() {
    const mainRef = useRef(null);

    return (
        <div className={styles.container}>
            <Navbar />
            <main ref={mainRef} className={styles.main}> 
                <Outlet context={{ mainRef }} />
            </main>
        </div>
    );
};

export default Welcome;