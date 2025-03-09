import { useRef } from "react";
import styles from "./Guest.module.css";
import { Link } from "react-router";

function Guest() {
    const searchValue = useRef();
    const handleSearch = () => {
        console.log(searchValue.current.value)
        searchValue.current.value = '';
    };

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <h1>At</h1>
                <ul>
                    <li><Link to='#'><i className={`fa-solid fa-arrow-right-to-bracket ${styles.i}`}></i><span>Sign in</span></Link></li>
                    <li><Link to='#'><i className={`fa-regular fa-id-badge ${styles.i}`}></i><span>Create account</span></Link></li>
                    <li><Link to="/react-regular-exam"><i class={`fa-solid fa-person-through-window ${styles.i}`}></i><span>Leave</span></Link></li>
                </ul>
                <img src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" alt="Guest" />
                <p>Guest</p>
            </nav>
            <main className={styles.main}>
                <section id="search" className={styles.search}>
                    <h3>What do you need?</h3>
                    <input type="search" ref={searchValue} name="search" id="search" placeholder="search" />
                    <button onClick={handleSearch}>🔍</button>
                </section>
                <section id="posts">
                    <div id="meta">
                        <img src="#" alt="Profile image" />
                        <h4>Author</h4>
                        <p>Date</p>
                    </div>
                    <p>Text content</p>
                    <img src="" alt="Img or Video" />
                    <div id="feedback">
                        <p><i className="fa-regular fa-comment"></i><span>5</span></p>
                        <p><i className="fa-regular fa-heart"></i><span>12</span></p>
                        <p><i className="fa-solid fa-magnifying-glass"></i><span>57</span></p>
                    </div>
                </section>
            </main>
        </div>

    )
};

export default Guest;