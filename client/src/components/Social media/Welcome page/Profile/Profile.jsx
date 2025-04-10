import { Link } from "react-router";
import styles from "./Profile.module.css";
import { getUser } from "../../../HTTP/localeStorageApi";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../../HTTP/registerAndLogin";
import LoadingSpinner from "../../../Loading spinner/Spinner";

function Profile() {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(getUser());

    useEffect(() => {
        setLoading(true);
        const postsAll = async () => {
            const {postsArray} = await getAllPosts();
            const myposts = postsArray.filter((post) => post.meta.author === user.name);
            setUserPosts(myposts)
            setLoading(false);
        }
        postsAll();
    }, [])

    return (
        <div className={styles.profileContainer}>
            {loading && <LoadingSpinner />}
            <div className={styles.header}>
                <div className={styles.coverPhoto}><img src={user.wallImg?user.wallImg:'No image'} alt="wall_img" /></div>
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
                            {post.img && <img src={post.img} alt="" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile