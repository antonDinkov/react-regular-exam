import { Link } from 'react-router'
import styles from './LoginNext.module.css'

function LoginNext(params) {
    return (
        <div className={styles.wrapperMajor}>
            <header className={styles.header}>
                <Link className={styles.x} to='/react-regular-exam'><i className="fa-solid fa-xmark"></i></Link>
                <h1 className={styles.logo}>At</h1>
            </header>
            <main className={styles.main}>
                <div className={styles.mainDiv}>
                    <div className={styles.upperDiv}>
                        <h1>Enter your password</h1>
                        <div className={styles.emailState}>
                            <p>Email</p>
                            <p>client@email.com</p>
                        </div>
                        <div className={styles.password}>
                            <div className={styles.arrow}>
                                <p>Password</p>
                                <i class="fa-solid fa-arrow-down"></i>
                            </div>

                            <div className={styles.inputWrapper}>
                                <input className={styles.pass} type="password" name="" id="" placeholder='' />
                                <i className="fa-regular fa-eye"></i>
                            </div>

                        </div>
                        <p className={styles.forgot}><Link>Forgot password?</Link></p>
                    </div>
                    <div>
                        <Link to='/react-regular-exam/welcome'>Log in</Link>
                        <div className={styles.signup}>
                            <p>Don't have an account?</p>
                            <Link to='/create'>Sign up</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LoginNext