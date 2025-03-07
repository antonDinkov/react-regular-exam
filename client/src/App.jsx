import styles from './App.module.css';

function App() {

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.logo}>At</h1>
                <div>
                    <h1 className={styles.happening}>Happening now</h1>
                    <h2 className={styles.h2}>Join Today.</h2>
                    <nav className={styles.nav}>
                        <button className={`${styles.button} ${styles.awesome}`}><i className="fa-brands fa-google"></i>Sign up with Google</button>
                        <button className={`${styles.button} ${styles.awesome}`}><i className="fa-brands fa-apple"></i>Sign up with Apple</button>
                        <div className={styles.separator}>
                            <hr className={styles.hr} />
                            <p>or</p>
                            <hr className={styles.hr} />
                        </div>
                        <button className={styles.button}>Create account</button>
                        <p className={styles.terms}>By signing up, you agree of the <a href="#">Term of Service</a>and <a href="#">Privacy Policy</a>, incliding <a href="#">Cookie Use.</a></p>
                        <p id="account">Already have an account?</p>
                        <button className={styles.button}>Sign in</button>
                        <p>Take a look:</p>
                        <button className={styles.button}>Guest</button>
                    </nav>
                </div>
            </main>
            <footer>
                <ul className={styles.ul}>
                    <li className={styles.li}><a href="#">About</a></li>
                    <li className={styles.li}><a href="#">Download the At app</a></li>
                    <li className={styles.li}><a href="#">Help Center</a></li>
                    <li className={styles.li}><a href="#">Terms of Service</a></li>
                    <li className={styles.li}><a href="#">Privacy Policy</a></li>
                    <li className={styles.li}><a href="#">Cookie Policy</a></li>
                    <li className={styles.li}><a href="#">Accessibillity</a></li>
                    <li className={styles.li}><a href="#">Ads Info</a></li>
                    <li className={styles.li}><a href="#">Blog</a></li>
                    <li className={styles.li}><a href="#">Careers</a></li>
                    <li className={styles.li}><a href="#">Brand Resources</a></li>
                    <li className={styles.li}><a href="#">Advertising</a></li>
                    <li className={styles.li}><a href="#">Marketing</a></li>
                    <li className={styles.li}><a href="#">At for Business</a></li>
                    <li className={styles.li}><a href="#">Developers</a></li>
                    <li className={styles.li}><a href="#">Directory</a></li>
                    <li className={styles.li}><a href="#">Settings</a></li>
                    <li className={styles.li}><a className={styles.flexli} href="#"><i className="fa-regular fa-copyright"></i>2025 X Corp</a></li>
                </ul>
            </footer>
        </div>
    )
}

export default App
