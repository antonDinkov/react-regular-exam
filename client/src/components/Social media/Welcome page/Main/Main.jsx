import { useRef } from "react";
import { useOutletContext } from "react-router";
import styles from "./Main.module.css";
import Search from "./Search";
import useMainFunctionality from "./mainFunctionality";
import { useInfiniteScroll } from "./infinityScrollHook";

function Main() {
    const searchValue = useRef();
    const { filteredPosts, loadMorePosts, loading, handleSearch } = useMainFunctionality();
    const { mainRef } = useOutletContext();
    const handleSearchClick = () => {
        if (searchValue.current) {
            handleSearch(searchValue.current.value);
        }
    };
    useInfiniteScroll(mainRef, loadMorePosts);

    return (
        <>
            <Search ref={searchValue} onSearch={handleSearchClick} />
            <section id="posts" className={styles.posts}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <div key={index} className={styles.post}>
                            <div className={styles.imgWrap}>
                                <div className={styles.meta}>
                                    <img src={post.meta.img || post.meta.avatar || "https://example.com/default-avatar.jpg"} alt="Profile" />
                                    <h4>{post.meta.author}</h4>
                                    <p>{post.meta.date}</p>
                                </div>
                                <p>{post.content}</p>
                                <img src={post.img || "https://example.com/default-avatar.jpg"} alt="Img or Video" />
                            </div>

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