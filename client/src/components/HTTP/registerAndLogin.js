import { createUserWithEmailAndPassword, db, doc, setDoc, getDoc, getDocs, auth, signInWithEmailAndPassword, addDoc, collection } from "../../firebase";
import { setUser } from "./localeStorageApi";
export const registerUser = async (contextData) => {
    const {email, password} = contextData;
    try {
        const userdata = await createUserWithEmailAndPassword(auth, email, password);
        const user = userdata.user;
        /* console.log(user); */
        
        await setDoc(doc(db, "users", user.uid), {...contextData, createdAt: new Date(), userId: user.uid});
    } catch (err) {
        console.error("Error registering user:", err.message);
    }
}

export const loginUser = async (contextData) => {
    const {email, password} = contextData;
    
    try {
        const userdata = await signInWithEmailAndPassword(auth, email, password);
        const user = userdata.user;
        const token = await user.getIdToken();
        const currentUserInfo = await getUser(user.uid);
        setUser(currentUserInfo, token);
        return currentUserInfo;
    } catch (err) {
        console.error("Error login user:", err.message);
    }
}

export const postCreate = async (data) => {
    try {
        await addDoc(collection(db, "posts"), data);
    } catch (error) {
        console.error("Error adding document:", error);
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