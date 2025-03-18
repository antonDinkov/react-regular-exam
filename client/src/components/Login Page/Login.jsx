import { Link } from "react-router";
import styles from "./Login.module.css"
function Login() {
    return (
        <div className={styles.wrapperMajor}>
            <header className={styles.header}>
                <Link className={styles.x} to='/react-regular-exam'><i className="fa-solid fa-xmark"></i></Link>
                <h1 className={styles.logo}>At</h1>
            </header>
            <main className={styles.main}>
                <div className={styles.mainDiv}>
                    <h1>Sign in to At</h1>
                    <nav className={styles.nav}>
                        <Link className={`${styles.button} ${styles.awesome} ${styles.google}`}><i className="fa-brands fa-google"></i>Sign in with Google</Link>
                        <Link className={`${styles.button} ${styles.awesome}`}><i className="fa-brands fa-apple"></i>Sign in with Apple</Link>
                        <div className={styles.separator}>
                            <hr className={styles.hr} />
                            <p>or</p>
                            <hr className={styles.hr} />
                        </div>
                        <input className={styles.input} type="text" placeholder="Phone, email, or username" />
                        <Link className={`${styles.button} ${styles.awesome} ${styles.next}`} to="/react-regular-exam/login/pass">Next</Link>
                        <Link className={`${styles.button} ${styles.awesome}`} to="/react-regular-exam/guest">Forgot password?</Link>
                        <p className={styles.lastParagraph}>Don't have an account?<Link to="/react-regular-exam/create">Sign up</Link></p>
                    </nav>
                </div>
            </main>

        </div>

    )
}

export default Login;