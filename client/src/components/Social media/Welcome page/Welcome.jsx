/* import styles from "./Welcome.module.css";
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

export default Welcome; */

import { useRef } from "react";
import styles from "./Welcome.module.css";
import { Outlet } from "react-router";
import Navbar from "../Navbar";

function Welcome() {
    const mainRef = useRef(null); // 👈 Създаваме референция за <main>

    return (
        <div className={styles.container}>
            <Navbar />
            <main ref={mainRef} className={styles.main}> 
                <Outlet context={{ mainRef }} /> {/* 👈 Предаваме mainRef надолу */}
            </main>
        </div>
    );
};

export default Welcome;