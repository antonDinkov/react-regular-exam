import { Link } from 'react-router';
import styles from './Navbar.module.css'
import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../context/UserContext';
import { getUser } from '../HTTP/localeStorageApi';

function Navbar() {
    const {formData, updateForm} = useContext(FormContext);
    const [currentUser, setCurrentUser] = useState('Loading...');

    useEffect(() => {
        const user = JSON.parse(getUser());
        console.log('Tochno predi loga');
        console.log(user);
        
        console.log(user.name);
        
        if (user && user.name) {
            setCurrentUser(user.name);
        } else {
            setCurrentUser('Guest'); // Ако няма потребител, да не е "Error load..."
        }
    }, []);
    return (
        <nav className={styles.nav}>
            <h1>At</h1>
            <ul>
                <li><Link to='/react-regular-exam/welcome'><i className={`fa-solid fa-house-flag ${styles.i}`}></i><span>Welcome</span></Link></li>
                <li><Link to='/react-regular-exam/create'><i className={`fa-solid fa-bell ${styles.i}`}></i><span>Notification</span></Link></li>
                <li><Link to='/react-regular-exam/create'><i className={`fa-solid fa-envelope ${styles.i}`}></i><span>Messages</span></Link></li>
                <li><Link to='/react-regular-exam/create'><i className={`fa-solid fa-user ${styles.i}`}></i><span>Profile</span></Link></li>
                <li><Link to='/react-regular-exam/create'><i className={`fa-solid fa-suitcase ${styles.i}`}></i><span>Jobs</span></Link></li>
                <li><Link to="/react-regular-exam"><i className={`fa-solid fa-circle-xmark ${styles.i}`}></i><span>Logout</span></Link></li>
                <li><Link to="/react-regular-exam/post"><span>Post</span></Link></li>

            </ul>
            <img src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" alt="Guest" />
            <p>{currentUser}</p>
        </nav>
    )
}

export default Navbar;