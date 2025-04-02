import { useRef, useState } from "react";
import styles from "./Edit.module.css";

const Edit = ({ initialPost, onSave }) => {
  const [title, setTitle] = useState(initialPost?.title || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [image, setImage] = useState(initialPost?.image || null);
  
  // Референтен елемент за input, за да задействаме клик програмно
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content, image });
  };

  // Функция за ръчно активиране на input за файлове чрез клик на бутона
  const handleAddImageClick = () => {
    fileInputRef.current.click(); // Принудително кликване върху input
  };

  return (
    <div className={styles.editContainer}>
      <h2 className={styles.editTitle}>Edit Post</h2>
      <form onSubmit={handleSubmit} className={styles.editForm}>

        <label className={styles.editLabel}>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.editTextarea}
        />

        <label className={styles.editLabel}>Image:</label>
        <div className={styles.imageUploadContainer}>
          {/* Когато бутона се натисне, той ще задейства избора на файл */}
          <button type="button" className={styles.addButton} onClick={handleAddImageClick}>
            Add Image
          </button>

          {/* Скритото поле за избор на файл, което се задейства от бутона */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}   // Свързване на референцията към input
            style={{ display: "none" }}  // Скриваме реалния input
          />
        </div>

        {image && (
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
