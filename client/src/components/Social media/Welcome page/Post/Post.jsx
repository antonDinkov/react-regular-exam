import { FormContext } from '../../../../../context/UserContext';
import { getUser } from '../../../HTTP/localeStorageApi';
import { postCreate } from '../../../HTTP/registerAndLogin';
import LoadingSpinner from '../../../Loading spinner/Spinner';
import xssProtect from '../../../Utils/xssProtect';
import styles from './Post.module.css';
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router';



function Post() {
    const [media, setMedia] = useState(null);
    const [tempUrl, setTempUrl] = useState(null);
    const textRef = useRef(null);
    const fileInputRef = useRef(null);
    const {formData} = useContext(FormContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        const userInfo = JSON.parse(getUser());
        setUser(userInfo);
    },[]);

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];
        const MAX_SIZE_MB = 5;
        if (file) {
            const imageRegex = /^image\/[a-zA-Z0-9.+-]+$/;
            if (!imageRegex.test(file.type)) {
                alert("Please, upload only images!");
                return;
            }
    
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                alert("Your file is too big! Max size: 5MB.");
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            setMedia(file);
            setTempUrl(imageUrl);
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

        const rawContent = textRef.current.value.trim();
        const content = xssProtect(rawContent);

        if (!content || content.length < 3) {
            alert("👉 Please enter at least 3 characters.");
            return;
        }
        if (content.length > 500) {
            alert("👉 The post cannot exceed 500 characters.");
            return;
        }

        setLoading(true);

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
                avatar: "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg",
                profileImg: user.profileImg,
            },
            comments: [],
        };

        await postCreate(post);
        textRef.current.value = "";
        setMedia(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        navigate('/react-regular-exam/welcome');
        setLoading(false)
    };

    return (
        <div className={styles.postFormContainer}>
            {loading && <LoadingSpinner />}
            <div className={styles.postForm}>
                <img 
                    src={user.profileImg || "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"} 
                    alt="User avatar" 
                    className={styles.avatar} 
                />
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <textarea ref={textRef} placeholder="What's happening?" className={styles.textarea} />

                    {media && (
                        <div className={styles.mediaPreview}>
                            <img src={tempUrl} alt="Uploaded media preview" />
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