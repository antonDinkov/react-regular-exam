import { Link } from "react-router";
import styles from "./UnderConstruction.module.css";
import { useEffect, useState } from "react";
import { getUserToken } from "../HTTP/localeStorageApi";

const UnderConstruction = () => {
    const [hasAccess, setHasAccess] = useState(false);

    useEffect (()=>{
        const token =  () => {
            getUserToken();
        }
        token();
        if (token) {
            setHasAccess(true);
        }
    },[]);
    
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>Under Construction</h1>
            {hasAccess ? (
                <Link to="/react-regular-exam/welcome" className={styles.link}>Go Back</Link>
            ) : (
                <Link to="/react-regular-exam" className={styles.link}>Go Back</Link>
            )}

        </div>
    );
};

export default UnderConstruction;