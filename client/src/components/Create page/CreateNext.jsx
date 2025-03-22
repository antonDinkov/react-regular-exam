import { Link } from "react-router";
import styles from './CreateNext.module.css'

function CreateNext() {
    return (
        <form action="">
            <div className={styles.wrapperMajor}>
                <header className={styles.header}>
                    <Link className={styles.x} to='/react-regular-exam'><i className="fa-solid fa-xmark"></i></Link>
                    <h1 className={styles.logo}>At</h1>
                </header>
                <main className={styles.main}>
                    <div className={styles.wrapper}>
                        <div className={styles.checkBoxWrapper}>
                            <div>

                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>

                        <p>

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