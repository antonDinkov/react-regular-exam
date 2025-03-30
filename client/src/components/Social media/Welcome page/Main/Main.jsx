import { useEffect, useRef, useState } from 'react';
import styles from './Main.module.css'
import { db, collection, getDocs } from "../../../../firebase";

function Main() {
    const searchValue = useRef();
    const isDone = useRef(false);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleSearch = () => {
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
    };

    useEffect(() => {
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
        }, []);
    
    return (
        <>
            <section id="search" className={styles.search}>
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
                        const postDate = pos.meta.date;
                        return (
                            <div id="post" className={styles.post} key={index}>
                                <div id="meta" className={styles.meta}>
                                    <img src={pos.meta.img || pos.meta.avatar} alt="Profile image" />
                                    <h4>{pos.meta.author}</h4>
                                    <p>{postDate}</p>
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
                ) : (
                    <p>No posts found</p>
                )}
            </section>
        </>
    )
}

export default Main;