import { useLocation } from 'react-router';
import styles from './Details.module.css';
import usePostComment from './postCommentHook';
import { useRef } from 'react';

function Details() {
    const location = useLocation();
    const {handleComment} = usePostComment();
    const post = location.state?.post;
    const refComment = useRef();

    if (!post) return <p>No post data found</p>;



    return (
        <>
            <div key={post.id} className={styles.post}>
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


                <div className={styles.actions}>
                    <button className={styles.editButton} onClick={() => handleEdit(post.id)}>Edit</button>
                    <button className={styles.deleteButton} onClick={() => handleDelete(post.id)}>Delete</button>
                </div>


                <div className={styles.commentSection}>
                    <textarea ref={refComment} placeholder="Post your reply" className={styles.commentInput}></textarea>
                    <button className={styles.commentButton} onClick={() => handleComment(post, refComment)}>Reply</button>
                </div>
            </div>
        </>

    )
}

export default Details;