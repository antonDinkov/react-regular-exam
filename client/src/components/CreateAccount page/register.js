import { createUserWithEmailAndPassword, db, doc, setDoc } from "../../firebase";

const registerUser = async (contextData) => {
    try {
        const { name, email, password, birthday, checkbox } = contextData;
        const { month, day, year } = birthday;
        const { getMore, connectWith, peronalizedAds } = checkbox;
        const userdata = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userdata);
        
        const user = userdata.user;
        console.log(user);
        
        await setDoc(doc(db, "users", user.uid), {...userdata, createdAt: new Date()});
    } catch (err) {
        console.error("Error registering user:", err.message);
    }
}

export default registerUser;