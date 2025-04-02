import { useEffect, useRef, useState } from "react";
import styles from "./Edit.module.css";
import { useLocation } from "react-router";
import { getPostById, removeImg } from "../../../../HTTP/registerAndLogin";

const Edit = ({ initialPost, onSave }) => {
    const [image, setImage] = useState(false);
    const[newImage, setNewImage] = useState('');
    const location = useLocation();
    const post = location.state?.postData;
    const [currPostInfo, setCurrPostInfo] = useState('');
    
    useEffect (() => {
        const postInfo = async () => {
            const data = await getPostById(post.id);
            setCurrPostInfo(data)
            if (data.img) {
                setImage(true);
            }
        }
        postInfo();
    }, [image]);

    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewImage(imageUrl);
        }
    };

    /* const handleRemoveImage = () => {
        
    }; */

    const handleRemoveOldImage = () => {
        removeImg(currPostInfo.id)
        setImage(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title: post.title, content: post.content, image });
    };

    const handleAddImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={styles.editContainer}>
            <h2 className={styles.editTitle}>Edit Post</h2>
            <form onSubmit={handleSubmit} className={styles.editForm}>

                <label className={styles.editLabel}>Content:</label>
                <textarea
                    value={currPostInfo.content}
                    className={styles.editTextarea}
                />

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
                        <img src={image} alt="Preview" className={styles.imagePreview} />
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
