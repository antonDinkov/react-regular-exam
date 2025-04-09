import { useContext, useEffect, useState } from "react";
import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router";
import { getUser } from "../../../HTTP/localeStorageApi";
import { FormContext } from "../../../../../context/UserContext";

const EditProfile = () => {
    const [profileImg, setProfileImg] = useState(null);
    const [wallImg, setWallImg] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [birthDay, setBirthDay] = useState({ day: '', month: '', year: '' })
    const [preferences, setPreferences] = useState({ connectWith: '', getMore: '', peronalizedAds: '' });
    const navigate = useNavigate();
    const {formData, updateForm, resetFormData} = useContext(FormContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        birthday: { day: '', month: '', year: '' },
        checkbox: {
            getMore: '',
            connectWith: '',
            peronalizedAds: '',
        },
        bio: '',
        updatesHistory: [],
        profileImg: '',
        wallImg: '',
    });

    useEffect(() => {
        const userInfo = JSON.parse(getUser());
        setUser((currInfo) => ({...currInfo, ...userInfo}));
        setName(userInfo.name);
        setEmail(userInfo.email);
        setBio(userInfo.bio);
        setBirthDay((currBirthday) => ({...currBirthday, ...userInfo.birthday}));
        setPreferences((currPref) => ({...currPref, ...userInfo.checkbox}));
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

    const handleInputsChange = (e, setInput) => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = {
            profileImg,
            wallImg,
        }
        navigate('/react-regular-exam/welcome');
    };


    return (
        <div className={styles.editProfileContainer}>
            <h2 className={styles.editProfileTitle}>Edit Profile</h2>
            <form onSubmit={handleSubmit} className={styles.editProfileForm}>
                <div className={styles.imageUploadContainer}>
                    <label className={styles.coverPhotoLabel}>
                        Cover Photo:
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setWallImg)} />
                        {wallImg && <img src={wallImg} alt="Cover" className={styles.coverPhotoPreview} />}
                    </label>
                    <label className={styles.profileImageLabel}>
                        Profile Image:
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setProfileImg)} />
                        {profileImg && <img src={profileImg} alt="Profile" className={styles.profileImagePreview} />}
                    </label>
                </div>
                <label className={styles.editProfileLabel}>Name:
                    <input type="text" value={name || ''} className={styles.editProfileInput} />
                </label>
                <label className={styles.editProfileLabel}>Email:
                    <input type="email" value={email || ''} className={styles.editProfileInput} />
                </label>
                <label className={styles.editProfileLabel}>Bio:
                    <textarea value={bio || ''} className={styles.editProfileTextarea} />
                </label>

                <div className={styles.birthdateContainer}>
                    <select value={birthDay.day || ''} className={styles.editProfileSelect}>
                        <option value=""></option>
                        {Array.from({ length: 31 }, (_, index) => (
                            <option key={index + 1} value={(index + 1) || ''}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                    <select value={birthDay.month || ''} className={styles.editProfileSelect}>
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
                    <select value={birthDay.year || ''} className={styles.editProfileSelect}>
                        <option value=""></option>
                        {Array.from({ length: 121 }, (_, index) => (
                            <option key={index + 1905} value={(index + 1905) || ''}>
                                {index + 1905}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.checkboxContainer}>
                    <label><input type="checkbox" name="connect" checked={preferences.connectWith==="yes"?true:false} onChange={handleCheckboxChange} /> Connect</label>
                    <label><input type="checkbox" name="more" checked={preferences.getMore==='yes'?true:false} onChange={handleCheckboxChange} /> More</label>
                    <label><input type="checkbox" name="ads" checked={preferences.peronalizedAds==='yes'?true:false} onChange={handleCheckboxChange} /> Ads</label>
                </div>
                <button type="submit" className={styles.editProfileSaveButton}>Save</button>
            </form>
        </div>
    );
};

export default EditProfile;