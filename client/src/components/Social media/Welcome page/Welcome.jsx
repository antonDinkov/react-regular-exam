import styles from "./Welcome.module.css";
import { Outlet } from "react-router";
import Navbar from "../Navbar";


function Welcome({children}) {
    
    return (
        <div className={styles.container}>
            <Navbar />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
};

export default Welcome;