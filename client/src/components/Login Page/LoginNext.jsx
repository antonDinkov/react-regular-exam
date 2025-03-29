import { Link, useNavigate } from 'react-router'
import styles from './LoginNext.module.css'
import { useContext, useEffect, useState } from 'react'
import { FormContext } from '../../../context/UserContext'
import { loginUser } from '../HTTP/registerAndLogin';
import LoadingSpinner from '../Loading spinner/Spinner';

function LoginNext() {
    const { formData, updateForm } = useContext(FormContext);
    const navigate = useNavigate();
    const [shouldLogin, setShouldLogin] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setSpinner(true)
        const pass = {password: e.target.elements.password?.value}
        if (!pass) {return alert ('You need to provide a password')};
        await updateForm(pass);
    }

    useEffect(() => {
        if (!formData.password) {
                    return;
                }
                const login = async () => {
                    try {
                        const userInfo = await loginUser(formData);
                        await updateForm(userInfo);
                        navigate('/react-regular-exam/welcome');
                        setSpinner(false);
                    } catch (error) {
                        alert (error.message);
                    }
                }
                login();
    }, [formData.password])

    return (
        <form onSubmit={submitHandler}>
            <div className={styles.wrapperMajor}>
            {spinner && <LoadingSpinner />}
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
                                <p>{formData.email}</p>
                            </div>
                            <div className={styles.password}>
                                <div className={styles.arrow}>
                                    <p>Password</p>
                                    <i className="fa-solid fa-arrow-down"></i>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <input className={styles.pass} type="password" name="password" id="" placeholder='' />
                                    <i className="fa-regular fa-eye"></i>
                                </div>

                            </div>
                            <p className={styles.forgot}><Link>Forgot password?</Link></p>
                        </div>
                        <div className={styles.login}>
                            <input name='login' type='submit' value='Log in' />
                            <div className={styles.signup}>
                                <p>Don't have an account?</p>
                                <Link to='/create'>Sign up</Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </form>

    )
}

export default LoginNext