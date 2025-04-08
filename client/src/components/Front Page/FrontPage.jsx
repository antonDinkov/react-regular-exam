import { useContext, useEffect } from "react";
import styles from "./FrontPage.module.css"
import { Link } from "react-router";
import { FormContext } from "../../../context/UserContext";

function FrontPage() {
    const {resetFormData} = useContext(FormContext);
    useEffect (()=>{
        resetFormData();
        return () => {
            console.log('Front page unmounted');
        }
    }, []);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.logo}>At</h1>
                <div>
                    <h1 className={styles.happening}>Happening now</h1>
                    <h2 className={styles.h2}>Join Today.</h2>
                    <nav className={styles.nav}>
                        <Link to="/react-regular-exam/about" className={`${styles.button} ${styles.awesome}`}><i className="fa-brands fa-google"></i>Sign up with Google</Link>
                        <Link to="/react-regular-exam/about" className={`${styles.button} ${styles.awesome}`}><i className="fa-brands fa-apple"></i>Sign up with Apple</Link>
                        <div className={styles.separator}>
                            <hr className={styles.hr} />
                            <p>or</p>
                            <hr className={styles.hr} />
                        </div>
                        <Link to='/react-regular-exam/create' className={styles.button}>Create account</Link>
                        <p className={styles.terms}>By signing up, you agree of the <Link to="/react-regular-exam/about">Term of Service</Link>and <Link to="/react-regular-exam/about">Privacy Policy</Link>, incliding <Link to="/react-regular-exam/about">Cookie Use.</Link></p>
                        <p id="account">Already have an account?</p>
                        <Link to="/react-regular-exam/login" className={styles.button}>Sign in</Link>
                        <p>Take a look:</p>
                        <Link to="/react-regular-exam/guest" className={styles.button}>Guest</Link>
                    </nav>
                </div>
            </main>
            <footer>
                <ul className={styles.ul}>
                    <li className={styles.li}><Link to="/react-regular-exam/about">About</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Download the At app</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Help Center</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Terms of Service</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Privacy Policy</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Cookie Policy</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Accessibillity</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Ads Info</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Blog</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Careers</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Brand Resources</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Advertising</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Marketing</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">At for Business</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Developers</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Directory</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about">Settings</Link></li>
                    <li className={styles.li}><Link to="/react-regular-exam/about" className={styles.flexli} href="#"><i className="fa-regular fa-copyright"></i>2025 X Corp</Link></li>
                </ul>
            </footer>
        </div>
    )
}

export default FrontPage;