import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import styles from "./Main.module.css";
import Search from "./Search";
import useMainFunctionality from "./mainFunctionality";
import { useInfiniteScroll } from "./infinityScrollHook";
import useDetailsClick from "./detailsClickHook";
import { getUser } from "../../../HTTP/localeStorageApi";
import { v4 as uuidv4 } from 'uuid';
import { getAllPosts, postComment } from "../../../HTTP/registerAndLogin";
import useLikeHandle from "./LikeHook";
import useViewHandle from "./ViewHook";

function Main() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const searchValue = useRef();
    const { fetchPosts, loadMorePosts, loading, handleSearch } = useMainFunctionality();
    const { mainRef } = useOutletContext();
    const { handleDetailsClick } = useDetailsClick();
    const {handleView} = useViewHandle()
    const {handleLike} = useLikeHandle();

    const handleClick = async (e) => {
        const sourceElement = e.target.closest('#closestID');
        const postId = sourceElement.getAttribute("data-key");
        await handleView(postId);
        handleDetailsClick(postId);
    }
    

    useEffect(() => {
        const fetched = async () => {
            await fetchPosts(setPosts, setFilteredPosts);
        }
        fetched();
    }, [])
    

    const handleSearchClick = () => {
        if (searchValue.current) {
            handleSearch(searchValue.current.value, setFilteredPosts, posts);
        }
    };

    useInfiniteScroll(mainRef, () => loadMorePosts(posts, filteredPosts, setFilteredPosts));

    const makeVisible = (e) => {
        const sourceElement = e.target.closest('#closestID');
        const id = sourceElement.getAttribute("data-key");
        const theComment = document.getElementById(id);
        theComment.style.display = "block";
    }

    const makeInvisible = (e) => {
        const sourceElement = e.target.closest('#closestID');
        const id = sourceElement.getAttribute("data-key");
        const theComment = document.getElementById(id);
        theComment.style.display = "none";
    }

    const handleReply = async (e) => {
        const sourceElement = e.target.closest('#closestID');
        const postId = sourceElement.getAttribute("data-key");
        const currentUserInfo = JSON.parse(getUser());

        const data = {
            id: uuidv4(),
            author: currentUserInfo.name,
            text: sourceElement.querySelector('textarea').value,
            date: new Date().toLocaleString()
        }

        sourceElement.querySelector('textarea').value = '';
        if (!data.text) return alert("Your reply is empty!");
        await postComment(postId, data);
        const theComment = document.getElementById(postId);
        theComment.style.display = "none";
        const allPosts = await getAllPosts();
        if(allPosts){
            setFilteredPosts(allPosts);
        }
    }

    const likesHandle = async (e) => {
        const sourceElement = e.target.closest('#closestID');
        const postId = sourceElement.getAttribute("data-key");

        await handleLike(postId)
        const allPosts = await getAllPosts();
        if(allPosts){
            setFilteredPosts(allPosts);
        }
    }

    return (
        <>
            <Search ref={searchValue} onSearch={handleSearchClick} />
            <section id="posts" className={styles.posts}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div id="closestID" data-key={post.id} key={post.id} className={styles.postWrapper}>
                            <div onClick={(e) => handleClick(e)} key={post.id} className={styles.post}>
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
                            <div className={styles.feedback}>
                                <p onClick={(e) => makeVisible(e)}><i className="fa-regular fa-comment"></i><span>{post.feedback.comments}</span></p>
                                <p onClick={(e) => likesHandle(e)}><i className="fa-regular fa-heart"></i><span>{post.feedback.likes}</span></p>
                                <p onClick={(e) => handleClick(e)}><i className="fa-solid fa-magnifying-glass"></i><span>{post.feedback.views}</span></p>
                            </div>

                            <div data-key={post.id} id={post.id} style={{ display: "none" }} className={styles.modalOverlay}>
                                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                    <textarea
                                        className={styles.commentBox}
                                        placeholder="Post your reply"
                                    />
                                    <div className={styles.modalButtons}>
                                        <button className={styles.sendBtn} onClick={(e) => handleReply(e)}>
                                            Reply
                                        </button>
                                        <button className={styles.closeBtn} onClick={(e) => makeInvisible(e)}>
                                            X
                                        </button>
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