import { createUserWithEmailAndPassword, db, doc, setDoc, auth, signInWithEmailAndPassword } from "../../firebase";
import { setUser } from "./localeStorageApi";
export const registerUser = async (contextData) => {
    const {email, password} = contextData
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
    const {email, password} = contextData
    console.log(email, password);
    
    try {
        const userdata = await signInWithEmailAndPassword(auth, email, password);
        const user = userdata.user;
        console.log(user);
        const token = await user.getIdToken();
        console.log(token);
        setUser(user, token);
    } catch (err) {
        console.error("Error login user:", err.message);
    }
}