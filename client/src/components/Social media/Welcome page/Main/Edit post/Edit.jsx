import { useEffect, useRef, useState } from "react";
import styles from "./Edit.module.css";
import { useLocation, useNavigate } from "react-router";
import { getPostById, removeImg, upDatePost } from "../../../../HTTP/registerAndLogin";

const Edit = () => {
    const [image, setImage] = useState(false);
    const[newImage, setNewImage] = useState('');
    const [tempUrl, setTempUrl] = useState(null);
    const location = useLocation();
    const post = location.state?.postData;
    const [currPostInfo, setCurrPostInfo] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState(null);
    const navigate = useNavigate();
    console.log(currPostInfo.content);
    console.log(content);
    
    useEffect (() => {
        const postInfo = async () => {
            const data = await getPostById(post.id);
            setContent(data.content)
            setCurrPostInfo(data);
            if (data.img) {
                setImage(true);
            }
        }
        postInfo();
    }, [image]);

    const handleContentChange = (e) => {
        setContent(e.target.value); // Актуализира състоянието с новото съдържание
    };
    
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewImage(file);
            setTempUrl(imageUrl);
        }
    };

    const handleRemoveImage = () => {
        setNewImage('');
    };

    const handleRemoveOldImage = () => {
        removeImg(currPostInfo.id)
        setImage(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newImage);
        await upDatePost(currPostInfo.id, newImage, content, currPostInfo.img, currPostInfo.imgId);
        navigate(`/react-regular-exam/welcome/${currPostInfo.id}/details`);
    };

    const handleAddImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={styles.editContainer}>
            <h2 className={styles.editTitle}>Edit Post</h2>
            <form onSubmit={handleSubmit} className={styles.editForm}>

                <label className={styles.editLabel}>Content:</label>
                <textarea value={content} onChange={handleContentChange} className={styles.editTextarea}></textarea>

                <label className={styles.editLabel}>Image:</label>
                <div className={styles.imageUploadContainer}>
                    {currPostInfo.img && (
                        <div className={styles.existingImageContainer}>
                            <img src={currPostInfo.img} alt="Existing Post Image" className={styles.existingImage} />
                            <button
                                type="button"
                                className={styles.removeOldImageButton}
                                onClick={handleRemoveOldImage}
                            >
                                Remove Old Image
                            </button>
                        </div>
                    )}

                    <button type="button" className={styles.addButton} onClick={handleAddImageClick}>
                        Add Image
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                    />
                </div>

                {newImage && (
                    <div className={styles.imagePreviewContainer}>
                        <img src={tempUrl} alt="Preview" className={styles.imagePreview} />
                        <button
                            type="button"
                            className={styles.removeButton}
                            onClick={handleRemoveImage}
                        >
                            Remove Image
                        </button>
                    </div>
                )}

                <button type="submit" className={styles.saveButton}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default Edit;
