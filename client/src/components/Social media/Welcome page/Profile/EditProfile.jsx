import { useState } from "react";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2025");
  const [profileImage, setProfileImage] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [preferences, setPreferences] = useState({ connect: false, more: false, ads: false });

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
    console.log("Saved:", { name, email, bio, password, day, month, year, preferences, profileImage, coverPhoto });
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
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.editProfileInput} />
        </label>
        <label className={styles.editProfileLabel}>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.editProfileInput} />
        </label>
        <label className={styles.editProfileLabel}>Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className={styles.editProfileTextarea} />
        </label>
        <label className={styles.editProfileLabel}>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.editProfileInput} />
        </label>
        <label className={styles.editProfileLabel}>Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.editProfileInput} />
        </label>
        <div className={styles.birthdateContainer}>
          <select value={day} onChange={(e) => setDay(e.target.value)} className={styles.editProfileSelect}>
            {days.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={styles.editProfileSelect}>
            {months.map(m => <option key={m}>{m}</option>)}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)} className={styles.editProfileSelect}>
            {years.map(y => <option key={y}>{y}</option>)}
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