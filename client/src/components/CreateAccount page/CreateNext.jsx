import { Link, useNavigate } from "react-router";
import styles from './CreateNext.module.css'
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../../../context/UserContext";
import {registerUser} from "../HTTP/registerAndLogin";
import LoadingSpinner from "../Loading spinner/Spinner";
import AbortButton from "./AbortButton";
import Timer from "./Timer";

function CreateNext() {
    const navigate = useNavigate();
    const { formData, updateForm, resetFormData } = useContext(FormContext);
    const [spinner, setSpinner] = useState(false);
    const [timer, setTimer] = useState(0);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true);
        setTimer(10);
        const formDataBoxes = {
            checkbox: {
                getMore: e.target.elements.getMore?.checked ? "yes" : "no",
                connectWith: e.target.elements.connectWith?.checked ? "yes" : "no",
                peronalizedAds: e.target.elements.peronalizedAds?.checked ? "yes" : "no",
            },
        }
        try {
            updateForm(formDataBoxes);
        } catch (error) {
            console.error("Error registering user:", error.message);
        }
    }

    useEffect(()=>{
        if (!spinner) return;
        if (timer === 0) return;
        const countdown = setTimeout(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => {
            clearTimeout(countdown);
        }
    }, [timer, spinner])

    useEffect(() => {
        if (!formData.checkbox.getMore) {
            return;
        }

        const abortContr = new AbortController();
        const signal = abortContr.signal;

        const timeOutCreate = setTimeout(()=>{
            const register = async () => {
                try {
                    await registerUser(formData, {signal});
                    setSpinner(false);
                    navigate('/react-regular-exam/welcome');
                } catch (error) {
                    alert (error.message);
                }
            }
            register();
    
        }, 10000);

        return () => {
            clearTimeout(timeOutCreate);
            abortContr.abort();
        }
            
    }, [formData.checkbox.getMore])

    const handleAbort = () => {
        navigate("/react-regular-exam");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.wrapperMajor}>
            {spinner && <LoadingSpinner />}
            {spinner && <Timer onTimer={timer} />}
            {spinner && <AbortButton onClick={handleAbort}/>}
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
                                    <input type="checkbox" name="getMore" />
                                </div>
                            </div>
                            <div>
                                <h3>Connect with people you know</h3>
                                <div>
                                    <p>Let others find your At account by your email address.</p>
                                    <input type="checkbox" name="connectWith" />
                                </div>
                            </div>
                            <div>
                                <h3>Personalized ads</h3>
                                <div>
                                    <p>You will always see ads on At based on your At activity. When this setting is enabled, At may further personalize ads from At advertisers, on and off At, by combining your At activity with other online activity and information from our partners.</p>
                                    <input type="checkbox" name="peronalizedAds" />
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