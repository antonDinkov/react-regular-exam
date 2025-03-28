import { useRef, useState, useEffect, useContext } from "react";
import styles from "./Welcome.module.css";
import { Link, Outlet } from "react-router";
import { db } from "../../../firebase";
import { collection, getDocs } from "../../../firebase";
import { FormContext } from "../../../../context/UserContext";
import { getUser } from "../../HTTP/localeStorageApi";
import Navbar from "../Navbar";
import Main from "./Main";

function Welcome({children}) {
    /* const searchValue = useRef(); */
    /* const [posts, setPosts] = useState([]); */
    /* const [filteredPosts, setFilteredPosts] = useState([]); */
    /* const isDone = useRef(false); */
    /* const {formData, updateForm} = useContext(FormContext);
    const [currentUser, setCurrentUser] = useState('Loading...'); */
    
    

    /* const handleSearch = () => {
        const searchText = searchValue.current.value.trim().toLowerCase(); // Малки букви за case-insensitive
        searchValue.current.value = '';

        if (searchText === "") {
            setFilteredPosts(posts); // Ако полето е празно, показваме всички постове
        } else {
            const results = posts.filter((post) =>
                post.content?.toLowerCase().includes(searchText)
            );
            setFilteredPosts(results);
        }
    }; */

    /* useEffect(() => {
        const user = JSON.parse(getUser());
        console.log('Tochno predi loga');
        console.log(user);
        
        console.log(user.name);
        
        if (user && user.name) {
            setCurrentUser(user.name);
        } else {
            setCurrentUser('Guest'); // Ако няма потребител, да не е "Error load..."
        }
    }, []); */

    /* useEffect(() => {
        if (searchTerm) {
            const results = posts.filter((post) =>
                post.content?.toLowerCase().includes(searchTerm)
            );
            setFilteredPosts(results);
        } else {
            setFilteredPosts(posts);
        }
    }, [searchTerm, posts]);
 */

    /* useEffect(() => {
        if (isDone.current) return;
        isDone.current = true;
        const fetchPost = async () => {
            try {
                const postsCollection = collection(db, "posts");
                const querySnapShot = await getDocs(postsCollection);
                const postsArray = querySnapShot.docs.map((doc) => doc.data());
                setPosts(postsArray)
                setFilteredPosts(postsArray); // При първоначално зареждане, показваме всички постове
            } catch (error) {
                console.error("Грешка при взимане на постовете:", error);
            }
        }
        fetchPost();
    }, []); */

    return (
        <div className={styles.container}>
            {/* <nav className={styles.nav}>
                <h1>At</h1>
                <ul>
                    <li><Link to='/react-regular-exam/welcome'><i className={`fa-solid fa-house-flag ${styles.i}`}></i><span>Welcome</span></Link></li>
                    <li><Link to='/react-regular-exam/create'><i className={`fa-solid fa-bell ${styles.i}`}></i><span>Notification</span></Link></li>
                    <li><Link to='/react-regular-exam/create'><i className={`fa-solid fa-envelope ${styles.i}`}></i><span>Messages</span></Link></li>
                    <li><Link to='/react-regular-exam/create'><i className={`fa-solid fa-user ${styles.i}`}></i><span>Profile</span></Link></li>
                    <li><Link to='/react-regular-exam/create'><i className={`fa-solid fa-suitcase ${styles.i}`}></i><span>Jobs</span></Link></li>
                    <li><Link to="/react-regular-exam"><i className={`fa-solid fa-circle-xmark ${styles.i}`}></i><span>Logout</span></Link></li>
                    <li><Link to="/react-regular-exam/post"><span>Post</span></Link></li>
                    
                </ul>
                <img src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" alt="Guest" />
                <p>{currentUser}</p>
            </nav> */}
            <Navbar />
            <main className={styles.main}>
                {/* <section id="search" className={styles.search}>
                    <h3>What do you need?</h3>
                    <input type="search" ref={searchValue} name="search" id="search" placeholder="search" />
                    <button onClick={handleSearch}>🔍</button>
                </section>
                <section id="posts" className={styles.posts}>
                    <div id="post" className={styles.post}>
                        <div id="meta" className={styles.meta}>
                            <img src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" alt="Profile image" />
                            <h4>Author</h4>
                            <p>Date</p>
                        </div>
                        <p>Text content. This is my first post is text content, which is going to become viral!</p>
                        <img src="https://images.indianexpress.com/2017/12/2017-viral-photos-main_759_combo.jpg?w=350" alt="Img or Video" />
                        <div id="feedback" className={styles.feedback}>
                            <p><i className="fa-regular fa-comment"></i><span>5</span></p>
                            <p><i className="fa-regular fa-heart"></i><span>12</span></p>
                            <p><i className="fa-solid fa-magnifying-glass"></i><span>57</span></p>
                        </div>
                    </div>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((pos, index) => {
                            const postDate = pos.meta.date.toDate()
                            return (
                                <div id="post" className={styles.post} key={index}>
                                    <div id="meta" className={styles.meta}>
                                        <img src={pos.meta.img} alt="Profile image" />
                                        <h4>{pos.meta.author}</h4>
                                        <p>{postDate.toLocaleDateString()}</p>
                                    </div>
                                    <p>{pos.content}</p>
                                    <img src={pos.img} alt="Img or Video" />
                                    <div id="feedback" className={styles.feedback}>
                                        <p><i className="fa-regular fa-comment"></i><span>{pos.feedback.comments}</span></p>
                                        <p><i className="fa-regular fa-heart"></i><span>{pos.feedback.likes}</span></p>
                                        <p><i className="fa-solid fa-magnifying-glass"></i><span>{pos.feedback.views}</span></p>
                                    </div>
                                </div>
                            );
                        })
                    ):(
                        <p>No posts found</p>
                    )}
                </section> */}
                {/* <Main /> */}
                <Outlet />
            </main>
        </div>
    )
};

export default Welcome;