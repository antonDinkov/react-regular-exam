import { createUserWithEmailAndPassword, db, doc, setDoc, auth } from "../../firebase";
const registerUser = async (contextData) => {
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

export default registerUser;