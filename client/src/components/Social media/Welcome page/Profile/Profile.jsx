import { Link } from "react-router";
import styles from "./Profile.module.css";
import { getUser } from "../../../HTTP/localeStorageApi";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../../HTTP/registerAndLogin";

function Profile() {
    const [userPosts, setUserPosts] = useState([]);

    const user = JSON.parse(getUser());

    useEffect(() => {
        const postsAll = async () => {
            const posts = await getAllPosts();
            const myposts = posts.filter((post) => post.meta.author === user.name);
            setUserPosts(myposts)
        }
        postsAll();
    }, [])

    return (
        <div className={styles.profileContainer}>
            <div className={styles.header}>
                <div className={styles.coverPhoto}></div>
                <div className={styles.profileInfo}>
                    <img src={user.profileImg?user.profileImg:"https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"} alt="Profile" className={styles.avatar} />
                    <div className={styles.details}>
                        <h2 className={styles.name}>{user.name}</h2>
                        <p className={styles.username}>{user.email}</p>
                        <p className={styles.bio}>{user.bio}</p>
                    </div>
                    <Link to="/react-regular-exam/welcome/profile/edit" className={styles.editProfile}>Edit</Link>
                </div>
            </div>
            <div className={styles.content}>
                <h3>Posts:</h3>
                <div className={styles.posts}>
                    {userPosts.map((post) => (
                        <div key={post.id} className={styles.post}>
                            <p>{post.content}</p>
                            <img src={post.img} alt="Ni image" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile