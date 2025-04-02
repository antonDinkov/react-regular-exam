import { useEffect, useState } from "react";
import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router";
import { getUser } from "../../../HTTP/localeStorageApi";

const EditProfile = () => {


    const [profileImage, setProfileImage] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [preferences, setPreferences] = useState({ connect: false, more: false, ads: false });
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        birthday: { day: '', month: '', year: '' }
    });

    useEffect(() => {
        const userInfo = JSON.parse(getUser());
        setUser(userInfo);
    }, [])




    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleCheckboxChange = (e) => {
        setPreferences({ ...preferences, [e.target.name]: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/react-regular-exam/welcome');
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = Array.from({ length: 121 }, (_, i) => 2025 - i);

    return (
        <div className={styles.editProfileContainer}>
            <h2 className={styles.editProfileTitle}>Edit Profile</h2>
            <form onSubmit={handleSubmit} className={styles.editProfileForm}>
                <div className={styles.imageUploadContainer}>
                    <label className={styles.coverPhotoLabel}>
                        Cover Photo:
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setCoverPhoto)} />
                        {coverPhoto && <img src={coverPhoto} alt="Cover" className={styles.coverPhotoPreview} />}
                    </label>
                    <label className={styles.profileImageLabel}>
                        Profile Image:
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setProfileImage)} />
                        {profileImage && <img src={profileImage} alt="Profile" className={styles.profileImagePreview} />}
                    </label>
                </div>
                <label className={styles.editProfileLabel}>Name:
                    <input type="text" defaultValue={user.name || ''} className={styles.editProfileInput} />
                </label>
                <label className={styles.editProfileLabel}>Email:
                    <input type="email" defaultValue={user.email || ''} className={styles.editProfileInput} />
                </label>
                <label className={styles.editProfileLabel}>Bio:
                    <textarea defaultValue='User Bio' className={styles.editProfileTextarea} />
                </label>

                <div className={styles.birthdateContainer}>
                    <select defaultValue={user.birthday.day || ''} className={styles.editProfileSelect}>
                        <option value=""></option>
                        {Array.from({ length: 31 }, (_, index) => (
                            <option key={index + 1} value={(index + 1) || ''}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                    <select defaultValue={user.birthday.month || ''} className={styles.editProfileSelect}>
                        <option value=""></option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    <select defaultValue={user.birthday.year || ''} className={styles.editProfileSelect}>
                        <option value=""></option>
                        {Array.from({ length: 121 }, (_, index) => (
                            <option key={index + 1905} value={(index + 1905) || ''}>
                                {index + 1905}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.checkboxContainer}>
                    <label><input type="checkbox" name="connect" checked={preferences.connect} onChange={handleCheckboxChange} /> Connect</label>
                    <label><input type="checkbox" name="more" checked={preferences.more} onChange={handleCheckboxChange} /> More</label>
                    <label><input type="checkbox" name="ads" checked={preferences.ads} onChange={handleCheckboxChange} /> Ads</label>
                </div>
                <button type="submit" className={styles.editProfileSaveButton}>Save</button>
            </form>
        </div>
    );
};

export default EditProfile;