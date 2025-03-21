import { Link } from 'react-router';
import styles from './Create.module.css';


function Create() {
    return (
        <div className={styles.wrapperMajor}>
            <header className={styles.header}>
                <Link className={styles.x} to='/react-regular-exam'><i className="fa-solid fa-xmark"></i></Link>
                <h1 className={styles.logo}>At</h1>
            </header>
            <main className={styles.main}>
                <div className={styles.mainDiv}>
                    <div className={styles.upperDiv}>
                        <h1>Create your account</h1>
                        <div className={styles.password}>
                            <div className={styles.arrow}>
                                <p>Name</p>
                                <i className="fa-solid fa-arrow-down"></i>
                            </div>

                            <div className={styles.inputWrapper}>
                                <input className={styles.pass} type="text" name="" id="" placeholder='' />
                            </div>
                        </div>
                        <div className={styles.password}>
                            <div className={styles.arrow}>
                                <p>Email</p>
                                <i className="fa-solid fa-arrow-down"></i>
                            </div>

                            <div className={styles.inputWrapper}>
                                <input className={styles.pass} type="email" name="" id="" placeholder='' />
                            </div>
                        </div>
                        <div className={styles.birth}>
                            <p>Date of Birth</p>
                            <p>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                            <div className={styles.birthday}>
                                <div className={styles.month}>
                                    <p>month</p>
                                    <select name="month" id="month">
                                        <option value=""></option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </div>
                                <div className={styles.day}>
                                    <p>Day</p>
                                    <select name="day" id="day">
                                        <option value=""></option>
                                        {Array.from({ length: 31 }, (_, index) => (
                                            <option key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.year}>
                                    <p>Year</p>
                                    <select name="year" id="year">
                                        <option value=""></option>
                                        {Array.from({ length: 121 }, (_, index) => (
                                            <option key={index + 1905} value={index + 1905}>
                                                {index + 1905}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={styles.login}>
                        <Link to='/react-regular-exam/welcome'>Next</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Create