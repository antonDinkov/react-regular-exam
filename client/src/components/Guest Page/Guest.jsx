import { useRef, useState, useEffect } from "react";
import styles from "./Guest.module.css";
import { Link } from "react-router";
import useMainFunctionality from "../Social media/Welcome page/Main/mainFunctionality";
import { useInfiniteScroll } from "../Social media/Welcome page/Main/infinityScrollHook";
import LoadingSpinner from "../Loading spinner/Spinner";

function Guest() {
    const searchValue = useRef();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const {fetchPosts, loadMorePosts} = useMainFunctionality();
    const isDone = useRef(false);
    const mainRef = useRef()
    const [loading, setLoading] = useState(false)

    const handleSearch = () => {
        const searchText = searchValue.current.value.trim().toLowerCase();
        searchValue.current.value = '';

        if (searchText === "") {
            setFilteredPosts(posts);
        } else {
            const results = posts.filter((post) =>
                post.content?.toLowerCase().includes(searchText)
            );
            setFilteredPosts(results);
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetched = async () => {
            await fetchPosts(setPosts, setFilteredPosts);
            setLoading(false);
        }
        fetched();
    }, []);

    useInfiniteScroll(mainRef, () => loadMorePosts(posts, filteredPosts, setFilteredPosts));

    /* useEffect(() => {
        if (isDone.current) return;
        isDone.current = true;
        const fetchPost = async () => {
            try {
                const postsCollection = collection(db, "posts");
                const querySnapShot = await getDocs(postsCollection);
                const postsArray = querySnapShot.docs.map((doc) => doc.data());
                setPosts(postsArray)
                setFilteredPosts(postsArray);
            } catch (error) {
                console.error("Грешка при взимане на постовете:", error);
            }
        }
        fetchPost();
    }, []); */

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <h1>At</h1>
                <ul>
                    <li><Link to='/react-regular-exam/login'><i className={`fa-solid fa-arrow-right-to-bracket ${styles.i}`}></i><span>Sign in</span></Link></li>
                    <li><Link to='/react-regular-exam/create'><i className={`fa-regular fa-id-badge ${styles.i}`}></i><span>Create account</span></Link></li>
                    <li><Link to="/react-regular-exam"><i className={`fa-solid fa-person-through-window ${styles.i}`}></i><span>Leave</span></Link></li>
                </ul>
                <img src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" alt="Guest" />
                <p>Guest</p>
            </nav>
            <main className={styles.main} ref={mainRef}>
                {loading && <LoadingSpinner />}
                <section id="search" className={styles.search}>
                    <h3>What do you need?</h3>
                    <input type="search" ref={searchValue} name="search" id="search" placeholder="search" />
                    <button onClick={handleSearch}>🔍</button>
                </section>
                <section id="posts" className={styles.posts}>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((pos, index) => {
                            const postDate = pos.meta.date
                            return (
                                <div id="post" className={styles.post} key={index}>
                                    <div id="meta" className={styles.meta}>
                                        <img src={pos.meta.profileImg?pos.meta.profileImg:"https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"} alt="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" />
                                        <h4>{pos.meta.author}</h4>
                                        <p>{postDate}</p>
                                    </div>
                                    <p>{pos.content}</p>
                                    {pos.img && <img src={pos.img} alt="" />}
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
                </section>
            </main>
        </div>
    )
};

export default Guest;