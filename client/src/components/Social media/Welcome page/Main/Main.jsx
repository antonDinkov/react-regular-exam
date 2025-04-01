import { useRef, useState } from "react";
import { useOutletContext } from "react-router";
import styles from "./Main.module.css";
import Search from "./Search";
import useMainFunctionality from "./mainFunctionality";
import { useInfiniteScroll } from "./infinityScrollHook";
import useDetailsClick from "./detailsClickHook";

function Main() {
    const searchValue = useRef();
    const { filteredPosts, loadMorePosts, loading, handleSearch } = useMainFunctionality();
    const { mainRef } = useOutletContext();
    const { handleDetailsClick } = useDetailsClick();
    const [id, setId] = useState('');
    const handleSearchClick = () => {
        if (searchValue.current) {
            handleSearch(searchValue.current.value);
        }
    };
    useInfiniteScroll(mainRef, loadMorePosts);

    const makeVisible = (e) => {
        const parentElement = e.target.closest('#closestId');
        const sourceElement = parentElement.previousElementSibling;
        const id = sourceElement.getAttribute("data-key");
        const theComment = document.getElementById(id);
        theComment.style.display = "block";
    }

    const makeInvisible = (e) => {
        const grandParentElement = e.target.closest('#closestToButtons');
        const sourceElement = grandParentElement.firstElementChild;
        const id = sourceElement.getAttribute("data-key");
        const theComment = document.getElementById(id);
        theComment.style.display = "none";
    }


    return (
        <>
            <Search ref={searchValue} onSearch={handleSearchClick} />
            <section id="posts" className={styles.posts}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div className={styles.postWrapper}>
                            <div onClick={() => handleDetailsClick(post)} data-key={post.id} key={post.id} className={styles.post}>
                                <div className={styles.imgWrap}>
                                    <div className={styles.meta}>
                                        <img src={post.meta.img || post.meta.avatar || "https://example.com/default-avatar.jpg"} alt="Profile" />
                                        <h4>{post.meta.author}</h4>
                                        <p>{post.meta.date}</p>
                                    </div>
                                    <p>{post.content}</p>
                                    <img src={post.img || "https://example.com/default-avatar.jpg"} alt="Img or Video" />
                                </div>

                            </div>
                            <div id="closestId" className={styles.feedback}>
                                <p onClick={(e) => makeVisible(e)}><i className="fa-regular fa-comment"></i><span>{post.feedback.comments}</span></p>
                                <p><i className="fa-regular fa-heart"></i><span>{post.feedback.likes}</span></p>
                                <p><i className="fa-solid fa-magnifying-glass"></i><span>{post.feedback.views}</span></p>
                            </div>

                            <div id="closestToButtons">
                                <div data-key={post.id} id={post.id} style={{ display: "none" }} className={styles.modalOverlay}>
                                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                        <textarea
                                            className={styles.commentBox}
                                            placeholder="Напишете коментар..."
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <div className={styles.modalButtons}>
                                            <button className={styles.sendBtn} onClick={() => {
                                                console.log("Изпратено:", message);
                                                setIsOpen(false);
                                                setMessage("");
                                            }}>
                                                Изпрати
                                            </button>
                                            <button className={styles.closeBtn} onClick={(e) => makeInvisible(e)}>
                                                X
                                            </button>
                                        </div>
                                    </div>
                                </div>
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