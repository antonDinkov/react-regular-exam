import { useState } from 'react';
import styles from './App.module.css';

function App() {

    return (
        <>
            <main>
                <h1 className={styles.logo}>At</h1>
                <div>
                    <h1 className={styles.happening}>Happening now</h1>
                    <h2>Join Today.</h2>
                    <nav>
                        <button className={styles.awesome}><i className="fa-brands fa-google"></i>Sign up with Google</button>
                        <button className={styles.awesome}><i className="fa-brands fa-apple"></i>Sign u with Apple</button>
                        <div className={styles.separator}>
                            <hr />
                            <p>or</p>
                            <hr />
                        </div>
                        <button>Create account</button>
                        <p className={styles.terms}>By signing up, you agree of the <a href="#">Term of Service</a>and <a href="#">Privacy Policy</a>, incliding <a href="#">Cookie Use.</a></p>
                        <p id="account">Already have an account?</p>
                        <button>Sign in</button>
                        <p>Take a look:</p>
                        <button>Guest</button>
                    </nav>
                </div>
            </main>
            <footer>
                <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Download the At app</a></li>
                    <li><a href="#">Help Center</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Cookie Policy</a></li>
                    <li><a href="#">Accessibillity</a></li>
                    <li><a href="#">Ads Info</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Brand Resources</a></li>
                    <li><a href="#">Advertising</a></li>
                    <li><a href="#">Marketing</a></li>
                    <li><a href="#">At for Business</a></li>
                    <li><a href="#">Developers</a></li>
                    <li><a href="#">Directory</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a className={styles.flexli} href="#"><i className="fa-regular fa-copyright"></i>2025 X Corp</a></li>
                </ul>
            </footer>
        </>
    )
}

export default App
