import { Link } from "react-router";
import styles from "./Profile.module.css";

function Profile() {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.header}>
                <div className={styles.coverPhoto}></div>
                <div className={styles.profileInfo}>
                    <img src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" alt="Profile" className={styles.avatar} />
                    <div className={styles.details}>
                        <h2 className={styles.name}>Име на потребителя</h2>
                        <p className={styles.username}>@username</p>
                        <p className={styles.bio}>Тук може да бъде вашата биография...</p>
                    </div>
                    <Link to="/react-regular-exam/welcome/profile/edit" className={styles.editProfile}>Edit</Link>
                </div>
            </div>
            <div className={styles.content}>
                <h3>Публикации</h3>
                <div className={styles.posts}>
                    <div className={styles.post}>Това е примерна публикация.</div>
                    <div className={styles.post}>Още една публикация...</div>
                </div>
            </div>
        </div>
    );
}

export default Profile