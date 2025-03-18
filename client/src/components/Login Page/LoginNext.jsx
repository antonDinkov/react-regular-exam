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
                    <div>
                        <h1>Enter toyr password</h1>
                        <div className='emailState'>
                            <p>Email</p>
                            <p>client@email.com</p>
                        </div>
                        <div className={styles.password}>
                            <p>Password</p>
                            <input className={styles.pass} type="password" name="" id="" />
                            <i class="fa-regular fa-eye"></i>
                        </div>
                        <p className={styles.forgot}>Forgot password?</p>
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