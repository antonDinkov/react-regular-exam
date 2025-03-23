import { createUserWithEmailAndPassword } from "../../firebase";

const registerUser = async (contextData) => {
    try {
        const {name, email, } = contextData
        const userdata = await createUserWithEmailAndPassword(auth, EmailAuthCredential, password)
    } catch (err) {
        
    }
}