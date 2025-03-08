import styles from "./FrontPage.module.css"
import { Link } from "react-router";

function FrontPage() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.logo}>At</h1>
                <div>
                    <h1 className={styles.happening}>Happening now</h1>
                    <h2 className={styles.h2}>Join Today.</h2>
                    <nav className={styles.nav}>
                        <Link className={`${styles.button} ${styles.awesome}`}><i className="fa-brands fa-google"></i>Sign up with Google</Link>
                        <Link className={`${styles.button} ${styles.awesome}`}><i className="fa-brands fa-apple"></i>Sign up with Apple</Link>
                        <div className={styles.separator}>
                            <hr className={styles.hr} />
                            <p>or</p>
                            <hr className={styles.hr} />
                        </div>
                        <Link className={styles.button}>Create account</Link>
                        <p className={styles.terms}>By signing up, you agree of the <a href="#">Term of Service</a>and <a href="#">Privacy Policy</a>, incliding <a href="#">Cookie Use.</a></p>
                        <p id="account">Already have an account?</p>
                        <Link className={styles.button}>Sign in</Link>
                        <p>Take a look:</p>
                        <Link to="/react-regular-exam/guest" className={styles.button}>Guest</Link>
                    </nav>
                </div>
            </main>
            <footer>
                <ul className={styles.ul}>
                    <li className={styles.li}><Link to="#">About</Link></li>
                    <li className={styles.li}><Link to="#">Download the At app</Link></li>
                    <li className={styles.li}><Link to="#">Help Center</Link></li>
                    <li className={styles.li}><Link to="#">Terms of Service</Link></li>
                    <li className={styles.li}><Link to="#">Privacy Policy</Link></li>
                    <li className={styles.li}><Link to="#">Cookie Policy</Link></li>
                    <li className={styles.li}><Link to="#">Accessibillity</Link></li>
                    <li className={styles.li}><Link to="#">Ads Info</Link></li>
                    <li className={styles.li}><Link to="#">Blog</Link></li>
                    <li className={styles.li}><Link to="#">Careers</Link></li>
                    <li className={styles.li}><Link to="#">Brand Resources</Link></li>
                    <li className={styles.li}><Link to="#">Advertising</Link></li>
                    <li className={styles.li}><Link to="#">Marketing</Link></li>
                    <li className={styles.li}><Link to="#">At for Business</Link></li>
                    <li className={styles.li}><Link to="#">Developers</Link></li>
                    <li className={styles.li}><Link to="#">Directory</Link></li>
                    <li className={styles.li}><Link to="#">Settings</Link></li>
                    <li className={styles.li}><Link to="#" className={styles.flexli} href="#"><i className="fa-regular fa-copyright"></i>2025 X Corp</Link></li>
                </ul>
            </footer>
        </div>
    )
}

export default FrontPage;