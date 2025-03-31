import { useLocation } from 'react-router';
import styles from './Details.module.css';
import usePostComment from './postCommentHook';
import { useRef, useState } from 'react';

function Details() {
    const location = useLocation();
    const { handleComment } = usePostComment();
    const post = location.state?.post;
    const refComment = useRef();
    const [comments, setComments] = useState([]);

    if (!post) return <p>No post data found</p>;

    const handleReply = async () => {
        const newComment = await handleComment(post, refComment);
        if (newComment) {
            setComments((prevComments) => [...prevComments, newComment]);6
        }
    };



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
                    <button className={styles.commentButton} onClick={() => handleReply()}>Reply</button>
                </div>
            </div>
            <div className={styles.commentsContainer}>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <div key={comment.data.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                {/* <img src={comment.avatar || "https://example.com/default-avatar.jpg"} alt="User" /> */}
                                <h5>{comment.data.author}</h5>
                                <p className={styles.commentDate}>{comment.data.date}</p>
                            </div>
                            <p className={styles.commentText}>{comment.data.text}</p>
                        </div>
                    ))
                ) : (
                    <p className={styles.noComments}>No comments yet. Be the first to reply!</p>
                )}
                {comments.length > 0 ? (
                    comments.map((data) => (
                        <div key={data.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                {/* <img src={comment.avatar || "https://example.com/default-avatar.jpg"} alt="User" /> */}
                                <h5>{data.author}</h5>
                                <p className={styles.commentDate}>{data.date}</p>
                            </div>
                            <p className={styles.commentText}>{data.text}</p>
                        </div>
                    ))
                ) : ''
                }
            </div>
        </>

    )
}

export default Details;