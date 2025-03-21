import { Link, useNavigate } from "react-router";
import styles from "./Login.module.css"
import { useContext, useState } from "react";
import { FormContext } from "../../../context/UserContext";
function Login() {
    const navigate = useNavigate();
    const {updateForm} = useContext(FormContext);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {email: e.target.elements.email?.value || ''}
        if (!updatedFormData.email) {
            return alert ('You must enter a valid email address');
        }
        await updateForm(updatedFormData);
        navigate('/react-regular-exam/login/pass')
    };
    return (
        /* action използвам само когато изпращам данни към бекенда */
        <form onSubmit={handleSubmit}>
            <div className={styles.wrapperMajor}>
                <header className={styles.header}>
                    <Link className={styles.x} to='/react-regular-exam'><i className="fa-solid fa-xmark"></i></Link>
                    <h1 className={styles.logo}>At</h1>
                </header>
                <main className={styles.main}>
                    <div className={styles.mainDiv}>
                        <h1>Sign in to At</h1>
                        <nav className={styles.nav}>
                            <button type="button" className={`${styles.button} ${styles.awesome} ${styles.google}`}><i className="fa-brands fa-google"></i>Sign in with Google</button>
                            <button type="button" className={`${styles.button} ${styles.awesome}`}><i className="fa-brands fa-apple"></i>Sign in with Apple</button>
                            <div className={styles.separator}>
                                <hr className={styles.hr} />
                                <p>or</p>
                                <hr className={styles.hr} />
                            </div>
                            <input name="email" className={styles.input} type="email" placeholder="email" />
                            <button className={`${styles.button} ${styles.awesome} ${styles.next}`}>Next</button>
                            <button type="button" className={`${styles.button} ${styles.awesome}`} to="/react-regular-exam/guest">Forgot password?</button>
                            <p className={styles.lastParagraph}>Don't have an account?<Link to="/react-regular-exam/create">Sign up</Link></p>
                        </nav>
                    </div>
                </main>

            </div>
        </form>
    )
}

export default Login;