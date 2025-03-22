import { Link, useNavigate } from "react-router";
import styles from './CreateNext.module.css'

function CreateNext() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/react-regular-exam/guest')
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.wrapperMajor}>
                <header className={styles.header}>
                    <Link className={styles.x} to='/react-regular-exam'><i className="fa-solid fa-xmark"></i></Link>
                    <h1 className={styles.logo}>At</h1>
                </header>
                <main className={styles.main}>
                    <div className={styles.wrapper}>
                        <h1>Customize your experience</h1>
                        <div className={styles.checkBoxWrapper}>
                            <div>
                                <h3>Get more out of At</h3>
                                <div>
                                    <p>Receive email about your At activity and recommendations.</p>
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                            <div>
                                <h3>Connect with people you know</h3>
                                <div>
                                    <p>Let others find your At account by your email address.</p>
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                            <div>
                                <h3>Personalized ads</h3>
                                <div>
                                    <p>You will always see ads on At based on your At activity. When this setting is enabled, At may further personalize ads from At advertisers, on and off At, by combining your At activity with other online activity and information from our partners.</p>
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>

                        <p>
                            By signing up, you agree to our <Link>Terms</Link>, <Link>Privacy Policy</Link>, and <Link>Cookie Use</Link>. At may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. <Link>Learn more</Link>
                        </p>
                    </div>
                    <div className={styles.button}>
                        <input type="submit" value="Next" />
                    </div>
                </main>
            </div>
        </form>
    )
};

export default CreateNext;