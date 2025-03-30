import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router"; // 👈 Взимаме mainRef от Outlet контекста
import styles from "./Main.module.css";
import { db, collection, getDocs } from "../../../../firebase";

function Main() {
    const { mainRef } = useOutletContext(); // 👈 Взимаме mainRef от Welcome
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [page, setPage] = useState(1);
    const postsPerPage = 6;
    const [loading, setLoading] = useState(false);
    const searchValue = useRef();

    const handleSearch = () => {
        const searchText = searchValue.current.value.trim().toLowerCase();
        searchValue.current.value = '';

        if (searchText === "") {
            setFilteredPosts(posts.slice(0, page * postsPerPage));
        } else {
            const results = posts.filter((post) =>
                post.content?.toLowerCase().includes(searchText)
            );
            setFilteredPosts(results);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollection = collection(db, "posts");
                const querySnapShot = await getDocs(postsCollection);
                const postsArray = querySnapShot.docs.map((doc) => doc.data());
                postsArray.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
                setPosts(postsArray);
                setFilteredPosts(postsArray.slice(0, postsPerPage));
            } catch (error) {
                console.error("Грешка при взимане на постовете:", error);
            }
        };
        fetchPosts();
    }, []);

    const loadMorePosts = () => {
        if (loading || filteredPosts.length >= posts.length) return; // Проверка дали сме заредили всичко
        setLoading(true);
    
        setTimeout(() => {
            const nextPage = page + 1;
            const newPosts = posts.slice(page * postsPerPage, nextPage * postsPerPage);
    
            if (newPosts.length > 0) {
                setFilteredPosts(prevPosts => [...prevPosts, ...newPosts]); // Добавяме, а не презаписваме!
                setPage(nextPage);
            }
    
            setLoading(false);
        }, 500);
    };

    const handleScroll = (e) => {
        const mainElement = mainRef.current;
        if (!mainElement) return;
    
        const scrollHeight = mainElement.scrollHeight;
        const currentHeight = mainElement.scrollTop + mainElement.clientHeight;
    
        if (currentHeight + 1 >= scrollHeight && filteredPosts.length < posts.length) {
            loadMorePosts();
        }
    };

    useEffect(() => {
        if (!mainRef?.current) return;
    
        const mainElement = mainRef.current;
        mainElement.addEventListener("scroll", handleScroll);
    
        return () => {
            if (mainElement) {
                mainElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, [filteredPosts]);

    return (
        <>
            <section id="search" className={styles.search}>
                <h3>What do you need?</h3>
                <input type="search" ref={searchValue} name="search" id="search" placeholder="search" />
                <button onClick={handleSearch}>🔍</button>
            </section>
            <section id="posts" className={styles.posts}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <div key={index} className={styles.post}>
                            <div className={styles.meta}>
                                <img src={post.meta.img || post.meta.avatar} alt="Profile" />
                                <h4>{post.meta.author}</h4>
                                <p>{post.meta.date}</p>
                            </div>
                            <p>{post.content}</p>
                            <img src={post.img} alt="Img or Video" />
                            <div className={styles.feedback}>
                                <p><i className="fa-regular fa-comment"></i><span>{post.feedback.comments}</span></p>
                                <p><i className="fa-regular fa-heart"></i><span>{post.feedback.likes}</span></p>
                                <p><i className="fa-solid fa-magnifying-glass"></i><span>{post.feedback.views}</span></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts found</p>
                )}
            </section>
            {loading && <p className={styles.loading}>Loading more posts...</p>}
        </>
    );
}

export default Main;