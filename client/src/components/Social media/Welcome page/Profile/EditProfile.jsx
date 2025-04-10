import { useContext, useEffect, useState } from "react";
import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router";
import { getUser, updateUserLocalStorage } from "../../../HTTP/localeStorageApi";
import { FormContext } from "../../../../../context/UserContext";
import { upDateUserInfo, getUser as getUserById, getUserId } from "../../../HTTP/registerAndLogin";
import LoadingSpinner from "../../../Loading spinner/Spinner";

const EditProfile = () => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('')
    const [profileImg, setProfileImg] = useState(null);
    const [tempProfImg, setTempProfImg] = useState(null);
    const [wallImg, setWallImg] = useState(null);
    const [tempWallImg, setTempWallImg] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [birthDay, setBirthDay] = useState({ day: '', month: '', year: '' })
    const [preferences, setPreferences] = useState({ connectWith: '', getMore: '', peronalizedAds: '' });
    const navigate = useNavigate();
    const { formData, updateForm, resetFormData } = useContext(FormContext);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const initialSetup = async () => {
            const userInfo = JSON.parse(getUser());
            setUserName(userInfo.name);
    
            const id = await getUserId(userInfo.name); 
            setUserId(id);
            console.log(userId);
            
            setName(userInfo.name);
            setEmail(userInfo.email);
            setBio(userInfo.bio || '');
            setBirthDay(userInfo.birthday || { day: '', month: '', year: '' });
    
            if (userInfo.wallImg) {
                setWallImg(userInfo.wallImg);
            }
    
            if (userInfo.profileImg) {
                setProfileImg(userInfo.profileImg);
            }
    
            setPreferences({
                connectWith: userInfo.checkbox.connectWith || '',
                getMore: userInfo.checkbox.getMore || '',
                peronalizedAds: userInfo.checkbox.peronalizedAds || ''
            });
        };
    
        initialSetup();
    }, [userId]);

    const handleImageUpload = (e, setImage, setTempImg) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setTempImg(URL.createObjectURL(file))
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setPreferences((prev) => ({
            ...prev,
            [name]: checked ? "yes" : "no"
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const content = {
            name,
            email,
            bio,
            birthDay,
            preferences
        }
        updateForm(content);
        await upDateUserInfo(userName, userId, content, profileImg, wallImg);
        const user = await getUserById(userId);
        updateUserLocalStorage(user);
        navigate('/react-regular-exam/welcome/profile');
        setLoading(false)
    };


    return (
        <div className={styles.editProfileContainer}>
            {loading && <LoadingSpinner />}
            <h2 className={styles.editProfileTitle}>Edit Profile</h2>
            <form onSubmit={handleSubmit} className={styles.editProfileForm}>
                <div className={styles.imageUploadContainer}>
                    <label className={styles.coverPhotoLabel}>
                        Cover Photo:
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setWallImg, setTempWallImg)} />
                        {wallImg && <img src={tempWallImg ? tempWallImg : wallImg} alt="Cover" className={styles.coverPhotoPreview} />}
                    </label>
                    <label className={styles.profileImageLabel}>
                        Profile Image:
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setProfileImg, setTempProfImg)} />
                        {profileImg && <img src={tempProfImg ? tempProfImg : profileImg || "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"} alt="Profile" className={styles.profileImagePreview} />}
                    </label>
                </div>
                <label className={styles.editProfileLabel}>Name:
                    <input type="text" value={name || ''} onChange={(e) => setName(e.target.value)} className={styles.editProfileInput} />
                </label>
                <label className={styles.editProfileLabel}>Email:
                    <input type="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} className={styles.editProfileInput} />
                </label>
                <label className={styles.editProfileLabel}>Bio:
                    <textarea value={bio || ''} onChange={(e) => setBio(e.target.value)} className={styles.editProfileTextarea} />
                </label>

                <div className={styles.birthdateContainer}>
                    <select value={birthDay.day || ''} onChange={(e) => setBirthDay((birthDay) => ({ ...birthDay, day: e.target.value }))} className={styles.editProfileSelect}>
                        <option value=""></option>
                        {Array.from({ length: 31 }, (_, index) => (
                            <option key={index + 1} value={(index + 1) || ''}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                    <select value={birthDay.month || ''} onChange={(e) => setBirthDay((birthDay) => ({ ...birthDay, month: e.target.value }))} className={styles.editProfileSelect}>
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
                    <select value={birthDay.year || ''} onChange={(e) => setBirthDay((birthDay) => ({ ...birthDay, year: e.target.value }))} className={styles.editProfileSelect}>
                        <option value=""></option>
                        {Array.from({ length: 121 }, (_, index) => (
                            <option key={index + 1905} value={(index + 1905) || ''}>
                                {index + 1905}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.checkboxContainer}>
                    <label><input type="checkbox" name="connectWith" checked={preferences.connectWith === "yes" ? true : false} onChange={(e) => handleCheckboxChange(e)} /> Connect</label>
                    <label><input type="checkbox" name="getMore" checked={preferences.getMore === 'yes' ? true : false} onChange={(e) => handleCheckboxChange(e)} /> More</label>
                    <label><input type="checkbox" name="peronalizedAds" checked={preferences.peronalizedAds === 'yes' ? true : false} onChange={(e) => handleCheckboxChange(e)} /> Ads</label>
                </div>
                <button type="submit" className={styles.editProfileSaveButton}>Save</button>
            </form>
        </div>
    );
};

export default EditProfile;