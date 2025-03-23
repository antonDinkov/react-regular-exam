import { Link, useNavigate } from 'react-router';
import styles from './Create.module.css';
import { useContext } from 'react';
import { FormContext } from '../../../context/UserContext';


function Create() {
const {updateForm} = useContext(FormContext);
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        name: e.target.elements.name?.value || '',
        email: e.target.elements.email?.value || '',
        password: e.target.elements.password?.value || '',
        birthday: {
            month: e.target.elements.month?.value || '',
            day: e.target.elements.day?.value || '',
            year: e.target.elements.year?.value || '',
        }
    };
    if (!formData.name) {
        return alert ('You must enter a name!');
    } else if (!formData.email) {
        return alert ('You must enter a valid email address!');
    } else if (!formData.password || formData.password.length < 6) {
        return alert ('You must enter a valid password!');
    } else if (formData.password !== e.target.elements.repeat?.value) {
        return alert ('Password Missmatch!');
    } else if (!formData.birthday.month) {
        return alert ('You must choose a month!');
    } else if (!formData.birthday.day) {
        return alert ('You must choose a day!');
    } else if (!formData.birthday.year) {
        return alert ('You must choose an year!');
    }
    await updateForm(formData);
    navigate('/react-regular-exam/create/submit');
};

    return (
        <form onSubmit={handleSubmit}>
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
                                    <input className={styles.pass} type="text" name="name" id="" placeholder='' />
                                </div>
                            </div>
                            <div className={styles.password}>
                                <div className={styles.arrow}>
                                    <p>Email</p>
                                    <i className="fa-solid fa-arrow-down"></i>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <input className={styles.pass} type="email" name="email" id="" placeholder='' />
                                </div>
                            </div>
                            <div className={styles.password}>
                                <div className={styles.arrow}>
                                    <p>Password</p>
                                    <i className="fa-solid fa-arrow-down"></i>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <input className={styles.pass} type="password" name="password" id="" placeholder='At least 6 characters' />
                                </div>
                            </div>
                            <div className={styles.password}>
                                <div className={styles.arrow}>
                                    <p>Repeat password</p>
                                    <i className="fa-solid fa-arrow-down"></i>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <input className={styles.pass} type="password" name="repeat" id="" placeholder='' />
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
                            <button>Next</button>
                        </div>
                    </div>
                </main>
            </div>
        </form>

    )
}

export default Create