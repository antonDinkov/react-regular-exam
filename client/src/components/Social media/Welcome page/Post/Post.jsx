import { FormContext } from '../../../../../context/UserContext';
import { postCreate } from '../../../HTTP/registerAndLogin';
import styles from './Post.module.css';
import { useContext, useRef, useState } from "react";



function Post() {
    const [media, setMedia] = useState(null);
    const textRef = useRef(null);
    const fileInputRef = useRef(null);
    const {formData} = useContext(FormContext);

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setMedia(imageUrl);
        }
    };

    const handleRemoveMedia = () => {
        setMedia(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = textRef.current.value.trim();
        if (!content) return;

        const post = {
            content,
            feedback: {
                comments: 0,
                likes: 0,
                views: 0,
            },
            img: media,
            meta: {
                author: formData.name,
                date: new Date().toLocaleString(),
                avatar: "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"
            },
        };

        await postCreate(post);
        textRef.current.value = "";
        setMedia(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={styles.postFormContainer}>
            <div className={styles.postForm}>
                <img 
                    src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" 
                    alt="User avatar" 
                    className={styles.avatar} 
                />
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <textarea ref={textRef} placeholder="What’s happening?" className={styles.textarea} />

                    {media && (
                        <div className={styles.mediaPreview}>
                            <img src={media} alt="Uploaded media preview" />
                        </div>
                    )}

                    <div className={styles.footer}>
                        <label className={styles.mediaButton}>
                            📷 Add Media
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleMediaUpload} 
                                hidden 
                                ref={fileInputRef} // Свързваме input-а с useRef
                            />
                        </label>
                        {media && (
                            <button type="button" onClick={handleRemoveMedia} className={styles.removeButton}>
                                ❌ Remove
                            </button>
                        )}
                        <button type="submit" className={styles.button}>Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Post;