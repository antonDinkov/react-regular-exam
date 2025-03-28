import { createUserWithEmailAndPassword, db, doc, setDoc, getDoc, getDocs, auth, signInWithEmailAndPassword } from "../../firebase";
import { setUser } from "./localeStorageApi";
export const registerUser = async (contextData) => {
    const {email, password} = contextData;
    try {
        const userdata = await createUserWithEmailAndPassword(auth, email, password);
        const user = userdata.user;
        /* console.log(user); */
        
        await setDoc(doc(db, "users", user.uid), {...contextData, createdAt: new Date()});
    } catch (err) {
        console.error("Error registering user:", err.message);
    }
}

export const loginUser = async (contextData) => {
    const {email, password} = contextData;
    
    try {
        const userdata = await signInWithEmailAndPassword(auth, email, password);
        const user = userdata.user;
        /* console.log(user.uid); */
        
        const token = await user.getIdToken();
        const currentUserInfo = await getUser(user.uid);
        setUser(currentUserInfo, token);
    } catch (err) {
        console.error("Error login user:", err.message);
    }
}

async function getUser(userId) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            /* console.log(docSnap.data()); */
            
            return docSnap.data();
        } else {
            throw new Error ('no such user!');
        }
    } catch (error) {
        console.error("Error fetching user:", error.message);
        return null;//за да се избегне срив!
    }
}